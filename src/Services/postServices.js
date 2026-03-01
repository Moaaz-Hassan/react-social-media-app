import axios from "axios";

export async function fetchAllPosts({ pageParam = 1 }) {
  const response = await axios.get("https://route-posts.routemisr.com/posts", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}


export async function fetchHomeFeed({ pageParam = 1 }) {
  const response = await axios.get("https://route-posts.routemisr.com/posts/feed?only=following", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}

export async function fetchBookmarks({ pageParam = 1 }) {
  const response = await axios.get("https://route-posts.routemisr.com/users/bookmarks", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    params: {
      limit: 20,
      page: pageParam,
      sort: "-createdAt",
    },
  });
  return response.data;
}


export async function fetchUserPosts({ pageParam = 1 , userId }) {
  const response = await axios.get(`https://route-posts.routemisr.com/users/${userId}/posts`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      "https://route-posts.routemisr.com/posts",
      formData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      },
    );
    return data;
  } catch (err) {
    {
      success: false;
    }
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

//  "success": true,
//     "message": "post created successfully",
//     "data": {
//         "post": {
//             "body": "ranadan ",
//             "privacy": "only_me",
//             "user": "699e25b0056bdb76272bf1aa",
//             "sharedPost": null,
//             "likes": [],
//             "_id": "69a2eeec056bdb76275ee255",
//             "createdAt": "2026-02-28T13:34:36.291Z",
//             "likesCount": 0,
//             "isShare": false,
//             "id": "69a2eeec056bdb76275ee255"
//         }
//     }
// }
