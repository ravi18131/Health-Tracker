import React, { useState, useEffect } from 'react';
import "../stylesheets/PopupStyle.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";

interface SleepPopupProps {
  setShowSleepPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const SleepPopup: React.FC<SleepPopupProps> = ({
  setShowSleepPopup,
}) => {
  const [todosSleep, setTodosSleep] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [totalSleep, setTotalSleep] = useState<number>(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosSleep') || '[]');
    setTodosSleep(storedTodos);
  }, []);

  useEffect(() => {
    const calculatedTotalSleep = todosSleep.reduce((total, todosSleep) => total + parseInt(todosSleep), 0);
    setTotalSleep(calculatedTotalSleep);
  }, [todosSleep]);

  const saveTodosToLocalStorage = (todosSleep: string[]) => {
    localStorage.setItem('todosSleep', JSON.stringify(todosSleep));
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodos = [...todosSleep, task];
      setTodosSleep(newTodos);
      setTask('');
      saveTodosToLocalStorage(newTodos);
    }
  };

  const handleRemoveTodo = (index : number) => {
    const newTodos = todosSleep.filter((_, i) => i !== index);
    setTodosSleep(newTodos);
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


  // const date = new Date().toLocaleDateString();
  return (
    <div className="popupout">
      <div className="popupbox">
        <button
          className="close"
          onClick={() => {
            setShowSleepPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <div className="todo-input input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add sleep in hours"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-danger" onClick={handleAddTodo}>Add</button>
        </div>
        <hr className="my-4" />
        <div className="input-group">
          <h6>Taken water in {date}</h6>
        </div>
        <ul className="todo-list list-group">
          {todosSleep.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {todo} hr
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <h6>Total Sleep {totalSleep} hr</h6>
        </div>
      </div>
    </div>
  );
};

export default SleepPopup;
