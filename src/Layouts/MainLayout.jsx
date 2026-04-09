import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";
import OpenScrean from "../Components/OpenScrean";
import { useContext } from "react";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { Navigate } from "react-router-dom";

function MainLayout() {
  let { userData, isLogedIn } = useContext(AuthenticationCntext);
  return (
    <>
      {isLogedIn ?
        <div>
          <div>
            <NavBar />
            {userData ?
              <div className=" mt-[80px] pt-2 lg:w-[65%]  w-[95%] md:w-[85%]  mx-auto">
                <Outlet />
              </div>
              : <OpenScrean />
            }

          </div>
        </div>



        : <Navigate to={"/login"} />
      }
    </>
  );
}

export default MainLayout;





