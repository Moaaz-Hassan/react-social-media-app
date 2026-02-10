import { useContext } from "react";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { Button } from "@heroui/react";


function LogOutPage() {
  let { setIsLogedIn, setuserData } = useContext(AuthenticationCntext);


  function logout() {
    localStorage.removeItem("token");
    setuserData(null);
    setIsLogedIn(null)
  }

  return (
    <div className=" mt-5 text-center">
      <Button onPress={logout} className="mt-2" color="primary">
        LogOut
      </Button>
    </div>
  );
}

export default LogOutPage;
