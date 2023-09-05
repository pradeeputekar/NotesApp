import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext.jsx";
import "./NoteItem.css";
import Swal from 'sweetalert2'

const NoteItem = (props) => {
 const context = useContext(noteContext);
 const { deleteNote } = context;
 const { note, updateNote } = props;

 const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to recover this note!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNote(note._id);
      Swal.fire('Deleted!', 'Your note has been deleted successfully.', 'success');
    }
  });
};

 return (
  <div className="card px-0 m-1">
   <div className="card-body p-0 border">
    <div className="bg-dark text-white d-flex align-items-center justify-content-between">
     <h5 className="card-title m-2">{note.title}</h5>
     <div>
      <i className="far fa-trash-alt mx-1" onClick={handleDelete}></i>
      <i
       className="far fa-edit mx-1"
       onClick={() => {
        updateNote(note);
       }}
      ></i>
     </div>
    </div>
    <div>
     <p className="desBox card-text m-2">{note.description}</p>
    </div>
    <div className="bg-dark text-white d-flex align-items-center justify-content-between">
     <p className="card-text m-2 bg-dark text-white">{note.tag}</p>
    </div>
   </div>
  </div>
 );
};

export default NoteItem;
