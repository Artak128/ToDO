import React, { useState } from "react";
import style from "./TodoItem.module.scss";

function TodoItem({ changeChecked, removeTodo, changeTodo, id, isChecked, content }) {
  const [state, setState] = useState({ newContent: "" });

  function setTodoValue(e) {
    setState({ newContent: e.currentTarget.textContent });
  }

  return (
    <div className={style.TodoItem}>
      <div className={style.TodoCheckbox}>
        <input onChange={() => changeChecked(id)} type="checkbox" checked={isChecked} id={"ib" + id} />
        <label htmlFor={"ib" + id} className={style.checkedStyle}></label>
        <label
          className={isChecked ? style.isChecked : ""}
          onBlur={() => changeTodo(state.newContent, id)}
          onKeyDown={e => {
            if (e.key === "Enter") {
              changeTodo(state.newContent, id);
              e.currentTarget.blur();
            }
          }}
          onInput={setTodoValue}
          onClick={setTodoValue}
          spellCheck={false}
          suppressContentEditableWarning={true}
          contentEditable
          htmlFor="content"
        >
          {content}
        </label>
        <button onClick={() => removeTodo(id)} type="button" className={style.removeButton}></button>
      </div>
    </div>
  );
}
export default TodoItem;

