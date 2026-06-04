function NoteDetails({ note, onToggleTask, }) {
  if (!note) {
    return (
      <div className="note-details">
        <h2> Task Details</h2>
        <p>
          Select a task list to view details.
        </p>
      </div>
    );
  }

  const completedTasks =
    note.tasks?.filter(
      (task) => task.completed
    ).length || 0;

  const totalTasks =
    note.tasks?.length || 0;

  return (
    <div className="note-details">
      <h2> {note.title}</h2>

      <div className="progress-info">
        <span>
          {completedTasks}/{totalTasks}
          {" "}Tasks Completed
        </span>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${
                totalTasks
                  ? (completedTasks /
                      totalTasks) *
                    100
                  : 0
              }%`,
            }}
          />
        </div>
      </div>

      <div className="tasks-list">
        {note.tasks?.map((task) => (
          <div
            key={task.id}
            className="task-item"
          >
           <input
  type="checkbox"
  checked={task.completed}
  onChange={() =>
    onToggleTask(note.id, task.id)
  }
/>

            <span
              className={
                task.completed
                  ? "completed-task"
                  : ""
              }
            >
              {task.text}
            </span>
          </div>
        ))}
      </div>

      <small>
        Created At: {note.createdAt}
      </small>
    </div>
  );
}

export default NoteDetails;