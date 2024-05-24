import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const RegisterForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const userExists = await checkUserExists(username);
      if (userExists) {
        setError('Пользователь с таким логином уже существует');
        return;
      }
      if (username === 'admin') {
        setError('Логин "admin" недоступен для использования');
        return;
      }

      const newUser = {
        id: uuidv4(),
        firstName,
        lastName,
        username,
        email,
        password,
        gender,
        birthYear
      };
      const response = await axios.post('http://localhost:3000/users', newUser);
      if (response.status === 201) {
        navigate('/login');
      }
    } 
    catch (error) {
      setError('Ошибка при регистрации пользователя');
    }
  };

  const checkUserExists = async (username: string) => {
    const response = await axios.get('http://localhost:3000/users', {
      params: { username }
    });
    return response.data.length > 0;
  };

  return (
    <div>
      <h2 className="text-center">Регистрация</h2>

      <form className="form mt-4" onSubmit={handleRegister}>
        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Имя</label>
              <input type="text" className="form-control" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Фамилия</label>
              <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Email</label>
              <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required/>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Login</label>
              <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required/>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Пароль</label>
              <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Пол</label>
              <select className="form-select" value={gender} onChange={(e) => setGender(e.target.value)} required>
                <option value="">Выберите пол</option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
                <option value="other">Другое</option>
                <option value="traktor">Трактор</option>
              </select>
            </div>
        </div>

        <div className="col-4">
            <div className="input-group mb-3">
              <label className="input-group-text">Год рождения</label>
              <input type="date" className="form-control" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} required/>
            </div>
        </div>

        <button type="submit" className="btn btn-primary">Зарегистрироваться</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;
