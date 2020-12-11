import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

// Import Components
import Header from "./Layouts/Header";
import FormAddTodo from "./Todo/FormAddTodo";
import TodoList from "./Todo/TodoList";

function App() {
  const initialDnDState = {
    draggedFrom: null,
    draggedTo: null,
    isDragging: false,
    originalOrder: [],
    updatedOrder: [],
  };
  const [dragAndDrop, setDragAndDrop] = React.useState(initialDnDState);

  const [todos, setTodos] = useState([]);

  const deleteTodo = (key) => {
    console.log(todos);
    setTodos(todos.filter((item) => item.key !== key));
  };

  const addTodo = (text) => {
    setTodos([...todos, { key: Date.now(), text: text }]);
  };

  const editTodo = (key, text) => {
    let item = todos.find((item) => item.key === key);
    item.text = text;
    let newTodos = todos.filter((item) => item.key !== key);
  };

  const onDragStart = (event) => {
    const initialPosition = Number(event.currentTarget.dataset.position);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: initialPosition,
      isDragging: true,
      originalOrder: todos,
    });
    event.dataTransfer.setData("text/html", "");
  };

  const onDragOver = (event) => {
    event.preventDefault();

    let newList = dragAndDrop.originalOrder;
    const draggedFrom = dragAndDrop.draggedFrom;
    const draggedTo = Number(event.currentTarget.dataset.position);
    const itemDragged = newList[draggedFrom];
    const remainingItems = newList.filter(
      (item, index) => index !== draggedFrom
    );

    newList = [
      ...remainingItems.slice(0, draggedTo),
      itemDragged,
      ...remainingItems.slice(draggedTo),
    ];

    if (draggedTo !== dragAndDrop.draggedTo) {
      setDragAndDrop({
        ...dragAndDrop,
        updatedOrder: newList,
        draggedTo: draggedTo,
      });
    }
  };
  const onDrop = () => {
    setTodos(dragAndDrop.updatedOrder);
    setDragAndDrop({
      ...dragAndDrop,
      draggedFrom: null,
      draggedTo: null,
      isDragging: false,
    });
  };

  return (
    <div className="App">
      <Header />
      <main>
        <section className="jumbotron">
          <div className="container d-flex flex-column align-items-center">
            <p className="lead text-muted">
              To get started, add some items to the below list:
            </p>
            <FormAddTodo add={addTodo} />
          </div>
        </section>
        <div className="todosList">
          <div className="container">
            <div className="d-flex flex-column align-items-center ">
              <TodoList
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDrop={onDrop}
                todos={todos}
                delete={deleteTodo}
                edit={editTodo}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
