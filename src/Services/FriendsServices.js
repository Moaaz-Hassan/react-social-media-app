import axiosInstance from "./axiosInstance";
export async function GetFollowSuggestions({ pageParam = 1 }) {
    const {data} = await axiosInstance.get("/users/suggestions" , {
    params: {
      limit: 10,
      page: pageParam,
    },
  })
    return data
    
}

export async function ToggelFollow(id) {
    const {data} = await axiosInstance.put(`/users/${id}/follow`)
    return data
    
}

export async function GetUserProfile(id) {
    const {data} = await axiosInstance.get(`/users/${id}/profile`)
    return data
    
}

