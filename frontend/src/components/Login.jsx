import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Login = (props) => {
 const navigate = useNavigate();
 const [credentials, setCredentials] = useState({ email: "", password: "" });
 const host = "https://notes-app-26mq.onrender.com";

 const handleSubmit = async (e) => {
  try {
   e.preventDefault();
   const response = await fetch(`${host}/api/auth/login`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     email: credentials.email,
     password: credentials.password,
    }),
   });
   const json = await response.json();
   if (json.success) {
    localStorage.setItem("token", json.authToken);
    navigate("/home");
    Swal.fire("Done!", "Logged in Successfully!", "success");
   } else {
    Swal.fire("Error", "Invalid Credentials!", "error");
   }
  } catch (error) {
   console.log(error);
   Swal.fire("Error","Internal Server Error","error");
  }
 };

 const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
 };

 return (
  <>
   <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
     <img
      className="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="NotesApp"
     />
     <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
      Sign in to your account
     </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
     <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
       <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
       >
        Email address
       </label>
       <div className="mt-2">
        <input
         id="email"
         name="email"
         type="email"
         autoComplete="email"
         required
         value={credentials.email}
         onChange={onChange}
         className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
       </div>
      </div>

      <div>
       <div className="flex items-center justify-between">
        <label
         htmlFor="password"
         className="block text-sm font-medium leading-6 text-gray-900"
        >
         Password
        </label>
       </div>
       <div className="mt-2">
        <input
         id="password"
         name="password"
         type="password"
         autoComplete="current-password"
         required
         value={credentials.password}
         onChange={onChange}
         className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
       </div>
      </div>

      <div>
       <button
        type="submit"
        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
       >
        Sign in
       </button>
      </div>
     </form>

     <p className="mt-10 text-center text-sm text-gray-500">
      Don't have an account?
      <Link
       to="/signup"
       className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
      >
       Register Here
      </Link>
     </p>
    </div>
   </div>
  </>
 );
};

export default Login;
