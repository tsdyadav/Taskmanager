import { useEffect, useState } from "react";
import "./App.css";

import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import NoteDetails from "./components/NoteDetails";

import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "./services/noteService";

function App() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response = await getNotes();

      setNotes(response.data);

      setError("");
    } catch (err) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSave = async (note) => {
    try {
      if (editingNote) {
        await updateNote(editingNote.id, note);
        setEditingNote(null);
      } else {
        await createNote(note);
      }

      fetchNotes();
    } catch (err) {
      setError("Failed to save note");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      if (selectedNote?.id === id) {
        setSelectedNote(null);
      }

      fetchNotes();
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div className="app">
      <h1 className="heading">📝 Notes Manager</h1>

      {error && (
        <p style={{ color: "red", textAlign: "center" }}>
          {error}
        </p>
      )}

      <div className="container">
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
        />

        <div>
          <div className="notes-list">
            <NoteList
              notes={notes}
              onSelect={setSelectedNote}
              onEdit={setEditingNote}
              onDelete={handleDelete}
            />
          </div>

          <NoteDetails note={selectedNote} />
        </div>
      </div>
    </div>
  );
}

export default App;