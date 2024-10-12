import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:9192",
});

export function getHeader() {
  const token = localStorage.getItem("token");
  console.log("Token:", token);

  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

/**
 * register user
 */
export async function registerUser(email, password, phoneNumber, name) {
  const data = {
    email,
    password,
    phoneNumber,
    name,
  };

  console.log("Sending registration data: ", data);

  try {
    const response = await api.post("/auth/register", data);
    console.log("register: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Registration error: ",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error if needed for further handling
  }
}

/**
 * login user
 */

export async function loginUser(email, password) {
  const data = {
    email,
    password,
  };

  try {
    const response = await api.post("/auth/login", data);
    console.log("login: ", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Login error: ",
      error.response ? error.response.data : error.message
    );
    throw error; // Re-throw error if needed for further handling
  }
}

/***USERS */

/*  This is  to get the user profile */
export async function getAllUsers() {
  const response = await api.get("/users/all", {
    headers: getHeader(),
  });
  return response.data;
}

export async function getUserProfile() {
  const response = await api.get("/users/get-logged-in-profile-info", {
    headers: getHeader(),
  });
  return response.data;
}

/* This is the  to get a single user */
export async function getUser(userId) {
  const response = await api.get(`/users/get-by-id/${userId}`, {
    headers: getHeader(),
  });
  return response.data;
}

/* This is the  to get user bookings by the user id */
export async function getUserBookings(userId) {
  const response = await api.get(`/users/get-user-bookings/${userId}`, {
    headers: getHeader(),
  });
  return response.data;
}

/* This is to delete a user */
export async function deleteUser(userId) {
  const response = await api.delete(`/users/delete/${userId}`, {
    headers: getHeader(),
  });
  return response.data;
}

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

  const response = await api.post("/rooms/add/new-room", formData, {
    headers: {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
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

/* This  gets all availavle by dates rooms from the database with a given date and a room type */
export async function getAvailableRoomsByDateAndType(
  checkInDate,
  checkOutDate,
  roomType
) {
  const result = await api.get(
    `/rooms/available-rooms-by-date-and-type?checkInDate=${checkInDate}
&checkOutDate=${checkOutDate}&roomType=${roomType}`
  );
  return result.data;
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
    const result = await api.delete(`/rooms/delete/room/${roomId}`, {
      headers: getHeader(),
    });
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
  const response = await api.put(`/rooms/update/${roomId}`, formData, {
    headers: {
      ...getHeader(),
      "Content-Type": "multipart/form-data",
    },
  });
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
export async function bookRoom(roomId, userId, booking) {
  try {
    console.log("USER ID IS: " + userId);
    const response = await api.post(
      `/bookings/room/${roomId}/${userId}/booking`,
      booking,
      {
        headers: getHeader(),
      }
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
    const result = await api.get("/bookings/all-bookings", {
      headers: getHeader(),
    });
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
    const result = await api.delete(`/bookings/booking/${bookingId}/delete`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling bookings: ${error.message}`);
  }
}

/**AUTHENTICATION CHECKER */

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
}

export function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

export function isAdmin() {
  const role = localStorage.getItem("role");
  return role === "ADMIN";
}

export function isUser() {
  const role = localStorage.getItem("role");
  return role === "USER";
}
