import './AsideSection.css';
import burgerIcon from 'Images/burger-icon.png'
import calendarIcon from 'Images/calendar-icon.png'
import darkModeOffIcon from 'Images/dark-mode-icon_off.png'
import darkModeOnIcon from 'Images/dark-mode-icon_on.png'
import plusIcon from 'Images/plus-icon.svg'
import searchIcon from 'Images/search-icon.png'
import tasksIcon from 'Images/tasks-icon.png'
import { useState } from 'react';

export function AsideSection({ onClickHandler }) {
    const [opened, setOpened] = useState(true)

    function onSubmitHandler(e) {
        e.preventDefault();
        
    }

    return (
        <aside className="aside-section"> 
            <button type="button" className="aside-section__burger-btn">
                <img src={burgerIcon} width={40} height={40} />                
            </button>

            <form className='search-form' onSubmit={onSubmitHandler}>
                <div className="search-form-container">
                    <input 
                        type="text"
                        maxLength={100}
                        placeholder='Поиск задачи...'
                        className='search-form__input'
                    />
                    <button className='search-form__btn'>
                        <img src={searchIcon} width={30} height={30} />
                    </button>
                </div>
            </form>

            <div className="main-btns">
                <button type="button" className="main-btns__btn  main-btns__create-btn" onClick={onClickHandler}>
                    <img src={plusIcon} width={30} height={30} />
                    Создать задачу
                </button>
                <button type="button" className="main-btns__btn">
                    <img src={calendarIcon} width={30} height={30} />
                    Календарь
                </button>
                <button type="button" className="main-btns__btn">
                    <img src={tasksIcon} width={30} height={30} />
                    Все задачи
                </button>

                <button type="button" className="main-btns__btn">
                    <img src={darkModeOffIcon} width={30} height={30} />
                    Тёмный режим
                </button>
            </div>

        </aside>
    )
}