import { useState, useEffect } from "react";

function NoteForm({ onSave, editingNote }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title || "");
      setContent(editingNote.content || "");
      setTasks(editingNote.tasks || []);
    }
  }, [editingNote]);

  const addTask = () => {
    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const removeTask = (id) => {
    setTasks(
      tasks.filter((task) => task.id !== id)
    );
  };


const handleSubmit = (e) => {
  e.preventDefault();

  if (!title.trim()) {
    alert("Please enter title");
    return;
  }

  let updatedTasks = [...tasks];

  if (taskInput.trim()) {
    updatedTasks.push({
      id: Date.now(),
      text: taskInput,
      completed: false,
    });
  }

  if (updatedTasks.length === 0) {
    alert("Add at least one task");
    return;
  }

  const noteData = {
    title,
    tasks: updatedTasks,
  };

  console.log(
    "Sending Note:",
    noteData
  );

  onSave(noteData);

  setTitle("");
  setTaskInput("");
  setTasks([]);
};
  return (
    <form
      className="note-form"
      onSubmit={handleSubmit}
    >
      <h2>
        {editingNote
          ? " Update Task List"
          : " Create Task List"}
      </h2>

      {/* Title */}
      <input
        type="text"
        placeholder="Enter list title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      {/* Description
      <textarea
        placeholder="Enter description"
        value={content}
        onChange={(e) =>
          setContent(e.target.value)
        }
        rows="4"
      /> */}

      {/* Task Input */}
      <div className="task-input-box">
        <input
          type="text"
          placeholder="Add new task"
          value={taskInput}
          onChange={(e) =>
            setTaskInput(e.target.value)
          }
        />

        <button
          type="button"
          className="add-task-btn"
          onClick={addTask}
        >
          + Add
        </button>
      </div>

      {/* Task Preview */}
      <div className="task-list-preview">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="task-preview-item"
          >
            <span>{task.text}</span>

            <button
              type="button"
              className="remove-task-btn"
              onClick={() =>
                removeTask(task.id)
              }
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      <button
        className="save-btn"
        type="submit"
      >
        {editingNote
          ? "Update List"
          : "Save List"}
      </button>
    </form>
  );
}

export default NoteForm;