import axiosInstance from "./axiosInstance";
import axios from "axios";

export async function createCommentApi(content, post) {
  try {
    const { data } = await axiosInstance.post(`/posts/${post}/comments`, content);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function UpdateCommentApi(content, commintId, postId) {
  try {
    const { data } = await axiosInstance.put(
      `/posts/${postId}/comments/${commintId}`, content

    );

    return data;
  } catch (err) {
    console.log(err);
  }
}

// 



// done
export async function DeleteCommentApi(commintId, postId) {
  try {
    const { data } = await axiosInstance.delete(`/posts/${postId}/comments/${commintId}`,);

    return data;
  } catch (err) {
    console.log(err);
  }
}
