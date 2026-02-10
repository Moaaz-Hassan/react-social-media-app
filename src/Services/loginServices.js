import axios from "axios";

export async function sendLogInData(values) {
  try {
    const { data } = await axios.post(
      "https://linked-posts.routemisr.com/users/signin",
      values,
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function getLogedUserData() {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      { headers: { token: localStorage.getItem("token") } },
    );
    return data;
  } catch (err) {
    console.log(err);
  }
}


export async function changePassWord(newPassword){
    try{
        const {data}  = await axios.patch("https://linked-posts.routemisr.com/users/change-password" ,newPassword, 
            {headers : {token : localStorage.getItem("token") }}
        ) ;

        return data ;

    }
    catch(err){
        console.log(err)
        return err
    }
}
