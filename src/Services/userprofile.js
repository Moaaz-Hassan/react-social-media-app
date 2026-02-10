import axios from "axios";
export async function uploadProfilePhoto ( formData ){
    try{
    const {data} = await axios.put("https://linked-posts.routemisr.com/users/upload-photo",formData , {
        headers : {
            token : localStorage.getItem("token") ,
        }
    })
    return data
    }catch(err){
        console.log(err)
    }


}