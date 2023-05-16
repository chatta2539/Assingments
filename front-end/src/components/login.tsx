import React, { useState } from 'react';
import axios from 'axios';

type LoginData = {
  username: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    username: '',
    password: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    try {
      // Make the API request
      const response = await axios.post('http://127.0.0.1:3000/login', loginData);

      // Handle the response
      console.log('Login successful');
      console.log('Response:', response.data);

      // Reset the form
      setLoginData({ username: '', password: '' });
    } catch (error) {
      console.error('Login failed');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" >Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
