import "./TodoList.css";
export function TodoList({ children }) {
  return <ul className="todo-list">{children}</ul>;
}
