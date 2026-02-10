import axios from "axios";
export async function sendRegisterData(values){
    try{
        const {data}  = await axios.post("https://linked-posts.routemisr.com/users/signup" , values) ;
        return data ;

    }
    catch(error){
        return error.response.data ;
    }
}