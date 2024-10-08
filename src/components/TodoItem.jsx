import React, { useState } from "react";

const TodoItem = ({ todo,handleDelete }) => {
  const [completed, setcompleted] = useState(todo.completed);
  const handleClick = () => {
    setcompleted(!completed);

    console.log(todo.completed);
  };
  return (
    <div className=" w-full shadow-md bg-white rounded-md p-4 flex items-center justify-between">
      <input
        type="checkbox"
        checked={completed}
        onChange={handleClick}
        className=" cursor-pointer"
      />
      <h3
        className={`${
          completed ? "line-through " : ""
        }font-serif w-full text-left ml-3`}
      >
        {todo.title}
      </h3>
      <p onClick={handleDelete} className=" bg-red-400 text-white text-xl py-0 px-3">-</p>
    </div>
  );
};

export default TodoItem;
