import React, { useState, useEffect } from 'react';
import "../stylesheets/PopupStyle.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

interface WeightPopupProps {
  setShowWeightPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const WeightPopup: React.FC<WeightPopupProps> = ({
  setShowWeightPopup,
}) => {
  const [todosWeight, setTodosWeight] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [totalWeight, setTotalWeight] = useState<number>(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosWeight') || '[]');
    setTodosWeight(storedTodos);
  }, []);

  useEffect(() => {
    const calculatedTotalWeight = todosWeight.reduce((total, todosWeight) => total + parseInt(todosWeight), 0);
    setTotalWeight(calculatedTotalWeight);
  }, [todosWeight]);

  const saveTodosToLocalStorage = (todosWeight: string[]) => {
    localStorage.setItem('todosWeight', JSON.stringify(todosWeight));
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodos = [...todosWeight, task];
      setTodosWeight(newTodos);
      setTask('');
      saveTodosToLocalStorage(newTodos);
    }
  };

  const handleRemoveTodo = (index: number) => {
    const newTodos = todosWeight.filter((_, i) => i !== index);
    setTodosWeight(newTodos);
    saveTodosToLocalStorage(newTodos);
  };


  function formatDateTime() {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    // const formattedDateTime = date.toLocaleString('en-IN', options);
    const formattedDateTime = date.toDateString();

    return formattedDateTime;
  }

  const date = formatDateTime();
  console.log(date); // Output: "Thu Feb 29 2024 00:34"
  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowWeightPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>
        <div className="todo-input input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add Weight in kg"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
        </div>
        <hr className="my-4" />
        <div className="input-group">
          <h6>Weight in {date}</h6>
        </div>
        <ul className="todo-list list-group">
          {todosWeight.map((todosWeight, index) => (

            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              Weight is : {todosWeight} kg
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <h6>Total wight is {totalWeight} kg</h6>
        </div>
      </div>
    </div>
  );
};

export default WeightPopup;
