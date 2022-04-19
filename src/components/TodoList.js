import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";
import TodoItem from "./TodoItem";

const TodoListBlock = styled.div`
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
`;

function TodoList() {
  const state = useTodoState();
  console.log(state);

  return (
    <TodoListBlock>
      <TodoItem text="스벅가기" done={true} />
      <TodoItem text="코딩테스트 스터디" done={true} />
      <TodoItem text="인강듣고 공부하기" done={false} />
      <TodoItem text="유튭보기" done={false} />
    </TodoListBlock>
  );
}

export default TodoList;
