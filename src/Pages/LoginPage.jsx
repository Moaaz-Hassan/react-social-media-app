import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthenticationCntext from "../Context/AuthenticationCntext";
import { loginSchema } from "../schemaValidation/loginValidation";
import { sendLogInData } from "../Services/loginServices";

function LoginPage() {
  const [apiErorre, setApiErorre] = useState(null);
  const [loding, setLoding] = useState(false);
  const { setIsLogedIn } = useContext(AuthenticationCntext);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function login(value) {
    setLoding(true);
    setApiErorre(null);
    try {
      const response = await sendLogInData(value);
      if (response.error) {
        setApiErorre(response.error);
        return ;
      } else {
        localStorage.setItem("token", response.token);
        setIsLogedIn(response.token);
        navigate("/");
      }
    } catch (error) {
      setApiErorre("Something went wrong. Please try again later.");
    } finally {
      setLoding(false);
    }
  }

  return (
    <div className=" min-h-screen flex justify-center items-center ">
      <div className=" min-w-md bg-white py-10 px-6 rounded-2xl shadow-2xl">
        <h2 className=" text-2xl mb-4">LogIn</h2>
        <form onSubmit={handleSubmit(login)} className="flex flex-col gap-4">
          <Input
            {...register("email")}
            errorMessage={formState.errors.email?.message}
            isInvalid={formState.errors.email?.message ? true : false}
            variant="bordered"
            label="email"
            type="email"
            labelPlacement="outside"
            placeholder="Enter your email"
          ></Input>

          <Input
            {...register("password")}
            errorMessage={formState.errors.password?.message}
            isInvalid={formState.errors.password?.message ? true : false}
            variant="bordered"
            label="password"
            type={isVisible ? "text" : "password"}
            labelPlacement="outside"
            placeholder="Enter your password"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
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
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </button>
            }
          />

          {apiErorre && <p className=" text-red-500">{apiErorre}</p>}
          <Button isLoading={loding} type="submit" color="primary">
            LogIn
          </Button>
        </form>
        <p className=" mt-2">
          If you don't have an account please{" "}
          <Link to={"/register"} className=" text-blue-500 pl-1">
            register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
