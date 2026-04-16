import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function sendLogInData(values) {
  try {
    const { data } = await axios.post(
      "https://route-posts.routemisr.com/users/signin",
      values,
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getLogedUserData() {
  try {
    const { data } = await axiosInstance.get("/users/profile-data");
    return data;
  } catch (err) {
    console.log(err);
  }
}


// ned to change 
export async function changePassWord(newPassword) {
  try {
    const { data } = await axiosInstance.patch(
      "/users/change-password",newPassword);

    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
