import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import SideBarTwo from '../../components/SideBarTwo';

const Settings = () => {
  const [email, setEmail] = useState('');
  const [password, setNewPassword] = useState('');
  const [message, setMessage] = useState(' '); // For email validation errors
  const [error, setError] = useState(''); // For password validation errors

  // Email validation
  function handleEmail(e) {
    let inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    if (!emailRegex.test(inputValue)) {
      setMessage('Invalid email.');
    } else {
      setMessage('');
    }
  }

  // Password validation
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*?[#?!@$%^&*-])(?=.*\d)(?=.*\S)\S{8,16}$/;

  function handlePassword(e) {
    let inputValue = e.target.value;

    const isValidPassword = passwordRegex.test(inputValue);

    if (!isValidPassword) {
      setError(
        'Password must contain at least one uppercase letter, one lowercase letter, one digit, no whitespace, and must be between 8 - 16 characters.'
      );
    } else {
      setError('');
      setNewPassword(inputValue);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  const isComplete = email && password && !message && !error;

  return (
    <>
      <div><SideBarTwo sidebarOpen={false} setSidebarOpen={function (arg: boolean): void {
        throw new Error('Function not implemented.');
      }} /></div>
    </>
  );
};

export default Settings;
