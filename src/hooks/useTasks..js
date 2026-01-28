import { useEffect, useState } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function removeTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function makeImportant(taskToUpdate) {
    const changedTask = {
      ...taskToUpdate,
      isImportant: !taskToUpdate.isImportant,
    };

    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskToUpdate.id ? changedTask : task)),
    );
  }

  function makeCompleted(taskToUpdate) {
    const changedTask = {
      ...taskToUpdate,
      isCompleted: !taskToUpdate.isCompleted,
    };

    setTasks((tasks) =>
      tasks.map((task) => (task.id === taskToUpdate.id ? changedTask : task)),
    );
  }

  return {
    tasks,
    createTask: (task) => setTasks((prev) => [...prev, task]),
    removeTask,
    makeImportant,
    makeCompleted,
  };
}
