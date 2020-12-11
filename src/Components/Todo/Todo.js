import React, { useState } from "react";
import EditTodo from "./EditTodo";

function Todo(props) {
  const { item } = props;

  const [edit, setEdit] = useState(false);

  let editHandler = (text) => {
    props.edit(item.key, text);
    setEdit(false);
  };

  return (
    <>
      {!edit ? (
        <div style={{cursor:"pointer"}}
          className="col-8 mb-3"
          draggable="true"
          onDragStart={props.onDragStart}
          onDragOver={props.onDragOver}
          onDrop={props.onDrop}
          data-position={props.index}
        >
          <div className="d-flex justify-content-between align-items-center border rounded p-3">
            <div>{item.text}</div>
            <div>
              <button
                type="button"
                className="btn btn-info btn-sm mr-1"
                onClick={() => setEdit(true)}
              >
                edit
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm"
                onClick={() => props.delete(item.key)}
              >
                remove
              </button>
            </div>
          </div>
        </div>
      ) : (
        <EditTodo text={item.text} edit={editHandler} />
      )}
    </>
  );
}

export default Todo;
