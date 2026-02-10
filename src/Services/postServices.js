import axios from "axios";

export async function fetchAllPosts({ pageParam = 1 }) {
  const response = await axios.get("https://linked-posts.routemisr.com/posts", {
    headers: {
      token: localStorage.getItem("token"),
    },
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function getPost(id) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/posts/" + id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function createPostApi(formData) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/posts?",
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function updatePostApi(postId, formData) {
  try {
    const { data } = await axios.put(
      `https://linked-posts.routemisr.com/posts/${postId}`,
      formData,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function deletPost(id) {
  try {
    const { data } = await axios.delete(
      "https://linked-posts.routemisr.com/posts/" + id,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}


// "error": "\"page\" is not allowed" so i cant use InfiniteQuery
export async function getUserPost() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/664bcf3e33da217c4af21f00/posts?",
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}
