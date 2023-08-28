import React from "react";
import "./About.css";

const About = () => {
 return (
  <div className="container">
   <h1>About Me</h1>
   <div className="about-content">
    <p>
     Welcome to our cloud-based note-taking app! With this app, you can access
     your notes from anywhere by logging in with a valid email and password. To
     get started, create your account. Once your account is successfully
     created, you can easily add, edit, and delete your notes. Rest assured,
     your notes are completely private and accessible only to you.
    </p>
    <p className="warning">
     <span className="warning-icon">⚠️ WARNING :</span>After submitting the
     login or registration form, please wait for a few seconds. The app requires
     some time to communicate with the server. If you encounter any issues while
     using this web app, please feel free to contact us at developer.help.905@gmail.com.
    </p>
   </div>
  </div>
 );
};

export default About;
