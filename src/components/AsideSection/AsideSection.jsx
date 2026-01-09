import "./AsideSection.css";
import burgerIcon from "Images/burger-icon.png";
import calendarIcon from "Images/calendar-icon.png";
import darkModeOffIcon from "Images/dark-mode-icon_off.png";
// import darkModeOnIcon from "Images/dark-mode-icon_on.png";
import plusIcon from "Images/plus-icon.svg";
import searchIcon from "Images/search-icon.png";
import tasksIcon from "Images/tasks-icon.png";
import { useState } from "react";

export function AsideSection({
  onClickHandler,
  onCalendarClickHandler,
  searchValue,
  setSearchValue,
}) {
  const [opened, setOpened] = useState(true);
  function closeSection() {
    setOpened(!opened);
  }

  return (
    <aside className="aside-section">
      <button
        type="button"
        className="aside-section__burger-btn"
        onClick={closeSection}
      >
        <img src={burgerIcon} width={40} height={40} />
      </button>

      {opened && (
        <div className="search-form-container">
          <input
            type="text"
            maxLength={100}
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
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
          {opened && "Cоздать задачу"}
        </button>
        <button
          type="button"
          className="main-btns__btn"
          onClick={onCalendarClickHandler}
        >
          <img src={calendarIcon} width={30} height={30} />
          {opened && "Календарь"}
        </button>
        <button type="button" className="main-btns__btn">
          <img src={tasksIcon} width={30} height={30} />
          {opened && "Все задачи"}
        </button>

        <button type="button" className="main-btns__btn">
          <img src={darkModeOffIcon} width={30} height={30} />
          {opened && "Тёмный режим"}
        </button>
      </div>
    </aside>
  );
}
