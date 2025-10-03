import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    console.log(username, password, "Adminlogin");
    try {
      const response = await fetch("http://localhost:5000/api/users/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${state.token}`,
        },
        body: JSON.stringify({ username, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials for admin");
      }
      const data = await response.json();
      dispatch({
        type: "ADMIN_LOGIN",
        payload: { user: data.user, token: data.token, role: data.user.role},
      });
      setLoading(false);
      setError(null);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  return (
    <>
      <h1 className="text-4xl text-center font-mono mt-10">Admin Login</h1>
      <Card shadow="none">
        <CardHeader className="font-mono text-2xl"></CardHeader>
        <CardBody>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center m-8"
          >
            <div className="w-[380px] h-[270px] px-4 rounded-2xl flex flex-col gap-3 justify-center items-center bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg">
              <label htmlFor="username">Username:</label>
              <Input
                type="email"
                placeholder="adminid@gmail.com"
                value={username}
                onChange={(e) => {setUsername(e.target.value); setError(null)}}
                size="lg"
              />
              <label htmlFor="password">Password:</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); setError(null)}}
                size="lg"
              />
              <div className="flex justify-around items-center gap-16">
                <Button
                  variant="shadow"
                  color="secondary"
                  type="submit"
                  disabled={loading}
                >
                  Log In as admin
                </Button>
                <span className="text-xs">
                  Student Account? <Link to="/signup"><span className="text-gray-600">Login here</span></Link>
                </span>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          {error && toast.error(error)}
          {loading && toast.message("Loading...")}
        </CardFooter>
      </Card>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
