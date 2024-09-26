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
