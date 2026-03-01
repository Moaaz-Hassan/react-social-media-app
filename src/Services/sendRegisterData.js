import axios from "axios";
export async function sendRegisterData(values) {
  try {
    const { data } = await axios.post(
      "https://route-posts.routemisr.com/users/signup",
      values,
    );
    return data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
}
