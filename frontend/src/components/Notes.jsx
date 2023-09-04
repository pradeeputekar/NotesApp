import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext.jsx";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";
import "./Notes.css";

const Notes = () => {
 const navigate = useNavigate();
 const context = useContext(noteContext);
 const { notes, getNotes, editNote } = context;
 const host = "http://localhost:5000";
 const limit = 10;

 useEffect(() => {
  if (localStorage.getItem("token")) {
   getNotes();
  } else {
   navigate("/login");
  }
  // eslint-disable-next-line
 }, []);

 const ref = useRef(null);
 const refClose = useRef(null);

 const [note, setNote] = useState({
  id: "",
  etitle: "",
  edescription: "",
  etag: "",
 });

 const [currentPage, setCurrentPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);
 const [searchQuery, setSearchQuery] = useState("");

 const updateNote = (currentNote) => {
  ref.current.click();
  setNote({
   id: currentNote._id,
   etitle: currentNote.title,
   edescription: currentNote.description,
   etag: currentNote.tag,
  });
 };

 const handleClick = (e) => {
  editNote(note.id, note.etitle, note.edescription, note.etag);
  refClose.current.click();
  alert("Updated Successfully!");
 };

 const onChange = (e) => {
  setNote({ ...note, [e.target.name]: e.target.value });
 };

 const deleteUser = async () => {
  if (confirm("are you sure to delete account permantly ?") == true) {
   const response = await fetch(`${host}/api/auth/deleteuser`, {
    method: "DELETE",
    headers: {
     "Content-Type": "application/json",
     "auth-token": localStorage.getItem("token"),
    },
   });
   localStorage.removeItem("token");
   navigate("/login");
   alert("account deleted Successfully!");
  }
 };

 const startIndex = (currentPage - 1) * limit;
 const endIndex = startIndex + limit;

 const handleSearch = () => {
  if (localStorage.getItem("token")) {
   fetch(
    `${host}/api/notes/pagination?page=${currentPage}&limit=10&search=${searchQuery}`,
    {
     method: "GET",
     headers: {
      "auth-token": localStorage.getItem("token"),
     },
    }
   )
    .then((response) => {
     if (!response.ok) {
      throw new Error("Network response was not ok");
     }
     return response.json();
    })
    .then((data) => {
     setNote(data.docs);
     setTotalPages(data.totalPages);
    })
    .catch((error) => {
     console.error(error);
    });
  }
 };
 useEffect(() => {
  handleSearch();
 }, [searchQuery, currentPage]);

 return (
  <>
   <AddNote />
   <button
    type="button"
    ref={ref}
    className="btn btn-primary d-none"
    data-bs-toggle="modal"
    data-bs-target="#editModal"
   >
    Launch demo modal
   </button>
   <div
    className="modal fade"
    id="editModal"
    tabIndex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="true"
   >
    <div className="modal-dialog">
     <div className="modal-content" style={{ backgroundColor: "black" }}>
      <div className="modal-header">
       <h5
        className="modal-title"
        id="editModalLabel"
        style={{ color: "white", fontSize: "14px" }}
       >
        Edit Note
       </h5>
       <button
        type="button"
        className="btn-close"
        data-bs-dismiss="modal"
        aria-label="Close"
       ></button>
      </div>
      <div className="modal-body">
       <form className="my-3">
        <div className="mb-3">
         <label
          htmlFor="etitle"
          className="form-label"
          style={{ color: "white", fontSize: "14px" }}
         >
          Title
         </label>
         <input
          type="text"
          className="form-control"
          id="etitle"
          name="etitle"
          value={note.etitle}
          onChange={onChange}
          minLength={3}
          required
         />
        </div>
        <div className="mb-3">
         <label
          htmlFor="edescription"
          className="form-label"
          style={{ color: "white", fontSize: "14px" }}
         >
          Description
         </label>
         <input
          type="text"
          className="form-control"
          id="edescription"
          name="edescription"
          value={note.edescription}
          onChange={onChange}
          minLength={5}
          required
         />
        </div>
        <div className="mb-3">
         <label
          htmlFor="etag"
          className="form-label"
          style={{ color: "white", fontSize: "14px" }}
         >
          Tag
         </label>
         <input
          type="text"
          className="form-control"
          id="etag"
          name="etag"
          value={note.etag}
          onChange={onChange}
          minLength={5}
          required
         />
        </div>
       </form>
      </div>
      <div className="modal-footer">
       <button
        ref={refClose}
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
       >
        Close
       </button>
       <button onClick={handleClick} type="button" className="btn btn-primary">
        Update Note
       </button>
      </div>
     </div>
    </div>
   </div>

   <h2
    style={{
     color: "red",
     fontSize: "26px",
     fontWeight: "bold",
     textAlign: "center",
    }}
   >
    Your Notes
   </h2>
   <div className="search-container">
    <input
     type="text"
     placeholder="Search notes by title, description, or tag"
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button onClick={handleSearch}>Search</button>
   </div>

   {notes.length === 0 ? (
    <div style={{ color: "white", fontSize: "14px", textAlign: "center" }}>
     "No notes to display, please add atleast one note to display"
    </div>
   ) : !notes.some(
    (note) =>
      note.title.includes(searchQuery) ||
      note.description.includes(searchQuery) ||
      note.tag.includes(searchQuery)) ? (
    <div>hd</div>
   ) : (
    <div className="contain">
     {notes
      .filter(
       (note) =>
        note.title.includes(searchQuery) ||
        note.description.includes(searchQuery) ||
        note.tag.includes(searchQuery)
      )
      .slice(startIndex, endIndex)
      .map((note) => {
       return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
      })}
    </div>
   )}
   <div className="pagination">
    <button
     onClick={() => setCurrentPage(currentPage - 1)}
     disabled={currentPage === 1}
    >
     Previous
    </button>
    <span>
     Page {currentPage} of {totalPages}
    </span>
    <button
     onClick={() => setCurrentPage(currentPage + 1)}
     disabled={currentPage === totalPages}
    >
     Next
    </button>
   </div>

   <br></br>
   <button className="btn btn-outline-light btn-danger" onClick={deleteUser}>
    Delete My Account
   </button>
  </>
 );
};

export default Notes;
