import React from "react";
import style from "./BottomBoard.module.scss";

function BottomBoard({ changeRenderCondition, renderCondition, clearCompleted, leftItemsCount }) {
  return (
    <div className={style.BottomBoard}>
      <p className={style.item}>{leftItemsCount} item left</p>
      <p onClick={clearCompleted} className={style.clear}>
        Clear completed
      </p>
      <div className={style.menu}>
        <button onClick={() => changeRenderCondition("All")} className={renderCondition === "All" ? style.active : ""}>
          All
        </button>
        <button onClick={() => changeRenderCondition("Active")} className={renderCondition === "Active" ? style.active : ""}>
          Active
        </button>
        <button onClick={() => changeRenderCondition("Completed")} className={renderCondition === "Completed" ? style.active : ""}>
          Completed
        </button>
      </div>
    </div>
  );
}

export default BottomBoard;
