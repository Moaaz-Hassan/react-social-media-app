import LogoLoop from "../assets/loopLogo.png";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";

import { useState, useEffect } from "react";
import defaultPersonPhoto from "../assets/default-profile.png";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { useContext } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";

function NavBar() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  let { userData, setIsLogedIn } = useContext(AuthenticationCntext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("token");
    setIsLogedIn(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavBar(false);
      } else {
        setShowNavBar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`navbar ${showNavBar ? "show" : "hide"}  h-20 bg-white border-b-1 border-b-gray-200 shadow-xl  text-gray-700 flex items-center justify-between px-5 md:px-24 lg:px-36 pr-8`}
    >
      <img src={LogoLoop} alt="loop" className=" w-20 md:w-28" />
      <div className=" flex items-center gap-4 p-2 rounded-xl border-1 border-blue-50 bg-gray-100 ">
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            `${isActive ? "bg-white text-blue-600" : " text-gray-950 "} flex items-center justify-center gap-1 p-2 rounded-xl`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>

          <h2 className=" font-bold text-sm hidden md:block ">Home</h2>
        </NavLink>

        <NavLink
          to={"/suggestions-friends"}
          className={({ isActive }) =>
            `${isActive ? "bg-white text-blue-600" : " text-gray-950 "} flex items-center justify-center gap-1 p-2 rounded-xl`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
            />
          </svg>

          <h2 className=" font-bold text-sm hidden md:block ">Friends</h2>
        </NavLink>

        <NavLink
          to={"/notifications"}
          className={({ isActive }) =>
            `${isActive ? "bg-white text-blue-600" : " text-gray-950 "} flex items-center justify-center gap-1 p-2 rounded-xl`
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>

          <h2 className=" font-bold text-sm  hidden md:block ">Notifications</h2>
        </NavLink>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <div className=" flex items-center gap-4 md:gap-2 rounded-3xl p-2 bg-gray-100  cursor-pointer ">
            <img
              src={userData?.photo ? userData?.photo : defaultPersonPhoto}
              className=" w-10 h-10 rounded-full "
              alt="person-photo"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
            />

            <h2 className="text-gray-950 font-semibold text-sm hidden md:block">
              {userData?.name}
            </h2>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 text-gray-950 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          <DropdownItem onClick={() => navigate("/profile")} key="copy">
            Profile
          </DropdownItem>

          <DropdownItem onClick={() => navigate("/change-password")} key="edit">
            Settings
          </DropdownItem>

          <DropdownItem
            onClick={onOpen}
            key="delete"
            className="text-danger"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure you want to log out?
              </ModalHeader>
              <ModalBody>
                <p>
                  You are about to log out of your account. Make sure you have
                  saved any important changes before continuing.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    logOut();
                    onClose;
                  }}
                >
                  LogOut
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default NavBar;
