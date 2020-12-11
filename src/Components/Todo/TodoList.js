import React, { useState } from "react";

import Todo from "./Todo";

function TodoList(props) {
  let { todos } = props;

  return (
    <>
      {todos.length === 0 ? (
        <p>there isn`t any todos</p>
      ) : (
        todos.map((item,index) => (
          <Todo
            key={item.key}
            index={index}
            item={item}
            delete={props.delete}
            edit={props.edit}
            onDragStart={props.onDragStart}
            onDragOver={props.onDragOver}
            onDrop={props.onDrop}
          />
        ))
      )}
    </>
  );
}

export default TodoList;
