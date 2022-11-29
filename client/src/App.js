import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";

import Login from "./pages/login.tsx";
import Register from "./pages/register.tsx";
import User from "./pages/admin.tsx";
import NotFound from "./pages/NotFound.tsx";
import QLHT from "./pages/qlht.tsx"

import { useContext } from "react";
import Dashboard from "./pages/home.tsx";
import { AuthContext } from "./context/authContext/AuthContext";

function App() {
  const { user } = useContext(AuthContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route
            path="/login"
            element={user ? <Navigate to="/qlht" /> : <Login />}
          ></Route>
          <Route exact path="*" element={<Login />}></Route>
          {user && (
            <>
              <Route exact path="/admin" element={<User />}></Route>
              <Route exact path="/qlht" element={<QLHT />}></Route>
            </>
          )}
        </Routes>
      </Router>
      {/* <Routes>
        <Route exact path="/" element={<Dashboard />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/register" element={<Register />}></Route>
        <Route exact path="/admin" element={<User />}></Route>
        <Route exact path="*" element={<NotFound />}></Route>
      </Routes> */}
    </div>
  );
}

export default App;
