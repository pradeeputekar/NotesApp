import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

const Navbar = () => {
 let location = useLocation();
 let navigate = useNavigate();
 const token = localStorage.getItem("token");

const handleLogout = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You'll be logged out and need to log in again to access your account.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, log out!'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      navigate("/login");
      Swal.fire('Logged Out!', 'You have been logged out successfully.', 'success');
    }
  });
};


 return (
  <>
   <nav className="navbar navbar-dark bg-dark">
    <Link className="navbar-brand text-white" to={token ? "/home" : "/"} 
    style={{ color: "purple", fontFamily: "Times New Roman" }}>
     Cloud Notes
    </Link>
    {!token ? (
     <Link
      to="/about"
      className={`text-primary mr-auto ${
       location.pathname === "/about" ? "active text-white" : ""
      }`}
     >
      About
     </Link>
    ) : (
     ""
    )}

    {!token ? (
     <div className="d-flex justify-content-end">
      <Link
       to="/login"
       className={`text-primary ${
        location.pathname === "/login" ? "active text-white" : ""
       }`}
      >
       Login
      </Link>
      <Link
       to="/signup"
       className={`text-primary mx-2 ${
        location.pathname === "/signup" ? "active text-white mx-2" : ""
       }`}
      >
       Register
      </Link>
     </div>
    ) : (
     <div className="d-flex justify-content-end">
      <button className="btn btn-danger" onClick={handleLogout}>
       Log Out
      </button>
     </div>
    )}
   </nav>
  </>
 );
};

export default Navbar;
