import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.jsx";

const AddNote = () => {
 const context = useContext(noteContext);
 const { addNote } = context;

 const [note, setNote] = useState({ title: "", description: "", tag: "" });

 const handleClick = (e) => {
  e.preventDefault();
  if (note.title.length < 3) {
   alert("title must atleast 3 character");
  } else if (note.description.length < 5) {
   alert("description must be atleast 5 character");
  } else if (note.tag.length < 1) alert("tag should not blank");
  else {
   addNote(note.title, note.description, note.tag);
   setNote({ title: "", description: "", tag: "" });
   alert("Added Successfully!");
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
