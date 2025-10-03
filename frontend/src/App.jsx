import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Query from "./components/Query.jsx";

import BookDetail from "./components/Book.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/notfound.jsx";
import SignUp from "./Auth/Signup.jsx";
import Login from "./Auth/login2.jsx";
import Answer from "./pages/Answer.jsx";
import Index from "./pages/index.jsx";
import AllBooks from "./pages/AllBooks";

import AdminLogin from "./admin/adminlogin.jsx";
import AdminHome from "./admin/adminhome.jsx";
import FantasyBooks from "./pages/FantasyBooks.jsx";
import SciFiBooks from "./pages/ScifiBooks.jsx";
import CrimeBooks from "./pages/CrimeBooks.jsx";

import "./App.css";

import { useAuthContext } from "./hooks/useAuthContext.jsx";

function App() {
  const { state } = useAuthContext();

  return (
    <main>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={state.isAuth ? <Home /> : <Index/>}
          />
          <Route path="/about" element={state.isAuth ? <About /> : <Login/>} />
          <Route path="/books" element={state.isAuth ? <AllBooks /> : <Login/>} />
          <Route path="/books/fantasy" element={state.isAuth ? <FantasyBooks /> : <Login/>} />
          <Route path="/books/crime" element={state.isAuth ? <CrimeBooks /> : <Login/>} />
          <Route path="/books/scifi" element={state.isAuth ? <SciFiBooks /> : <Login/>} />
          <Route path="/books/:id" element={state.isAuth ? <BookDetail /> : <Login/>} />
          <Route path="/books/:id/query" element={state.isAuth ? <Query /> : <Login/>}>
          </Route>
          <Route path="/books/:id/query/:qid" element={state.isAuth ? <Answer /> : <Login/>} />
          <Route
            path="/signup"
            element={!state.isAuth ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!state.isAuth ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/adminlogin" element={!state.isAuth ? (
            <AdminLogin/>
          ): (
            <Navigate to="/adminhome" />
          )
          } />
          <Route
            path="/adminhome"
            element={
              (state.isAuth && state.role === 'admin') ? (
                <AdminHome />
              ) : (
                <Navigate to="/adminlogin" />
              )
            }
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
