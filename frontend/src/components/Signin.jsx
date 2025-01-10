import { Button, Form, Input } from '@nextui-org/react';
import React, { useState } from 'react';
import { EyeFilledIcon, EyeSlashFilledIcon } from './eyes';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://hospitalmanagement-production-ad8a.up.railway.app/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid credentials');
      }

      const data = await response.json();
      // Save the JWT token, e.g., in local storage
      localStorage.setItem('token', data.token);
      // Navigate to the dashboard or another protected route
      // navigate('/dashboard');
      if (decodedToken.role === 'manager') {
        navigate('/manager-dashboard'); // Navigate to ManagerDashboard
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="flex w-full flex-col flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4 items-center">
      <Form className="w-full max-w-xs flex flex-col items-center" onSubmit={onSubmit}>
        <Input
          className="max-w-xs"
          label="Email"
          placeholder="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="bordered"
        />
        <Input
          className="max-w-xs"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              ) : (
                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
              )}
            </button>
          }
          label="Password"
          placeholder="Enter your password"
          type={isVisible ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          variant="bordered"
        />
        <Button type="submit" variant="bordered">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Signin;
