import { Button } from "react-bootstrap";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();

  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays =
    checkOutDate.isValid() && checkInDate.isValid()
      ? checkOutDate.diff(checkInDate, "days")
      : 0;

  const handleConfirmBooking = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      console.log(isBookingConfirmed);

      navigate("/booking-success");
    }
  }, [isBookingConfirmed]);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Summary</h4>
      <p>
        Full Name: <strong>{booking.guestFullName}</strong>{" "}
      </p>
      <p>
        Email: <strong>{booking.guestEmail}</strong>{" "}
      </p>
      <p>
        Check-in Date:{" "}
        <strong>{moment(booking.checkInDate).format("MM DD YYYY")}</strong>{" "}
      </p>
      <p>
        Check-out Date:{" "}
        <strong>{moment(booking.checkOutDate).format("MM DD YYYY")}</strong>{" "}
      </p>
      <p>
        Number of Days: <strong>{!isNaN(numOfDays) ? numOfDays : 0}</strong>{" "}
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numOfAdults > 1 ? "s" : ""}: {booking.numOfAdults}
        </strong>
        <strong>Children: {booking.numOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total Payment: <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onClick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, redirecting to payment ....
                </>
              ) : (
                "Confirm Booking and proceed to payment"
              )}
            </Button>
          ) : isBookingConfirmed ? (
            <div className="d-flex justify-content-center align-items-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading</span>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <p className="text-danger">
          Check-out date must be after check-in date
        </p>
      )}
    </div>
  );
};

export default BookingSummary;
