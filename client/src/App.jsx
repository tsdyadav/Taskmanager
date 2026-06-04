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
  const [selectedNote, setSelectedNote] =
    useState(null);

  const [editingNote, setEditingNote] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // Fetch Task Lists
  const fetchNotes = async () => {
    try {
      setLoading(true);

      const response =
        await getNotes();

      setNotes(response.data);

      setError("");
    } catch (error) {
      setError(
        "Failed to fetch task lists"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Create / Update Task List
  const handleSave = async (
    noteData
  ) => {
    try {
      if (editingNote) {
        await updateNote(
          editingNote.id,
          noteData
        );

        setEditingNote(null);
      } else {
        await createNote(noteData);
      }

      fetchNotes();
    } catch (error) {
      setError(
        "Failed to save task list"
      );
    }
  };

  // Delete Task List
  const handleDelete = async (
    id
  ) => {
    try {
      await deleteNote(id);

      if (
        selectedNote &&
        selectedNote.id === id
      ) {
        setSelectedNote(null);
      }

      fetchNotes();
    } catch (error) {
      setError(
        "Failed to delete task list"
      );
    }
  };

  // Loading Screen
  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    );
  }

  const totalTasks = notes.reduce(
    (total, note) =>
      total +
      (note.tasks?.length || 0),
    0
  );

  const completedTasks =
    notes.reduce(
      (total, note) =>
        total +
        (note.tasks?.filter(
          (task) =>
            task.completed
        ).length || 0),
      0
    );
  

     const handleToggleTask = async (
  noteId,
  taskId
) => {
  try {
    const note = notes.find(
      (n) => n.id === noteId
    );

    if (!note) return;

    const updatedNote = {
      ...note,
      tasks: note.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              completed:
                !task.completed,
            }
          : task
      ),
    };

    await updateNote(
      noteId,
      updatedNote
    );

    setNotes((prevNotes) =>
      prevNotes.map((n) =>
        n.id === noteId
          ? updatedNote
          : n
      )
    );

    setSelectedNote(updatedNote);
  } catch (error) {
    console.error(error);
    setError(
      "Failed to update task"
    );
  }
};
  return (
  <div className="app">
    {/* Hero */}
    <div className="hero">
      <div>
        <h1> Task Dashboard</h1>
        <p>
          Manage tasks, track progress,
          and stay productive.
        </p>
      </div>
    </div>

    {/* Error */}
    {error && (
      <p className="error-message">
        {error}
      </p>
    )}

    {/* Stats */}
    <div className="stats-container">
      <div className="stat-card">
        <h3>{notes.length}</h3>
        <p>Task Lists</p>
      </div>

      <div className="stat-card">
        <h3>{totalTasks}</h3>
        <p>Total Tasks</p>
      </div>

      <div className="stat-card">
        <h3>{completedTasks}</h3>
        <p>Completed</p>
      </div>
    </div>

    {/* Dashboard Layout */}
    <div className="dashboard-layout">

      {/* Left Column */}
      <div className="left-column">
        <NoteForm
          onSave={handleSave}
          editingNote={editingNote}
        />

        <NoteList
          notes={notes}
          onSelect={setSelectedNote}
          onEdit={setEditingNote}
          onDelete={handleDelete}
        />
      </div>

      {/* Right Column */}
      <div className="right-column">
        <NoteDetails
          note={selectedNote}
          onToggleTask={handleToggleTask}
        />
      </div>

    </div>
  </div>
);
}

export default App;