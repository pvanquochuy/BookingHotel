import { Button } from "bootstrap";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingSumary = ({ booking, payment, isFormValid, onConfirm }) => {
  const checkInDate = moment(booking.checkInDate);
  const checkOutDate = moment(booking.checkOutDate);
  const numOfDays = checkOutDate.diff(checkInDate, "days");
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);
  const [isProcessingPayment, setIsProsessingPayment] = useState(false);

  const navigate = useNavigate();

  const handleConfirmBooking = () => {
    setIsProsessingPayment(true);
    setTimeout(() => {
      setIsProsessingPayment(false);
      setIsBookingConfirmed(true);
      onConfirm();
    }, 3000);
  };

  useEffect(() => {
    if (isBookingConfirmed) {
      navigate("/booking-success");
    }
  }, [isBookingConfirmed]);

  return (
    <div className="card card-body mt-5">
      <h4>Reservation Sumary</h4>

      <p>
        FullName: <strong>{booking.guestName}</strong>{" "}
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
        Number of Days: <strong>{numOfDays}</strong>{" "}
      </p>
      <div>
        <h5>Number of Guests</h5>
        <strong>
          Adult{booking.numberOfAdults > 1 ? "s" : ""} :{" "}
          {booking.numberOfAdults}
        </strong>
        <strong>Children : {booking.numberOfChildren}</strong>
      </div>
      {payment > 0 ? (
        <>
          <p>
            Total Payment : <strong>${payment}</strong>
          </p>
          {isFormValid && !isBookingConfirmed ? (
            <Button variant="success" onclick={handleConfirmBooking}>
              {isProcessingPayment ? (
                <>
                  <span
                    className="spinner-border sprinner-border-sm-mr-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Booking Confirmed, reditecting to payment ....
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
          Check-out date must be after check-id date
        </p>
      )}
    </div>
  );
};

export default BookingSumary;
