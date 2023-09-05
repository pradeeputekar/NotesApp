import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.jsx";
import Swal from "sweetalert2";

const AddNote = () => {
 const context = useContext(noteContext);
 const { addNote } = context;

 const [note, setNote] = useState({ title: "", description: "", tag: "" });

 const handleClick = (e) => {
  e.preventDefault();
  if (note.title.length < 3) {
   Swal.fire(
    "Invalid Title",
    "Title must be atleast 3 characters long",
    "warning"
   );
  } else if (note.description.length < 5) {
   Swal.fire(
    "Invalid Description",
    "Description must be atleast 5 characters long",
    "warning"
   );
  } else if (note.tag.length < 1) {
   Swal.fire("Invalid Tag", "Tag should not be blank", "warning");
  } else {
   addNote(note.title, note.description, note.tag);
   setNote({ title: "", description: "", tag: "" });
   Swal.fire("Done!", "Note Added Successfully", "success");
  }
 };

 const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
 };

 return (
  <div className="container my-3">
   <h2
    style={{
     color: "red",
     fontSize: "26px",
     fontWeight: "bold",
     textAlign: "center",
    }}
   >
    Add New Note
   </h2>
   <form className="my-3">
    <div className="mb-3">
     <label
      htmlFor="title"
      className="form-label"
      style={{ color: "white", fontSize: "14px" }}
     >
      Title
     </label>
     <input
      type="text"
      className="form-control"
      id="title"
      name="title"
      value={note.title}
      onChange={onChange}
      minLength={5}
      required
     />
    </div>
    <div className="mb-3">
     <label
      htmlFor="description"
      className="form-label"
      style={{ color: "white", fontSize: "14px" }}
     >
      Description
     </label>
     <input
      type="text"
      className="form-control"
      id="description"
      name="description"
      value={note.description}
      onChange={onChange}
      minLength={5}
      required
     />
    </div>
    <div className="mb-3">
     <label
      htmlFor="tag"
      className="form-label"
      style={{ color: "white", fontSize: "14px" }}
     >
      Tag
     </label>
     <input
      type="text"
      className="form-control"
      id="tag"
      name="tag"
      value={note.tag}
      onChange={onChange}
      minLength={5}
      required
     />
    </div>
    <button type="submit" className="btn btn-primary" onClick={handleClick}>
     Add Note
    </button>
   </form>
  </div>
 );
};

export default AddNote;
