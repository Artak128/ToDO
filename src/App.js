import React, { useReducer } from "react";
import style from "./App.module.scss";
import Input from "./Components/Input/Input";
import TodoItem from "./Components/TodoItem/TodoItem";
import BottomBoard from "./Components/BottomBoard/BottomBoard";

const types = {
  addTodo: "ADDTODO",
  removeTodo: "REMOVETODO",
  changeTodo: "CHANGETODO",
  changeChecked: "CHANGECHECKED",
  changeRenderCondition: "CHANGERENDERCONDITION",
  clearCompleted: "CLEARCOMPLETED",
  chooseOrNoteAllTodos: "CHOOSEORNOTEALLTODOS",
};

function reducer(state, action) {
  switch (action.type) {
    case types.addTodo:
      const newTodo = {
        content: action.payload,
        isChecked: false,
        id: Date.now(),
      };
      return {
        ...state,
        data: [...state.data, newTodo],
      };
    case types.removeTodo:
      return {
        ...state,
        data: state.data.filter(item => item.id !== action.id),
      };
    case types.changeTodo:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.id) {
            item.content = action.payload;
            return item;
          }
          return item;
        }),
      };
    case types.changeChecked:
      return {
        ...state,
        data: state.data.map(item => {
          if (item.id === action.id) {
            const newItem = { ...item, isChecked: !item.isChecked };
            return newItem;
          }
          return item;
        }),
      };
    case types.changeRenderCondition:
      return { ...state, renderCondition: action.payload };

    case types.clearCompleted:
      return {
        ...state,
        data: state.data.filter(item => !item.isChecked),
      };

    case types.chooseOrNoteAllTodos:
      return {
        ...state,
        data: state.data.map(item => ({ ...item, isChecked: !action.payload })),
      };

    default:
      return state;
  }
}

function addTodo({ value }) {
  return {
    type: types.addTodo,
    payload: value,
  };
}

function App() {
  const [state, dispatch] = useReducer(reducer, {
    data: [],
    renderCondition: "All",
  });

  function handleAddTodo(value) {
    dispatch(addTodo({ value }));
  }

  function removeTodo(id) {
    dispatch({ type: types.removeTodo, id });
  }

  function changeTodo(value, id) {
    dispatch({ type: types.changeTodo, payload: value, id });
  }

  function changeChecked(id) {
    dispatch({ type: types.changeChecked, id });
  }

  function getActiveItemsCount() {
    return state.data.reduce((accumulator, item) => {
      if (!item.isChecked) {
        return ++accumulator;
      }
      return accumulator;
    }, 0);
  }

  function renderTodosbyCondition(condition) {
    let filtered = state.data;

    switch (condition) {
      case "Active":
        filtered = filtered.filter(item => !item.isChecked);
        break;
      case "Completed":
        filtered = filtered.filter(item => item.isChecked);
        break;
    }

    return filtered.map(item => (
      <TodoItem
        key={item.id}
        {...item}
        changeChecked={changeChecked}
        removeTodo={removeTodo}
        changeTodo={changeTodo}
      />
    ));
  }

  function changeRenderCondition(newCondition) {
    dispatch({ type: types.changeRenderCondition, payload: newCondition });
  }

  function clearCompleted() {
    dispatch({ type: types.clearCompleted });
  }

  function chooseOrNoteAllTodos() {
    const isEveryItemChecked = state.data.every(item => item.isChecked);
    dispatch({ type: types.chooseOrNoteAllTodos, payload: isEveryItemChecked });
  }

  return (
    <div className={style.Layout}>
      <h1>todos</h1>
      <Input chooseOrNoteAllTodos={chooseOrNoteAllTodos} addData={handleAddTodo} />
      {state.data.length ? renderTodosbyCondition(state.renderCondition) : null}
      {state.data.length ? (
        <BottomBoard
          clearCompleted={clearCompleted}
          renderCondition={state.renderCondition}
          changeRenderCondition={changeRenderCondition}
          leftItemsCount={getActiveItemsCount()}
        />
      ) : null}
    </div>
  );
}

export default App;
