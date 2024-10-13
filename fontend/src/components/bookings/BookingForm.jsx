import React, { useEffect, useState } from "react";
import { bookRoom, getRoomById, getUserProfile } from "../utils/ApiFunctions";
import { Form, FormControl, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
  // State quản lý thông tin người dùng và đặt phòng
  const [isValidated, setIsValidated] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [roomPrice, setRoomPrice] = useState(0);
  const [userId, setUserId] = useState(""); // Thêm state cho userId

  const [booking, setBooking] = useState({
    guestFullName: "", // Đổi từ guestName thành guestFullName để khớp với form
    guestEmail: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfAdults: 1, // Thiết lập giá trị mặc định
    numberOfChildren: 0, // Thiết lập giá trị mặc định
  });

  // Hàm xử lý thay đổi trong các trường nhập liệu
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBooking({ ...booking, [name]: value });
    setErrorMessage("");
  };

  const { roomId } = useParams();
  const navigate = useNavigate();

  // Hàm lấy giá phòng theo roomId
  const getRoomPriceById = async (roomId) => {
    try {
      const response = await getRoomById(roomId);
      setRoomPrice(response.roomPrice);
    } catch (error) {
      setErrorMessage("Failed to fetch room price.");
      console.error(error);
    }
  };

  // Hàm lấy userId từ API
  const fetchUserProfile = async () => {
    try {
      const userProfile = await getUserProfile();
      setUserId(userProfile.user.id);
    } catch (error) {
      setErrorMessage("Failed to fetch user profile.");
      console.error(error);
    }
  };

  // useEffect để lấy roomPrice và userId khi component mount hoặc roomId thay đổi
  useEffect(() => {
    getRoomPriceById(roomId);
    fetchUserProfile();
  }, [roomId]);

  // Hàm tính toán tổng số tiền thanh toán
  const calculatePayment = () => {
    const checkInDate = moment(booking.checkInDate);
    const checkOutDate = moment(booking.checkOutDate);
    const diffInDays = checkOutDate.diff(checkInDate, "days");
    const price = roomPrice ? roomPrice : 0;
    return diffInDays * price;
  };

  // Hàm kiểm tra tính hợp lệ của số lượng khách
  const isGuestValid = () => {
    const adultCount = parseInt(booking.numberOfAdults, 10);
    const childrenCount = parseInt(booking.numberOfChildren, 10);
    const totalCount = adultCount + childrenCount;
    return totalCount >= 1 && adultCount >= 1;
  };

  // Hàm kiểm tra tính hợp lệ của ngày trả phòng
  const isCheckOutDateValid = () => {
    if (
      !moment(booking.checkOutDate).isSameOrAfter(moment(booking.checkInDate))
    ) {
      setErrorMessage(
        "Check-out date must come after or on the same day as check-in date."
      );
      return false;
    } else {
      setErrorMessage("");
      return true;
    }
  };

  // Hàm xử lý khi submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (
      form.checkValidity() === false ||
      !isCheckOutDateValid() ||
      !isGuestValid()
    ) {
      e.stopPropagation();
      setIsValidated(true);
      setErrorMessage("Please ensure all fields are correctly filled out.");
      return;
    } else {
      setIsValidated(true);
      setIsSubmitted(true);
    }
  };

  // Hàm xử lý khi xác nhận đặt phòng
  const handleBooking = async () => {
    try {
      // Tính toán tổng tiền
      const payment = calculatePayment();

      // Kiểm tra xem số ngày đặt phòng có hợp lệ
      if (payment <= 0) {
        setErrorMessage("The number of days for booking must be at least 1.");
        return;
      }

      // Tạo đối tượng đặt phòng để gửi lên API
      const bookingData = {
        guestName: booking.guestFullName, // Đổi từ guestFullName thành guestName nếu API yêu cầu
        guestEmail: booking.guestEmail,
        checkInDate: booking.checkInDate,
        checkOutDate: booking.checkOutDate,
        numberOfAdults: parseInt(booking.numberOfAdults, 10),
        numberOfChildren: parseInt(booking.numberOfChildren, 10),
        totalPrice: payment,
      };

      // Gọi API để đặt phòng với đầy đủ các tham số
      const response = await bookRoom(roomId, userId, bookingData);

      // Kiểm tra phản hồi từ API
      if (response.statusCode === 200 || response.status === "success") {
        // Điều chỉnh điều kiện này tùy thuộc vào phản hồi API
        navigate("/", {
          state: {
            message: { confirmationCode: response.bookingConfirmationCode },
          },
        });
      } else {
        setErrorMessage("Booking failed. Please try again.");
      }
    } catch (error) {
      setErrorMessage(error.message || "Booking failed.");
      console.error(error);
      // Không cần điều hướng ở đây để người dùng có thể sửa lỗi
    }
  };

  return (
    <>
      <div className="container mb-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card card-body mt-5">
              <h4 className="card card-title">Reserve Room</h4>
              <Form noValidate validated={isValidated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="guestFullName">Full Name:</Form.Label>
                  <FormControl
                    required
                    type="text"
                    id="guestFullName"
                    name="guestFullName"
                    value={booking.guestFullName}
                    placeholder="Enter your full name"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your full name.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label htmlFor="guestEmail">Email:</Form.Label>
                  <FormControl
                    required
                    type="email"
                    id="guestEmail"
                    name="guestEmail"
                    value={booking.guestEmail}
                    placeholder="Enter your email"
                    onChange={handleInputChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>

                <fieldset
                  className="mb-3"
                  style={{ border: "2px solid #ced4da", padding: "10px" }}
                >
                  <legend>Lodging Period</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="checkInDate">
                        Check-In Date:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkInDate"
                        name="checkInDate"
                        value={booking.checkInDate}
                        placeholder="Check-in date"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-in date.
                      </Form.Control.Feedback>
                    </div>
                    <div className="col-6">
                      <Form.Label htmlFor="checkOutDate">
                        Check-Out Date:
                      </Form.Label>
                      <FormControl
                        required
                        type="date"
                        id="checkOutDate"
                        name="checkOutDate"
                        value={booking.checkOutDate}
                        placeholder="Check-out date"
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select a check-out date.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                  {errorMessage && (
                    <Alert variant="danger" className="mt-2">
                      {errorMessage}
                    </Alert>
                  )}
                </fieldset>

                <fieldset
                  className="mb-3"
                  style={{ border: "2px solid #ced4da", padding: "10px" }}
                >
                  <legend>Number Of Guests</legend>
                  <div className="row">
                    <div className="col-6">
                      <Form.Label htmlFor="numberOfAdults">Adults:</Form.Label>
                      <FormControl
                        required
                        type="number"
                        id="numberOfAdults"
                        name="numberOfAdults"
                        value={booking.numberOfAdults}
                        placeholder="1"
                        min={1}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please select at least 1 adult.
                      </Form.Control.Feedback>
                    </div>

                    <div className="col-6">
                      <Form.Label htmlFor="numberOfChildren">
                        Children:
                      </Form.Label>
                      <FormControl
                        type="number"
                        id="numberOfChildren"
                        name="numberOfChildren"
                        value={booking.numberOfChildren}
                        placeholder="0"
                        min={0}
                        onChange={handleInputChange}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a valid number of children.
                      </Form.Control.Feedback>
                    </div>
                  </div>
                </fieldset>

                <div className="form-group mt-2 mb-2">
                  <Button type="submit" variant="primary" className="btn-hotel">
                    Continue
                  </Button>
                </div>
              </Form>
            </div>
          </div>

          <div className="col-md-6">
            {isSubmitted && (
              <BookingSummary
                booking={booking}
                payment={calculatePayment()}
                isFormValid={isValidated}
                onConfirm={handleBooking}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingForm;
