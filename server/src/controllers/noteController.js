const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "../data/notes.json"
);

// Read Notes
const getNotes = () => {
  try {
    const data = fs.readFileSync(
      filePath,
      "utf-8"
    );

    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Save Notes
const saveNotes = (notes) => {
  fs.writeFileSync(
    filePath,
    JSON.stringify(notes, null, 2)
  );
};

// ===========================
// GET ALL NOTES
// ===========================

exports.getAllNotes = (req, res) => {
  try {
    const notes = getNotes();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch notes",
    });
  }
};

// ===========================
// GET NOTE BY ID
// ===========================

exports.getNoteById = (req, res) => {
  try {
    const notes = getNotes();

    const note = notes.find(
      (note) =>
        note.id === Number(req.params.id)
    );

    if (!note) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({
      error: "Server error",
    });
  }
};

// ===========================
// CREATE NOTE
// ===========================

exports.createNote = (req, res) => {
  try {
    console.log(
      "Incoming Data:",
      req.body
    );

    const {
      title,
      content,
      tasks,
    } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (
      !tasks ||
      !Array.isArray(tasks) ||
      tasks.length === 0
    ) {
      return res.status(400).json({
        error:
          "At least one task is required",
      });
    }

    const notes = getNotes();

    const newNote = {
      id: Date.now(),

      title: title.trim(),

      content:
        content?.trim() || "",

      tasks,

      createdAt: new Date()
        .toISOString()
        .split("T")[0],
    };

    notes.push(newNote);

    saveNotes(notes);

    res.status(201).json(newNote);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Failed to create note",
    });
  }
};

// ===========================
// UPDATE NOTE
// ===========================

exports.updateNote = (req, res) => {
  try {
    const notes = getNotes();

    const noteIndex =
      notes.findIndex(
        (note) =>
          note.id ===
          Number(req.params.id)
      );

    if (noteIndex === -1) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    notes[noteIndex] = {
      ...notes[noteIndex],
      ...req.body,
    };

    saveNotes(notes);

    res.status(200).json(
      notes[noteIndex]
    );
  } catch (error) {
    res.status(500).json({
      error: "Failed to update note",
    });
  }
};

// ===========================
// DELETE NOTE
// ===========================

exports.deleteNote = (req, res) => {
  try {
    const notes = getNotes();

    const filteredNotes =
      notes.filter(
        (note) =>
          note.id !==
          Number(req.params.id)
      );

    if (
      filteredNotes.length ===
      notes.length
    ) {
      return res.status(404).json({
        error: "Note not found",
      });
    }

    saveNotes(filteredNotes);

    res.status(200).json({
      message:
        "Task list deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete note",
    });
  }
};