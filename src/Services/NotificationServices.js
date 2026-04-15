import axiosInstance from "./axiosInstance"

export async function GetNotifications({ pageParam = 1, unread }) {
    const { data } = await axiosInstance.get(`/notifications?unread=${unread}&limit=15&page=${pageParam}`)
    return data

}

export async function MarkNotificationAsRead(notification) {
    const { data } = await axiosInstance.patch(`/notifications/${notification}/read`)
    return data

}

export async function MarkAllAsRead() {
    const { data } = await axiosInstance.patch(`/notifications/read-all`)
    return data

}