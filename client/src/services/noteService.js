import axios from "axios";

const API_URL = "http://localhost:5000/api/notes";

// Get all notes
export const getNotes = async () => {
  return await axios.get(API_URL);
};

// Get single note
export const getNoteById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Create note
export const createNote = async (note) => {
  return await axios.post(API_URL, note);
};

// Update note
export const updateNote = async (id, note) => {
  return await axios.put(`${API_URL}/${id}`, note);
};

// Delete note
export const deleteNote = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};