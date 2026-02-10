import React from "react";
import { registerSchema } from "../schemaValidation/registerValidation";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/react";
import { Button } from "@heroui/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { sendRegisterData } from "../Services/sendRegisterData";

function RegisterPage() {
  const [apiError, setApiError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(null);
  const [loding, setLoding] = useState(false);

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isRePasswordVisible, setIsRePasswordVisible] = useState(false);
  const togglePasswordVisibility = () =>
    setIsPasswordVisible(!isPasswordVisible);
  const toggleRePasswordVisibility = () =>
    setIsRePasswordVisible(!isRePasswordVisible);

  const navigate = useNavigate();

  const { handleSubmit, register, formState } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function signUp(value) {
    setLoding(true);
    setApiError(null);
    setApiSuccess(null);

    try {
      const response = await sendRegisterData(value);

      if (response?.error) {
        setApiError(response.error);
        return;
      }

      setApiSuccess(response.message);

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setApiError("Something went wrong. Please try again later.");
    } finally {
      setLoding(false);
    }
  }

  return (
    <div className=" min-h-screen flex justify-center items-center">
      <div className="  bg-white py-10 px-6 rounded-2xl shadow-2xl">
        <h2 className=" text-2xl mb-4">Register</h2>
        <form onSubmit={handleSubmit(signUp)} className=" flex flex-col gap-4">
          <Input
            variant="bordered"
            {...register("name")}
            label="name"
            type="text"
            labelPlacement="outside"
            placeholder="Enter your Name"
            isInvalid={formState.errors.name?.message ? true : false}
            errorMessage={formState.errors.name?.message}
          />

          <Input
            variant="bordered"
            {...register("email")}
            label="email"
            type="email"
            labelPlacement="outside"
            placeholder="Enter your Email"
            isInvalid={formState.errors.email?.message ? true : false}
            errorMessage={formState.errors.email?.message}
          />

          <Input
            {...register("password")}
            errorMessage={formState.errors.password?.message}
            isInvalid={formState.errors.password?.message ? true : false}
            variant="bordered"
            label="password"
            type={isPasswordVisible ? "text" : "password"}
            labelPlacement="outside"
            placeholder="Enter your password"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
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

          <Input
            {...register("rePassword")}
            isInvalid={formState.errors.rePassword?.message ? true : false}
            errorMessage={formState.errors.rePassword?.message}
            variant="bordered"
            label="rePassword"
            type={isRePasswordVisible ? "text" : "password"}
            labelPlacement="outside"
            placeholder="Enter rePassword"
            endContent={
              <button
                aria-label="toggle password visibility"
                className="focus:outline-solid outline-transparent"
                type="button"
                onClick={toggleRePasswordVisibility}
              >
                {isRePasswordVisible ? (
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

          <div className=" flex gap-3 mt-1">
            <Input
              variant="bordered"
              label="dateOfBirth"
              {...register("dateOfBirth")}
              type="date"
              labelPlacement="outside"
              isInvalid={formState.errors.dateOfBirth?.message ? true : false}
              errorMessage={formState.errors.dateOfBirth?.message}
            />
            <Select
              labelPlacement="outside-top"
              {...register("gender")}
              variant="bordered"
              className="max-w-xs"
              label="Select Your Gender"
              placeholder="male"
              isInvalid={formState.errors.gender?.message ? true : false}
              errorMessage={formState.errors.gender?.message}
            >
              <SelectItem key={"male"}>male</SelectItem>
              <SelectItem key={"female"}>feMale</SelectItem>
            </Select>
          </div>

          {apiError && <p className=" text-red-500">{apiError}</p>}
          {apiSuccess && (
            <Link
              to={"/login"}
              className=" text-green-500"
            >{`${apiSuccess} , Let's  sign in`}</Link>
          )}
          <Button isLoading={loding} type="submit" color="primary">
            Register
          </Button>
          <p>
            If you have an account please{" "}
            <Link to={"/login"} className=" text-blue-500 pl-1">
              signIn
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
