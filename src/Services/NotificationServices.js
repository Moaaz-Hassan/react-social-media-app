import axiosInstance from "./axiosInstance"

export async function GetNotifications({ pageParam = 1, unread }) {
    const { data } = await axiosInstance.get(`/notifications?unread=${unread}&limit=15&page=${pageParam}`)
    return data

}

