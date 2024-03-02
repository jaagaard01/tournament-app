import {
  AiFillEye,
  AiFillEyeInvisible,
  AiOutlineLoading,
} from "react-icons/ai";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import usePost from "../../hooks/usePost";

interface AccountCreationRequest {
  name: string;
  email: string;
  password: string;
}

interface AccountCreationResponse {
  message: string;
  token: string;
}

const CreateAccount: React.FC = () => {
  const { loading, error, postData } = usePost<
    AccountCreationResponse,
    AccountCreationRequest
  >();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmedPasswordVisible, setIsConfirmedPasswordVisible] =
    useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Check if passwords match
    if (password !== confirmedPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    const requestBody: AccountCreationRequest = {
      name,
      email,
      password,
    };
    const data = await postData(requestBody, "/createAccount");
    if (data) {
      console.log("Account creation successful:", data.message);
      // Navigate to login or another page upon success
      localStorage.setItem("authToken", data.token);
      navigate("/dashboard");
    } else if (error) {
      console.error("Account creation failed:", error.message);
      setErrorMessage(error.message);
    }
  };

  const onBlurPasswordCheck = () => {
    if (password !== confirmedPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    } else setErrorMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow-xl p-8 max-w-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Create Account</h2>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Email Address</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="input input-bordered"
          required
        />
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <div className="flex items-center input input-bordered">
          <input
            type={isPasswordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="flex-1"
            required
          />
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="btn btn-ghost btn-xs"
          >
            {isPasswordVisible ? (
              <AiFillEyeInvisible size={16} />
            ) : (
              <AiFillEye size={16} />
            )}
          </button>
        </div>
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Confirm Password</span>
        </label>
        <div className="flex items-center input input-bordered">
          <input
            type={isConfirmedPasswordVisible ? "text" : "password"}
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            placeholder="Confirm Password"
            className="flex-1"
            required
            onBlur={() => onBlurPasswordCheck()}
          />
          <button
            type="button"
            onClick={() =>
              setIsConfirmedPasswordVisible(!isConfirmedPasswordVisible)
            }
            className="btn btn-ghost btn-xs"
          >
            {isConfirmedPasswordVisible ? (
              <AiFillEyeInvisible size={16} />
            ) : (
              <AiFillEye size={16} />
            )}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-xs mt-1">{errorMessage}</p>
        )}
      </div>

      <div className="form-control mt-6">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            <>
              <AiOutlineLoading className="animate-spin mr-2" size={16} />
              Loading...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </div>

      <div className="mt-4 text-center">
        <span className="font-bold">Already have an account?</span>{" "}
        <button
          onClick={() => navigate("/login")}
          className="link link-primary underline"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default CreateAccount;
