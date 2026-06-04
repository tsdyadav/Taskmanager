function NoteItem({
  note,
  onSelect,
  onEdit,
  onDelete,
}) {
  const completedTasks =
    note.tasks?.filter(
      (task) => task.completed
    ).length || 0;

  const totalTasks =
    note.tasks?.length || 0;

  return (
    <div className="note-card">
      <div className="note-header">
        <h3>{note.title}</h3>
      </div>

      {/* Task Preview */}
      <div className="task-preview">
        {note.tasks &&
          note.tasks
            .slice(0, 3)
            .map((task) => (
              <p
                key={task.id}
                className={
                  task.completed
                    ? "completed-task"
                    : ""
                }
              >
                {task.completed
                  ? "✓"
                  : "○"}{" "}
                {task.text}
              </p>
            ))}
      </div>

      {/* Progress */}
      <div className="progress-info">
        <span>
          {completedTasks}/
          {totalTasks} Completed
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

      {/* Actions */}
      <div className="actions">
        <button
          className="view-btn"
          onClick={() => onSelect(note)}
        >
          👁 View
        </button>

        <button
          className="edit-btn"
          onClick={() => onEdit(note)}
        >
          ✏ Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(note.id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default NoteItem;