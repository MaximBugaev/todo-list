import "./App.css";
import { TodoList } from "./components/TodoList/TodoList";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { Modal } from "./components/Modal/Modal";
import { useState } from "react";
import { AsideSection } from "./components/AsideSection/AsideSection";
import { useInput } from "./hooks/useInput";
import { useDarkMode } from "./hooks/useDarkMode";
import { useTasks } from "./hooks/useTasks.";

function App() {
  const { tasks, createTask, removeTask, makeImportant, makeCompleted } = useTasks(); 
  const [opened, setOpened] = useState(false);
  const [calendarOpened, setCalendarOpened] = useState(false);
  const searchInput = useInput("");

  const currentMonth = new Date().getMonth();
  const [month, setMonth] = useState(currentMonth);

  const [yearFilter, setYearFilter] = useState(null);
  const [monthFilter, setMonthFilter] = useState(null);
  const [dayFilter, setDayFilter] = useState(null);

  const { isDarkMode, toggle } = useDarkMode()

  const daysInMonth = new Date(1971, month + 1, 0).getDate();

  function getDate(e) {
    return {
      day: e.target.elements.day.value,
      month: e.target.elements.month.value,
      year: e.target.elements.year.value,
    };
  }

  function onSubmitHandler(e) {
    e.preventDefault();

    const form = e.target;
    const titleValue = form.elements.title.value;
    const descriptionValue = form.elements.description.value;
    const isImportant = form.elements.important.checked;

    const { day, month: monthValue, year } = getDate(e);

    createTask({
      id: crypto.randomUUID(),
      title: titleValue,
      description: descriptionValue,
      isImportant,
      day,
      month: monthValue,
      year,
    });

    form.elements.title.value = "";
    form.elements.description.value = "";
    form.elements.important.checked = "";

    setOpened(!opened);
  }

  function onCalendarSubmit(e) {
    e.preventDefault();

    const { day, month: monthValue, year } = getDate(e);

    setYearFilter(year);
    setDayFilter(day);
    setMonthFilter(monthValue);

    setCalendarOpened(!calendarOpened);
  }

  function clearFilters() {
    setYearFilter(null);
    setDayFilter(null);
    setMonthFilter(null);
  }

  function onClickHandler() {
    setOpened(!opened);
  }

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchInput.value) ||
        task.description?.toLowerCase().includes(searchInput.value)) &&
      (task.year === yearFilter || !yearFilter) &&
      (task.month === monthFilter || !monthFilter) &&
      (task.day === dayFilter || !dayFilter)
  );

  return (
    <div className="app">
      <Modal
        open={opened}
        style={
          isDarkMode
            ? { backgroundColor: "#434343", borderColor: "rgb(255, 92, 92)" }
            : null
        }
      >
        <form className="flex-container" onSubmit={onSubmitHandler}>
          <h2
            className="create-task-title"
            style={isDarkMode ? { color: "#ffffff" } : null}
          >
            Новая задача
          </h2>
          <input
            type="text"
            name="title"
            className="task-title__input"
            placeholder="Введите название задачи"
            required
            maxLength={100}
          />
          <textarea
            name="description"
            placeholder="Введите описание задачи"
            className="task-description__input"
            maxLength={400}
          />

          <h3
            className="create-task__date-title"
            style={isDarkMode ? { color: "#ffffff" } : null}
          >
            Срок выполнения:
          </h3>
          <div className="date-select">
            <select name="year" required>
              <option value="">Выберите год</option>
              {Array.from({ length: 15 }).map((_, i) => (
                <option
                  value={i + new Date().getFullYear()}
                  key={i + 1}
                  selected={i === 0}
                  required
                >
                  {i + new Date().getFullYear()}
                </option>
              ))}
            </select>

            <select
              name="month"
              value={month + 1}
              onChange={(e) => setMonth(e.target.value - 1)}
              required
            >
              <option value="">Выберите месяц</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option value={i + 1} key={i + 1} required>
                  {i + 1}
                </option>
              ))}
            </select>

            <select name="day" required>
              <option value="">Выберите день</option>
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <option
                  value={i + 1}
                  key={i + 1}
                  selected={i === new Date().getDate() - 1}
                  required
                >
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <label>
            <input type="checkbox" id="important-check" name="important" />
            Important
          </label>

          <div className="end-btns-container">
            <button
              type="button"
              className="end-btns-container__close"
              onClick={onClickHandler}
            >
              Закрыть
            </button>
            <button type="submit" className="end-btns-container__complete">
              Принять
            </button>
          </div>
        </form>
      </Modal>

      <Modal
        open={calendarOpened}
        style={
          isDarkMode
            ? { backgroundColor: "#434343", borderColor: "rgb(255, 92, 92)" }
            : null
        }
      >
        <form className="calendar" onSubmit={onCalendarSubmit}>
          <h2
            className="calendar__title"
            style={isDarkMode ? { color: "#ffffff" } : null}
          >
            Найти по дате
          </h2>
          <div className="date-select">
            <select name="year" required>
              <option value="">Выберите год</option>
              {Array.from({ length: 15 }).map((_, i) => (
                <option
                  value={i + new Date().getFullYear()}
                  key={i + 1}
                  selected={i === 0}
                >
                  {i + new Date().getFullYear()}
                </option>
              ))}
            </select>

            <select name="month" onChange={(e) => setMonth(e.target.value - 1)}>
              <option value="">Выберите месяц</option>
              {Array.from({ length: 12 }).map((_, i) => (
                <option value={i + 1} key={i + 1} required>
                  {i + 1}
                </option>
              ))}
            </select>

            <select name="day">
              <option value="">Выберите день</option>
              {Array.from({ length: daysInMonth }).map((_, i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="end-btns-container">
            <button
              type="button"
              className="end-btns-container__close"
              onClick={() => setCalendarOpened(!calendarOpened)}
            >
              Закрыть
            </button>
            <button type="submit" className="end-btns-container__complete">
              Принять
            </button>
          </div>
        </form>
      </Modal>

      {/* 
  ASIDE NAVIGATION + сделать сортировку задач
  поиск задач (по тегам тоже)
  1. сюда кнопку создать + выделить её как-то
  2. календарь
  3. dark mode

  (в mobile ver сделать иконки без названий)
  но для начала сделай адаптивность, затем localStorage


  // когда буду делать localStor, можно сделать кастомный хук useTasks

  и еще модалку с приветствием через useEffect
  */}

      <AsideSection
        onClickHandler={onClickHandler}
        onCalendarClickHandler={() => setCalendarOpened(!calendarOpened)}
        searchInput={searchInput}
        clearFilters={clearFilters}
        changeMode={toggle}
        isDarkMode={isDarkMode}
      />

      <main>
        <h1 className={isDarkMode ? "todo-title" : "todo-title gradient-color"}>
          To Do List
        </h1>

        <TodoList>
          {filteredTasks.length ? (
            filteredTasks.map((task) => (
              <TodoItem
                title={task.title}
                description={task.description}
                important={task.isImportant}
                day={task.day}
                month={task.month}
                year={task.year}
                key={task.id}
                removeTask={() => removeTask(task.id)}
                makeImportant={() => makeImportant(task.id)}
                makeCompleted={() => makeCompleted(task.id)}
              />
            ))
          ) : (
            <p
              className={
                isDarkMode
                  ? "tasks-placeholder"
                  : "tasks-placeholder gradient-color"
              }
            >
              {yearFilter
                ? "Нет задач с такой датой"
                : "Создайте первую задачу!"}
            </p>
          )}
        </TodoList>
      </main>
    </div>
  );
}

export default App;