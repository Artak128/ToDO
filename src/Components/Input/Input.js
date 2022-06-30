import React from "react";
import { useState } from "react";
import style from "./Input.module.scss";

function Input({ addData, chooseOrNoteAllTodos }) {
  const [state, setState] = useState({ inputValue: "" });

  function setInputValue(e) {
    setState({ inputValue: e.target.value });
  }

  function handleSubmit(e) {
    addData(state.inputValue);
    setState({ inputValue: "" });
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={style.Input}>
      <label onClick={chooseOrNoteAllTodos} htmlFor="dataInput"></label>
      <input onChange={setInputValue} value={state.inputValue} id="dataInput" type="text" placeholder="What needs to be done?" />
    </form>
  );
}

export default Input;

