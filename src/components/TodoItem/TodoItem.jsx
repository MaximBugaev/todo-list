import "./TodoItem.css";
import CompletedIcon from "@/assets/images/completed.png";
import NotCompletedIcon from "@/assets/images/notCompleted.png";
import { useState } from "react";

export function TodoItem({ title, description, important = false, day, month, year }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isImportant, setIsImportant] = useState(important);

  function onClickCompletedHandler() {
    setIsCompleted(!isCompleted);
  }

  function onClickImportantHandler() {
    setIsImportant(!isImportant);
  }

  return (
    <li
      className={
        isImportant
          ? "todo-list-item todo-list-item_important"
          : "todo-list-item"
      }
    >
      <button
        onClick={onClickCompletedHandler}
        className="todo-list-item__state"
        style={
          !isCompleted
            ? {
                backgroundColor: "#ffbc58ff",
                backgroundImage: `url(${NotCompletedIcon})`,
              }
            : {
                backgroundColor: "#4caf50",
                backgroundImage: `url(${CompletedIcon})`,
                backgroundSize: "80%",
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
            onClick={onClickImportantHandler}
            className={
              isImportant
                ? "todo-info__important-btn todo-info__important-btn_active"
                : "todo-info__important-btn"
            }
          >
            important
          </button>
          <span className="todo-info__date">
            До {[day, month, year].join('.')}
          </span>
        </div>
        <p
          className="todo-info__description"
          style={isCompleted ? { textDecoration: "line-through" } : null}
        >
          {description}
        </p>
      </div>
    </li>
  );
}
