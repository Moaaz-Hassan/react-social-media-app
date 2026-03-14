import axios from "axios";
import axiosInstance from "./axiosInstance";

export async function fetchAllPosts({ pageParam = 1 }) {
  const response = await axiosInstance.get("/posts", {
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function fetchHomeFeed({ pageParam = 1 }) {
  const response = await axiosInstance.get("/posts/feed?only=following", {
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function fetchBookmarks({ pageParam = 1 }) {
  const response = await axiosInstance.get("/users/bookmarks", {
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function fetchUserPosts({ pageParam = 1, userId }) {
  const response = await axiosInstance.get(`/users/${userId}/posts`, {
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function deletPost(id) {
  try {
    const { data } = await axiosInstance.delete("/posts/" + id);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// --------------------------------------------------

export async function getPost(id) {
  const response = await axiosInstance.get("/posts/" + id);
  return response.data;
}

export async function createPostApi(formData) {
  try {
    const { data } = await axiosInstance.post("/posts", formData);
    return data;
  } catch (err) {
    {
      success: false;
    }
  }
}

export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axiosInstance.put(`/posts/${postId}`, formData);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// "error": "\"page\" is not allowed" so i cant use InfiniteQuery
export async function getUserPost() {
  try {
    const { data } = await axiosInstance.get(
      "/users/664bcf3e33da217c4af21f00/posts?",
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function togelePostLikes(id) {
  try {
    const { data } = await axiosInstance.put(`/posts/${id}/like`);

    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function togeleBookmarkPostes(id) {
  try {
    const { data } = await axiosInstance.put(`/posts/${id}/bookmark`);

    return data;
  } catch (err) {
    console.log(err);
  }
}
