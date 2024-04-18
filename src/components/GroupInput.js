import React, { useState } from 'react';
import { FaArrowRight } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";

function GroupInput() {
  const [inputRanges, setInputRanges] = useState([{ id: 1, value1: 1, value2: 1 }]);
  const [todos, setTodos] = useState([]);

  const [input1,setInput1] = useState();
  const [input2,setInput2] = useState();

  const handleInputChange = (index, event, field) => {
    const { value } = event.target;
    const newRanges = [...inputRanges];
    newRanges[index][field] = value >= 1 && value <= 10 ? parseInt(value) : 1;
    setInputRanges(newRanges);
  };

  const handleAddInput = () => {
    const newId = inputRanges.length + 1;
    setInputRanges([...inputRanges, { id: newId, value1: 1, value2: 1 }]);
  };

  const handleDeleteInput = (id) => {
    if (id !== 1) {
      const newRanges = inputRanges.filter(input => input.id !== id);
      setInputRanges(newRanges);
    }
  };

  const fetchTodos = () => {

    const allTodos = [];


    const idRanges = inputRanges.map((data) => {
        setInput1(data.value1);
        setInput2(data.value2);
    });


    fetch(`https://jsonplaceholder.typicode.com/todos?_start=${input1}&_end=${input2}`)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);

        allTodos.push(...data);
        setTodos(allTodos);

      });

      console.log("allTodos----149",allTodos);

  };


  return (
    <div className='Container'>
      {inputRanges.map((input, index) => (
        <div key={input.id} className='InputBox'>
          <div className='RangeWrapper'>
          
          <div className='inputval'>
            Group {input.id}
            </div>

            <input
              type="number"
              value={input.value1}
              onChange={(event) => handleInputChange(index, event, 'value1')}
              min="1"
              max="10"
            />

          </div>
          <div className='RangeWrapper'>
          
            <div className='inputval'>
            <FaArrowRight className='arrow'/>
            </div>

            <input
              type="number"
              value={input.value2}
              onChange={(event) => handleInputChange(index, event, 'value2')}
              min="1"
              max="10"
            />
          </div>
          {index !== 0 && <button className='BtnDelete' onClick={() => handleDeleteInput(input.id)}><MdDelete className='deleteIcon'/></button>}
        </div>
      ))}
      <button className='AddBtn Btn' onClick={handleAddInput}> <FaPlus className='plusAdd'/> Add Group</button>
      <button className='FetchBtn Btn' onClick={fetchTodos}>Show Status</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.id} - {todo.completed ? 'true' : 'False'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GroupInput;
