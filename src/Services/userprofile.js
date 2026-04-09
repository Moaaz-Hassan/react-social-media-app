import axiosInstance from "./axiosInstance"
export async function uploadProfilePhoto(formData) {
    try {
        const { data } = await axiosInstance.put("/users/upload-photo", formData)
        return data
    } catch (err) {
        console.log(err)
    }


}