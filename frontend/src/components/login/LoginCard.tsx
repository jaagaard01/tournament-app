import React, { FormEvent, useState } from "react";

import { useNavigate } from "react-router-dom";

interface LoginCardProps {
  onLoginSuccess: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const handleCreateAccountClick = () => {
    navigate("/create-account"); // Navigate to Create Account page
  };
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("Logging in with:", email, password, rememberMe);
    onLoginSuccess();
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title justify-center">Sign in</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="username">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label" htmlFor="password">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <label className="label cursor-pointer flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="ml-2 label-text">Remember me</span>
            </label>
            <button type="button" className="link link-primary text-sm">
              Forgot password?
            </button>
          </div>

          <button type="submit" className="btn btn-primary">
            Sign in
          </button>

          <div className="flex justify-center items-center mt-4">
            <span className="text-sm text-gray-600 mr-1">New user?</span>
            <button
              type="button"
              className="link link-primary text-sm underline"
              onClick={handleCreateAccountClick}
            >
              Create account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
