import React, { useState, useEffect } from 'react';
import "../stylesheets/PopupStyle.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import nutritionAPI from '../APIs/Nutrition';

interface CaloriIntakePopupProps {
  setShowCalorieIntakePopup: React.Dispatch<React.SetStateAction<boolean>>;
  setTodosCalorie: React.Dispatch<React.SetStateAction<{ item: string; quantity: number; calories: number }[]>>;
}

const CalorieIntakePopup: React.FC<CaloriIntakePopupProps> = ({
  setShowCalorieIntakePopup,
}) => {
  const [todosCalorie, setTodosCalorie] = useState<{ item: string, quantity: number, calories: number }[]>([]);
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  // const [calories, setCalories] = useState(0);
  const [totalCalorie, setTotalCalorie] = useState<number>(0);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todosCalorie') || '[]');
    setTodosCalorie(storedTodos);
  }, []);

  useEffect(() => {
    const calculatedTotalCalorie = todosCalorie.reduce((total, todo) => total + (todo.calories * todo.quantity), 0);
    setTotalCalorie(calculatedTotalCalorie);
  }, [todosCalorie]);

  const saveTodosToLocalStorage = (todosCalorie: { item: string, quantity: number, calories: number }[]) => {
    localStorage.setItem('todosCalorie', JSON.stringify(todosCalorie));
  };

  const handleAddTodo = () => {
    if (item.trim() !== '') {
      // Find the item in the nutritionAPI
      const foundItem = nutritionAPI.find(food => food.name.toLowerCase() === item.toLowerCase());

      if (foundItem) {
        // Calculate total calorie based on quantity
        const totalCalories = foundItem.calories * quantity;

        // Add the item to todosCalorie
        const newTodo = {
          item: foundItem.name,
          quantity: quantity,
          calories: totalCalories
        };

        const newTodos = [...todosCalorie, newTodo];
        setTodosCalorie(newTodos);
        setItem('');
        setQuantity(1);
        saveTodosToLocalStorage(newTodos);
      } else {
        // Item not found, set item to empty string
        setItem('');
        console.error('Item not found in nutritionAPI');
      }
    }
  };



  const handleRemoveTodo = (index: number) => {
    const newTodos = [...todosCalorie];
    newTodos.splice(index, 1);
    setTodosCalorie(newTodos);
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
            setShowCalorieIntakePopup(false);
          }}
        >
          <AiOutlineClose />
        </button>

        <div className="todo-input input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Food item name"
            value={item}
            onChange={(e) => setItem(e.target.value)}
          />
        </div>
        <div className="todo-input input-group">
          <input
            type="number"
            className="form-control"
            placeholder="Food item quantity (in gms)"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>
        <button className="btn btn-primary" onClick={handleAddTodo}>Add</button>
        <hr className="my-4" />
        <div className="input-group">
          <h6>Calories on {date}</h6>
        </div>
        <ul className="todo-list list-group">
          {todosCalorie.map((todo, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {todo.item}: {todo.quantity} kg - {todo.calories} calories
              <button className="btn btn-danger btn-sm" onClick={() => handleRemoveTodo(index)}>
                <AiFillDelete />
              </button>
            </li>
          ))}
        </ul>
        <div className="input-group">
          <h6>Total calories: {totalCalorie}</h6>
        </div>
      </div>
    </div>
  );
};

export default CalorieIntakePopup;
