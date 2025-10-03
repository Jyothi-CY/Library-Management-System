import { AuthContext } from "../context/AuthContext";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Input } from "@nextui-org/react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { Toaster, toast } from "sonner";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { dispatch, state } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.endsWith("@iiitkottayam.ac.in")) {
      toast.error("Please enter a valid email(should be a iiitk email)");
      return;
    }
    console.table(username, password);
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmpassword) {
      setError("Passwords do not match");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${state.token}`,
        },
        body: JSON.stringify({ username, password, user_type: "user" }),
      });
      console.table(response);
      if (!response.ok) {
        setLoading(false);
        throw new Error("Account already exists");
      }
      const data = await response.json();
      dispatch({
        type: "LOGIN",
        payload: { user: data.user, token: data.token },
      });
      setLoading(false);
      setError(null);
      toast.success("Account created successfully");
    } catch (error) {
      setError(error.message);
      toast.error(`failed to create account (${error.message})`)
      setLoading(false);
      setError(null);
    }
  };
  return (
    <>
      <h1 className="text-4xl text-center font-mono mt-10">Sign up</h1>
      <Card shadow="none">
        <CardHeader className="font-mono text-2xl"></CardHeader>
        <CardBody>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="flex flex-col justify-center items-center m-8"
          >
            <div className="w-[400px] h-[360px] px-4 rounded-2xl flex flex-col gap-3 justify-center items-center bg-gradient-to-tr from-blue-500 to-purple-500 text-white shadow-lg">
              <label htmlFor="username">Enter username:</label>
              <Input
                type="email"
                placeholder="random@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                size="lg"
              />
              <label htmlFor="password">Enter password:</label>
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                size="lg"
              />
              <label htmlFor="confirmpassword">Confirm password:</label>
              <Input
                type="password"
                placeholder="Re-enter Password"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                size="lg"
              />

              <div className="flex justify-around items-center gap-16">
                <Button
                  variant="shadow"
                  color="secondary"
                  type="submit"
                  disabled={loading}
                >
                  Sign up
                </Button>
                <span className="text-xs">
                  Already have an account? <Link to="/login">Login</Link>
                </span>
              </div>
            </div>
          </form>
        </CardBody>
        <CardFooter>

          {loading && toast.message("Loading...")}
        </CardFooter>
      </Card>
      <Toaster richColors position="top-right" closeButton />
    </>
  );
}
