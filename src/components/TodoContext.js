import React, { createContext, useContext, useReducer, useRef } from "react";

const initialTodos = [
  {
    id: 1,
    text: "프로젝트 1",
    done: true,
  },
  {
    id: 2,
    text: "프로젝트 2",
    done: true,
  },
  {
    id: 3,
    text: "프로젝트 3",
    done: false,
  },
  {
    id: 4,
    text: "프로젝트 4",
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return state.concat(action.todo);

    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );

    case "REMOVE":
      return state.filter((todo) => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(5);
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

//state, dispatch context를 따로만들어주어서 나중에 최적화하기 유용하게 해준다.
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("Cannot find TodoProvider");
  }
  return context;
}
