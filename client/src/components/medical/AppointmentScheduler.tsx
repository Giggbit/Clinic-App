import React, { useState, useEffect } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';
import IDoctor from '../../interfaces/IDoctor';
import IAppointment from '../../interfaces/IAppointment';
import { useParams } from 'react-router-dom';

interface DoctorScheduleProps {
  user: IUser | null;
}

const AppointmentScheduler: React.FC<DoctorScheduleProps> = ({ user }) => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const [doctors, setDoctors] = useState<IDoctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchDoctors = async () => {
      const response = await axios.get<IDoctor[]>('http://localhost:3000/doctors');
      const filteredDoctors = response.data.filter(doctor => doctor.fieldId === fieldId);
      setDoctors(filteredDoctors);
    };

    fetchDoctors();
  }, [fieldId]);

  useEffect(() => {
    const generateTimes = () => {
      const times = [];
      for (let hour = 8; hour <= 16; hour++) {
        times.push(`${hour}:00`);
      }
      setAvailableTimes(times);
    };

    generateTimes();
  }, []);

  useEffect(() => {
    const fetchBookedTimes = async () => {
      if (selectedDoctor && selectedDate) {
        const response = await axios.get<IAppointment[]>(`http://localhost:3000/appointments?doctorId=${selectedDoctor}&date=${selectedDate}`);
        const bookedTimes = response.data.map(appointment => appointment.time);
        setAvailableTimes(prevTimes => prevTimes.filter(time => !bookedTimes.includes(time)));
      }
    };

    fetchBookedTimes();
  }, [selectedDoctor, selectedDate]);

  const handleBooking = async () => {
    if (!user) {
      setMessage('Пожалуйста, войдите в систему, чтобы записаться на приём.');
      return;
    }

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      setMessage('Пожалуйста, выберите врача, дату и время.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/appointments', {
        patientId: user.id,
        doctorId: selectedDoctor,
        date: selectedDate,
        time: selectedTime,
      });

      if (response.status !== 201) {
        throw new Error(`Ошибка при создании записи: ${response.statusText}`);
      }

      setMessage('Запись успешно создана!');
      setSelectedDoctor('');
      setSelectedDate('');
      setSelectedTime('');
    } 
    catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(`Ошибка при записи на приём: ${error.response ? error.response.data : error.message}`);
      } 
      else if (error instanceof Error) {
        setMessage(`Ошибка при записи на приём: ${error.message}`);
      } 
      else {
        setMessage('Произошла неизвестная ошибка при записи на приём.');
      }
    }
  };

  return (
    <div>
      <h2 className="text-center">Записаться на приём</h2>
      <div className="row justify-content-center mt-5">
        <div className="col-5">
          {message && <div className="alert alert-info">{message}</div>}
          <div className="mb-3">
            <label className="form-label">Врач</label>
            <select className="form-select" value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
              <option value="">Выберите врача</option>
              {doctors.map(doctor => (
                <option key={doctor.id} value={doctor.id}> 
                  {doctor.name} ({doctor.specialization}) 
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Дата</label>
            <input type="date" className="form-control" value={selectedDate} onChange={e => setSelectedDate(e.target.value)}/>
          </div>
          <div className="mb-3">
            <label className="form-label">Время</label>
            <select className="form-select" value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
              <option value="">Выберите время</option>
              {availableTimes.map(time => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-primary" onClick={handleBooking}>Записаться на приём</button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentScheduler;
