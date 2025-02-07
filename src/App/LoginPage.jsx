import { useState } from "react";
import { Eye, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import login from "@/assets/login.svg";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };
  const handleLogin = async () => {
    event.preventDefault();

    // Check if credentials are empty
    if (email === "" || password === "") {
      alert("Please enter your credentials");
      return;
    }

    try {
      setMessage("");
      setLoading(true);
      const response = await fetch("http://localhost:3000/users/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      setLoading(false);

      if (!response.ok) {
        throw new Error("Invalid email or password");
      }
      const token = response.headers.get("Authorization");
      const data = await response.json();

      // Save token or user data to localStorage/sessionStorage
      localStorage.setItem("token", token);

      if (data.status.data.role == "veilleur") {
        navigate("/veilleur/searching");
      } else if (data.status.data.role == "decideur") {
        navigate("/decideur");
      } else if (data.status.data.role == "analyste") {
        navigate("/analyste/analyzing");
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <div className="flex items-center justify-center shadow-md bg-[#fbfbfb] rounded-3xl">
        <div className="flex flex-col justify-center px-8 md:px-16 py-12">
          <div className="mx-auto max-w-md">
            <h2 className="tracking-tight">Get Started Now</h2>

            <p className="text-sm mt-2 font-bold">
              Enter your credentials to access your account
            </p>

            <form className="mt-8 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold" htmlFor="email">
                  Email account
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    placeholder="kevinf@gmail.com"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="min 8 caractère"
                    type={passwordVisible ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                </div>
                <div className="text-right">
                  <a
                    href="/forgot-password"
                    className="text-sm font-bold hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
              {message && <p className="text-sm text-red-500">{message}</p>}
              {!loading && (
                <Button
                  onClick={handleLogin}
                  className="w-full bg-first  text-black font-semibold"
                >
                  Login
                </Button>
              )}
              {loading && (
                <Button disabled className="gap-0.5 py-3 justify-center w-full">
                  <Loader2 className="animate-spin" />
                  Please wait
                </Button>
              )}
            </form>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center p-12">
          <img
            src={login}
            alt="Monitoring Illustration"
            width={450}
            height={450}
            className="dark:invert"
          />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
