import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginFormProps {
    onLogin: (user: { 
        id: string, 
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        gender: string,
        birthYear: string,
    }) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get('http://localhost:3000/users', {
        params: { username, password }
      });
      const user = response.data.find((user: { username: string, password: string }) => user.username === username && user.password === password);
      if (user) {
        onLogin(user);
        navigate('/');
      } else {
        setError('Неправильный логин или пароль');
      }
    } catch (error) {
      setError('Ошибка сервера');
    }
  };

  return (
    <>
    <a href="/register">Still don't have an account? Register here!</a>
    
    <form className="form mt-3" onSubmit={handleLogin}>
        <div className="col-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="username">Login:</label>
            <input className="form-control" type="text" id="username" value={username}
              onChange={(e) => setUsername(e.target.value)} />
          </div>
        </div>

        <div className="col-4">
          <div className="input-group mb-3">
            <label className="input-group-text" htmlFor="password">Password:</label>
            <input className="form-control" type="password" id="password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button className="btn btn-primary" type="submit">Войти</button>
      </form>
    </>
  );
};

export default LoginForm;
