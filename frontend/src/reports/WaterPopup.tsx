import React, { useState, useEffect } from 'react';
import "../stylesheets/PopupStyle.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import HomeBanner1 from '../components/HomeBanner1';

interface WaterPopupProps {
  setShowWaterPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

export const WaterPopup: React.FC<WaterPopupProps> = ({ setShowWaterPopup }) => {
  const [todos, setTodos] = useState<string[]>([]);
  const [task, setTask] = useState<string>('');
  const [totalWater, setTotalWater] = useState<number>(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    const calculatedTotalWater = todos.reduce((total, todo) => total + parseInt(todo), 0);
    setTotalWater(calculatedTotalWater);
  }, [todos]);

  const saveTodosToLocalStorage = (todos: string[]) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handleAddTodo = () => {
    if (task.trim() !== '') {
      const newTodos = [...todos, task];
      setTodos(newTodos);
      setTask('');
      saveTodosToLocalStorage(newTodos);
    }
  };

  const handleRemoveTodo = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
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
          className="close btn btn-secondary"
          onClick={() => {
            setShowWaterPopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <div className="todo-input input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Add Water In Milititer"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
        </div>
        <hr className="my-4" />
        <div className="input-group">
          <h6>Taken water in {date}</h6>
        </div>
        <ul className="todo-list list-group">
          {todos.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {todo} ml
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <h6>Taken water in {totalWater} ml</h6>
        </div>
        {/* Pass totalWater as prop to HomeBanner1 */}
        {/* <HomeBanner1 totalWater={totalWater} /> */}
      </div>
    </div>
  );
};

export default WaterPopup;


// WaterPopup.tsx
// import React, { useState } from 'react';
// import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
// import { useWater } from './WaterContext';

// const WaterPopup = ({ setShowWaterPopup }) => {
//   const { todos, handleAddTodo, handleRemoveTodo } = useWater();
//   const [task, setTask] = useState('');

//   const date = new Date().toLocaleDateString();

//   return (
//     <div className="popupout">
//       <div className="popupbox">
//         <button
//           className="close btn btn-secondary"
//           onClick={() => {
//             setShowWaterPopup(false);
//           }}
//         >
//           <AiOutlineClose />
//         </button>

//         <div className="todo-input input-group">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Add Water In Milliliter"
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//           />
//           <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
//         </div>
//         <hr className="my-4" />
//         <div className="input-group">
//           <h6>Taken water in {date}</h6>
//         </div>
//         <ul className="todo-list list-group">
//           {todos.map((todo, index) => (
//             <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
//               {todo} ml
//               <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
//                 <AiFillDelete />
//               </button>
//             </li>
//           ))}
//         </ul>
//         <div className="input-group">
//           <h6>Total water taken: {todos.reduce((total, todo) => total + parseInt(todo), 0)} ml</h6>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default WaterPopup;
