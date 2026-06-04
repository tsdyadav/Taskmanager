import { useState } from "react";
import NoteItem from "./NoteItem";

function NoteList({
  notes,
  onSelect,
  onEdit,
  onDelete,
}) {
  const [searchTerm, setSearchTerm] =
    useState("");

  const filteredNotes = notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  if (notes.length === 0) {
    return (
      <div className="notes-list">
        <h2> My Task Lists</h2>

        <p className="empty-message">
          No task lists available.
          Create your first one.
        </p>
      </div>
    );
  }

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h2> My Task Lists</h2>

        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search task list..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
        />
      </div>

      {filteredNotes.length === 0 ? (
        <p className="empty-message">
          No matching task list found.
        </p>
      ) : (
        filteredNotes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            onSelect={onSelect}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default NoteList;