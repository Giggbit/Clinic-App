import React, { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const AddDoctor: React.FC = () => {
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newDoctor = {
      id: uuidv4(),
      name,
      specialization
    };

    try {
      await axios.post('http://localhost:3000/doctors', newDoctor);
      navigate('/admin/doctors');
    } 
    catch (error) {
      console.error('Ошибка при добавлении врача:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Добавить врача</h2>
      <form className='mt-4' onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Имя</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Специализация</label>
          <input
            type="text"
            className="form-control"
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Добавить</button>
      </form>
    </div>
  );
};

export default AddDoctor;
