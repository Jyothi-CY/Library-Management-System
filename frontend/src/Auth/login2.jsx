import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";


import { Toaster, toast } from "sonner";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(AuthContext);
  const { disable, setDisable } = useState(false);
  let count = 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    count += 1;
    if (count > 6) {
      setDisable(true);
      toast.error("Too many attempts. Please try again later");
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      dispatch({
        type: "LOGIN",
        payload: { user: data.user, token: data.token },
      });
      setLoading(false);
      setError(null);
        toast.success("Login successful");
    } catch (error) {
      setError(error.message);
      setLoading(false);
      toast.error(`Invalid credentials (${error.message})`);
      setError(null);
    }
  };
  return (
    <>
      <section className="bg-gray-900 h-[100vh]">
        <div className="grid grid-flow-row grid-cols-1 lg:grid-cols-4 gap-3 justify-center">
          <div className="hidden lg:block col-span-2 lg:col-span-2 lg:mt-0 px-4 py-16">
            <img src="/img/Login.jpg" className="rounded-md"></img>
          </div>
          <div className="col-span-1 lg:col-span-2">
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                  className="mx-auto h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                  Login to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-white"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="random@gmail.com"
                        autoComplete="email"
                        required
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setError(null);
                        }}
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setError(null);
                        }}
                        className="block w-full rounded-md border-0 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <div className="flex items-center justify-between py-2">
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            &nbsp;
                          </a>
                        </div>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      disabled={loading || disable}
                    >
                      Login
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-white">
                  Not a member?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Join now
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Toaster richColors position="top-right" closeButton/>
    </>
  );
}
