import React, { useContext, useEffect } from "react";
import useLogout from "../Auth/useLogout.jsx";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownSection,
  Avatar,
  Button,
} from "@nextui-org/react";
import { useBookContext } from "../hooks/useBookContext.jsx";
const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);

export default function NavBar() {
  const { logout } = useLogout();
  const { state } = useContext(AuthContext);
  const { state: bookState, dispatchb } = useBookContext();
  const { role } = state;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        const data = await response.json();
        dispatchb({ type: "FETCH_BOOKS", payload: data });
      } catch (error) {
        dispatchb({ type: "FETCH_BOOKS_ERROR", payload: error.message });
      }
    };
    fetchBooks();
  }, []);

  return (
    <Navbar>
      <NavbarBrand>
        <AcmeLogo />
        <p className="font-bold text-inherit">LMS</p>
      </NavbarBrand>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          {role === "admin" ? (
            <Link to="/adminhome" aria-current="page" color="secondary">
              DashBoard
            </Link>
          ) : (
            <Link to="/" aria-current="page" color="secondary" className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
              Home
            </Link>
          )}
        </NavbarItem>

        {role !== "admin" && (
          <NavbarItem className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
            <Link to="/books" aria-current="page" color="secondary">
              Books
            </Link>
          </NavbarItem>
        )}

        <NavbarItem className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
          <Link to="/About" aria-current="page" color="secondary">
            About
          </Link>
        </NavbarItem>
        <NavbarItem className='hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 text-sm font-medium'>
          <a
            href="https://github.com/sai2wwe/Library_Management_System.git"
            target="blank"
          >
            GitHub
          </a>
        </NavbarItem>
      </NavbarContent>

      {state.isAuth ? (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end" backdrop="blur">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                size="sm"
                src="bookcover1.jpg"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" color="secondary">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{state.user.username}</p>
              </DropdownItem>
              <DropdownItem key="settings">My Transactions</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownSection aria-label="Preferences">
                <DropdownItem
                  key="signout"
                  color="danger"
                  onClick={logout}
                  textValue="Log out"
                  className="text-danger"
                  shortcut="Ctrl+Shift+L"
                >
                  Log Out
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end" as="div">
          <NavbarItem>
            <Button variant="shadow" color="secondary" size="sm">
              <Link to="/signup" color="secondary">
                Sign Up
              </Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="flat" color="secondary" size="sm">
              <Link to="/login" color="secondary">
                Log In
              </Link>
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button variant="ghost" color="secondary" size="sm">
              <Link to="/adminlogin" color="secondary">
                Admin Login
              </Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar>
  );
}
