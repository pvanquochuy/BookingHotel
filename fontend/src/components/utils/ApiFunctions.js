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
