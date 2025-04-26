import { loginUser } from "@/api/authApi";
import { Button } from "@/components/ui/button";
import FieldError from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import { isAxiosError } from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("able to submit!");
    e.preventDefault();
    if (isLoading) return;
    const validationErrors: typeof errors = {};
    if (!email.trim()) {
      validationErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      validationErrors.email = "Invalid email";
    }
    if (!password.trim()) {
      validationErrors.password = "Required";
    }
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length) return;
    setIsLoading(true);
    try {
      const response = await loginUser({ email, password });
      login(response.token);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (!err.response) {
          toast.error(
            "🚧 Our servers are currently unavailable. Please try again later."
          );
        } else if (err.response.status === 401) {
          // backend should return { message: "Invalid credentials" }
          toast.error(
            err.response.data?.message || "Invalid email or password."
          );
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        console.error(err);
        toast.error(
          "An unexpected error occurred. Server might be down. Please try again!"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-evenly md:flex-row p-4">
        {/* Left Panel */}
        <div className="flex md:w-2/5 bg-gray-100 flex-col justify-center items-center p-10 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome back to Dev
            <span className="text-teal-700">Circle</span> 🌟
          </h1>

          <p className="text-gray-600 text-center">
            Let's continue building greatness together!
            <br />
            Collaborate. Innovate. Inspire.
          </p>

          <ul className="text-gray-600 text-left list-disc list-inside space-y-2">
            <li>🤝 Connect with developers worldwide</li>
            <li>🚀 Contribute to exciting projects</li>
            <li>🎯 Personal growth opportunities</li>
            <li>🏆 Earn recognitions & rewards</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="w-full md:w-3/5 bg-gradient-to-br from-indigo-600 via-purple-500 to-blue-800 flex justify-center items-center p-8">
          <div className="bg-gray-50 rounded-xl shadow-lg w-full max-w-md p-8 space-y-6">
            <h2 className="text-3xl font-bold text-center text-gray-800">
              Login to Your Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }}
                />
                <FieldError message={errors.email} />
              </div>

              <div>
                <Input
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }}
                />
                <FieldError message={errors.password} />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8z"
                      ></path>
                    </svg>
                    Logging in...
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 hover:underline font-semibold"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
