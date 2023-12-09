import React, { useState, useEffect } from 'react';
import './App.css';

const BirthdayReminderApp = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Load birthdays from local storage on component mount
    const storedBirthdays = JSON.parse(localStorage.getItem('birthdays')) || [];
    setBirthdays(storedBirthdays);
  }, []);

  useEffect(() => {
    // Save birthdays to local storage whenever the 'birthdays' state changes
    localStorage.setItem('birthdays', JSON.stringify(birthdays));
  }, [birthdays]);

  const addBirthday = (e) => {
    e.preventDefault();

    if (name && date) {
      if (editMode) {
        // Edit existing birthday
        const updatedBirthdays = [...birthdays];
        updatedBirthdays[editIndex] = { name, date };
        setBirthdays(updatedBirthdays);
        setEditMode(false);
        setEditIndex(null);
      } else {
        // Add new birthday
        setBirthdays([...birthdays, { name, date }]);
      }

      // Clear form fields
      setName('');
      setDate('');
    }
  };

  const removeBirthday = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this birthday?');
    if (confirmDelete) {
      const updatedBirthdays = [...birthdays];
      updatedBirthdays.splice(index, 1);
      setBirthdays(updatedBirthdays);
    }
  };

  const editBirthday = (index) => {
    // Set form fields with the selected birthday's information
    setName(birthdays[index].name);
    setDate(birthdays[index].date);
    setEditMode(true);
    setEditIndex(index);
  };

  return (
    <div className="App">
      <h1>Birthday Reminder App</h1>
      <form onSubmit={addBirthday}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <button type="submit">{editMode ? 'Edit Birthday' : 'Add Birthday'}</button>
      </form>
      <div className="birthday-list">
        {birthdays.map((birthday, index) => (
          <div key={index} className={`birthday-item ${editIndex === index ? 'editing' : ''}`}>
            <p>{birthday.name}'s birthday on {birthday.date}</p>
            <button onClick={() => editBirthday(index)}>Edit</button>
            <button onClick={() => removeBirthday(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayReminderApp;
