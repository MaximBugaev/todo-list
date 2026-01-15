import "./AsideSection.css";
import burgerIcon from "Images/burger-icon.png";
import calendarIcon from "Images/calendar-icon.png";
import darkModeOffIcon from "Images/dark-mode-icon_off.png";
import darkModeOnIcon from "Images/dark-mode-icon_on.png";
import plusIcon from "Images/plus-icon.svg";
import searchIcon from "Images/search-icon.png";
import tasksIcon from "Images/tasks-icon.png";
import { useState } from "react";

export function AsideSection({
  onClickHandler,
  onCalendarClickHandler,
  searchInput,
  clearFilters,
  changeMode,
  isDarkMode,
}) {
  const [opened, setOpened] = useState(false);

  function toggleNavigation() {
    setOpened(!opened);
  }

  return (
    <aside
      className={
        opened ? "aside-section aside-section_opened" : "aside-section"
      }
    >
      <button
        type="button"
        className="aside-section__burger-btn"
        onClick={toggleNavigation}
      >
        <img src={burgerIcon} width={40} height={40} />
      </button>

      {opened && (
        <div className="search-form-container">
          <input
            type="text"
            maxLength={100}
            {...searchInput}
            placeholder="Поиск задачи..."
            className="search-form__input"
            name="searchFormInput"
          />
          <button className="search-form__btn">
            <img src={searchIcon} width={30} height={30} />
          </button>
        </div>
      )}

      <div className="main-btns">
        <button
          type="button"
          className="main-btns__btn  main-btns__create-btn"
          onClick={onClickHandler}
        >
          <img src={plusIcon} width={30} height={30} />
          <span className="main-btns__btn-name">Cоздать задачу</span>
        </button>

        <button
          type="button"
          className="main-btns__btn"
          onClick={onCalendarClickHandler}
        >
          <img src={calendarIcon} width={30} height={30} />
          <span className="main-btns__btn-name">Календарь</span>
        </button>

        <button type="button" className="main-btns__btn" onClick={clearFilters}>
          <img src={tasksIcon} width={30} height={30} />
          <span className="main-btns__btn-name">Все задачи</span>
        </button>

        <button type="button" className="main-btns__btn" onClick={changeMode}>
          <img
            src={isDarkMode ? darkModeOnIcon : darkModeOffIcon}
            width={30}
            height={30}
          />
          <span className="main-btns__btn-name">Тёмный режим</span>
        </button>
      </div>
    </aside>
  );
}
