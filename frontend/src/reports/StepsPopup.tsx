import React, { useState, useEffect } from 'react';
import "../stylesheets/PopupStyle.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
interface StepPopupProps {
  setShowStepPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const StepPopup: React.FC<StepPopupProps> = ({
  setShowStepPopup,
}) => {
  const [todosStep, setTodosStep] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [totalStep, setTotalStep] = useState<number>(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosStep') || '[]');
    setTodosStep(storedTodos);
  }, []);

  useEffect(() => {
    const calculatedTotalSleep = todosStep.reduce((total, todosSleep) => total + parseInt(todosSleep), 0);
    setTotalStep(calculatedTotalSleep);
  }, [todosStep]);

  const saveTodosToLocalStorage = (todosSleep: string[]) => {
    localStorage.setItem('todosStep', JSON.stringify(todosStep));
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodos = [...todosStep, task];
      setTodosStep(newTodos);
      setTask('');
      saveTodosToLocalStorage(newTodos);
    }
  };

  const handleRemoveTodo = (index: number) => {
    const newTodos = todosStep.filter((_, i) => i !== index);
    setTodosStep(newTodos);
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
            setShowStepPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <div className="todo-input input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add Steps"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleAddTodo}>Add</button>
        </div>
        <hr className="my-4" />
        <div className="input-group">
          <h6>Total step in {date}</h6>
        </div>
        <ul className="todo-list list-group">
          {todosStep.map((todosStep, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {todosStep} steps
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <h6>Total Steps Are {totalStep} </h6>
        </div>
      </div>
    </div>
  );
};

export default StepPopup;
