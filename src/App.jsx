import './App.css'
import { TodoList } from './components/TodoList/TodoList'
import {TodoItem } from './components/TodoItem/TodoItem'
import { Modal } from './components/Modal/Modal'
import { useState } from 'react'
import { AsideSection } from './components/AsideSection/AsideSection'

function App() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false)

  function onSubmitHandler(e) {
    e.preventDefault();
    
    const form = e.target;
    const titleValue = form.elements.title.value;
    const descriptionValue = form.elements.description.value;
    const isImportant = form.elements.important.checked;

    createTask({ title: titleValue, description: descriptionValue, isImportant });

    form.elements.title.value = '';
    form.elements.description.value = '';
    form.elements.important.checked = '';

    setOpened(!opened)
    
  }

  function createTask(task) {
    setTasks((prev) => [...prev, task])
  }

  function onClickHandler() {
    setOpened(!opened)
  }

  return (
    <div className='app'>
      <Modal open={opened} >
        <form className="flex-container" onSubmit={onSubmitHandler}>
          <h2 className='create-task-title'>Новая задача</h2>
          <input type="text" name="title" className='task-title__input' placeholder='Введите название задачи' required maxLength={100} />
          <textarea name="description" placeholder='Введите описание задачи' className='task-description__input' maxLength={400} />
          <label>
            <input type="checkbox" id='important-check' name='important'/>
            Important
          </label>

          <div className="end-btns-container">
            <button type="button" className="end-btns-container__close" onClick={onClickHandler}>Закрыть</button>
            <button type="submit" className="end-btns-container__complete">Принять</button>
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
    */}

      <AsideSection onClickHandler={onClickHandler} />

      <main>
        <h1 className="todo-title">To Do List</h1>

        <TodoList>
          {!!tasks.length ? tasks.map((task, index) => (
            <TodoItem 
              title={task.title}
              description={task.description}
              important={task.isImportant}
              key={index}
            />
          )) : <p className='tasks-placeholder'>Создайте первую задачу!</p>}
        </TodoList>
      </main>
    </div>
  )
}

export default App
