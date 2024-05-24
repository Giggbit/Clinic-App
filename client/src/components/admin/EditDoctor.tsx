import React, { useState } from 'react';
import axios from 'axios';

const EditDoctor: React.FC = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [doctorFound, setDoctorFound] = useState(false);
  const [error, setError] = useState('');

  const handleFindDoctor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.get(`http://localhost:3000/doctors/${id}`);
      const doctor = response.data;
      setName(doctor.name);
      setSpecialization(doctor.specialization);
      setDoctorFound(true);
      setError('');
    } 
    catch (error) {
      setError('Доктор с таким ID не найден');
      setDoctorFound(false);
    }
  };

  const handleUpdateDoctor = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/doctors/${id}`, {
        name,
        specialization
      });
      setError('');
      alert('Данные врача успешно обновлены');
      setId('');
      setName('');
      setSpecialization('');
      setDoctorFound(false);
    } catch (error) {
      setError('Ошибка при обновлении данных врача');
    }
  };

  return (
    <div>
      <h2 className="text-center">Редактировать данные врача</h2>
      <form className="mt-4" onSubmit={handleFindDoctor}>
        <div className="mb-3">
          <label className="form-label">ID врача</label>
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Найти</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {doctorFound && (
        <form className='mt-5' onSubmit={handleUpdateDoctor}>
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
          <button type="submit" className="btn btn-success">Обновить</button>
        </form>
      )}
    </div>
  );
};

export default EditDoctor;
