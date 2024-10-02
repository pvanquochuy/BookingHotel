import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

/**
 * add new room
 * @param {*} photo
 * @param {*} roomType
 * @param {*} roomPrice
 * @returns
 */
export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms/add/new-room", formData);
  console.log("add room: ", response.data);

  return response.status == 201;
}

/**
 * get room types
 * @returns
 */
export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room/types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types", error);
  }
}

/**
 * get all rooms
 * @returns
 */
export async function getAllRooms() {
  try {
    const response = await api.get("/rooms/all-rooms");

    return response.data;
  } catch (error) {
    throw new Error("Error fetching rooms", error);
  }
}

/**
 * delete room by id
 * @param {*} roomId
 * @returns
 */
export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/delete/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error("Error delete room", error.message);
  }
}

/**
 * update room
 * @param {} roomId
 * @param {*} roomData
 * @returns
 */
export async function updateRoom(roomId, roomData) {
  const formData = new FormData();
  formData.append("roomType", roomData.roomType);
  formData.append("roomPrice", roomData.roomPrice);
  formData.append("photo", roomData.photo);
  const response = await api.put(`/rooms/update/${roomId}`, formData);
  return response;
}

/**
 * get room by id
 * @param {*} roomId
 * @returns
 */
export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/room/${roomId}`);
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

/**
 * save a new book room
 * @param {*} roomId
 * @param {*} booking
 * @returns
 */
export async function bookRoom(roomId, booking) {
  try {
    const response = await api.post(
      `/bookings/room/${roomId}/booking`,
      booking
    );
    console.log("bookroom: ", response.data);

    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error booking room: ${error.message}`);
    }
  }
}

/**
 * get all bookings
 * @returns
 */

export async function getAllBookings() {
  try {
    const result = await api.get("/bookings/all-bookings");
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

/**
 * get booking by code
 * @param {*} confirmationCode
 * @returns
 */

export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find bookings: ${error.message}`);
    }
  }
}

/**
 * cancel booking
 * @param {*} bookingId
 * @returns
 */
export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`);
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling bookings: ${error.message}`);
  }
}
