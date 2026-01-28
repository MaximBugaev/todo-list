import "./TodoItem.css";
import CompletedIcon from "@/assets/images/completed.png";
import NotCompletedIcon from "@/assets/images/notCompleted.png";

export function TodoItem({
  title,
  description,
  isImportant = false,
  isCompleted = false,
  day,
  month,
  year,
  removeTask,
  makeImportant,
  makeCompleted,
}) {
  return (
    <li
      className={
        isImportant
          ? "todo-list-item todo-list-item_important"
          : "todo-list-item"
      }
    >
      <button
        onClick={makeCompleted}
        className="todo-list-item__state"
        style={
          isCompleted
            ? {
                backgroundColor: "#4caf50",
                backgroundImage: `url(${CompletedIcon})`,
                backgroundSize: "80%",
              }
            : {
                backgroundColor: "#ffbc58ff",
                backgroundImage: `url(${NotCompletedIcon})`,
              }
        }
      ></button>
      <div className="todo-info">
        <div className="title-container">
          <h2
            className="todo-info__title"
            style={isCompleted ? { textDecoration: "line-through" } : null}
          >
            {title}
          </h2>
          <button
            onClick={makeImportant}
            className={
              isImportant
                ? "todo-info__important-btn todo-info__important-btn_active"
                : "todo-info__important-btn"
            }
          >
            important
          </button>
          <span
            className="todo-info__date"
            style={isCompleted ? { textDecoration: "line-through" } : null}
          >
            До {[day, month, year].join(".")}
          </span>
        </div>
        <p
          className="todo-info__description"
          style={isCompleted ? { textDecoration: "line-through" } : null}
        >
          {description}
        </p>
      </div>
      <button
        type="button"
        className="todo-list-item__close-btn"
        onClick={removeTask}
      >
        ❌
      </button>
    </li>
  );
}
