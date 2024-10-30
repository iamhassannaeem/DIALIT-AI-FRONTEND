import React, { useState } from 'react';

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
    <div className=" flex max-w-lg  flex-col justify-center gap-6 rounded-xl bg-[#EEEEEE]  dark:bg-[#1D2532] p-[24px]">
      <div className=" flex flex-col justify-center gap-6 rounded-xl bg-[#EEEEEE]  dark:bg-[#1D2532] p-[24px]">
        <div>
          <h5 className="min-h-6 max-w-md gap-2.5 text-left font-poppins text-base font-semibold leading-6 tracking-tight text-[#1D2532]  dark:text-white">
            Settings
          </h5>
          <h6 className="h-5 max-w-md gap-6 text-left font-poppins text-sm font-normal leading-5 tracking-tight dark:text-[#D6D6D5] text-[#7E7E7E]">
            Customize your account details.
          </h6>
        </div>

        <div>
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-normal leading-5 dark:text-[#D6D6D5] text-[#7E7E7E]"
              >
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter email address"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={handleEmail}
                  className="border-1 focus-ring-1 ring-offset-slate-50 placeholder:text-gray-400 block w-full gap-10 rounded-md border-[#333B48] dark:bg-[#242E3E] bg-[#faf7f7] p-3 dark:text-[#D6D6D5] text-[#7E7E7E] shadow-sm  sm:text-sm"
                />
              </div>
              <div className="mt-1 text-sm text-red">{message}</div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 dark:text-[#D6D6D5] text-[#7E7E7E]"
                >
                  Password
                </label>
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                  onChange={handlePassword}
                  className="border-1 focus-ring-1 ring-offset-slate-50 placeholder:text-gray-400 block w-full gap-10 rounded-md border-[#333B48] dark:bg-[#242E3E] bg-[#faf7f7] p-3 dark:text-[#D6D6D5] text-[#7E7E7E] shadow-sm   sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-red mt-1 text-sm">{error}</div>
            </div>

            <div>
              <button
                type="submit"
                disabled={!isComplete} // Disable if there is an error or incomplete fields
                onClick={(e) => handleSubmit(e)}
                className={`${
                  !isComplete
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-indigo-500 cursor-pointer'
                } flex w-full justify-center rounded-md bg-[#2691B6] p-3 font-poppins text-sm font-semibold leading-5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`}
              >
                Update New Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
