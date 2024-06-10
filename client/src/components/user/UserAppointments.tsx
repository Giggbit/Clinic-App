import React, { useEffect, useState } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';
import IAppointment from '../../interfaces/IAppointment';

interface UserAppointmentsProps {
  user: IUser | null;
}

const UserAppointments: React.FC<UserAppointmentsProps> = ({ user }) => {
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user) {
        try {
          const response = await axios.get<IAppointment[]>(`http://localhost:3000/appointments?patientId=${user.id}`);
          const doctorsResponse = await axios.get('http://localhost:3000/doctors');
          const doctors = doctorsResponse.data;

          const appointmentsWithDoctors = response.data.map(appointment => ({
            ...appointment,
            doctor: doctors.find((doctor: { id: string }) => doctor.id === appointment.doctorId)
          }));

          setAppointments(appointmentsWithDoctors);
        } 
        catch (error) {
          setError('Ошибка при загрузке записей');
        }
      }
    };

    fetchAppointments();
  }, [user]);

  const handleCancelAppointment = async (appointmentId: string) => {
    try {
      const response = await axios.delete(`http://localhost:3000/appointments/${appointmentId}`);
      if (response.status === 200) {
        setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment.id !== appointmentId));
        setMessage('Запись успешно отменена.');
      } 
      else {
        setError('Ошибка при отмене записи.');
      }
    } 
    catch (error) {
      setError('Ошибка при отмене записи.');
    }
  };

  return (
    <div>
      <h2 className="text-center">Ваши записи</h2>
      <div className="row justify-content-center mt-5">
        <div className="col-9">
          {error && <div className="alert alert-danger">{error}</div>}
          {message && <div className="alert alert-success">{message}</div>}
          {appointments.length === 0 ? (
            <div>У вас нет записей.</div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Дата</th>
                  <th>Время</th>
                  <th>Доктор</th>
                  <th>Специализация</th>
                  <th>Действие</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.id}>
                    <td>{appointment.date}</td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctor?.name}</td>
                    <td>{appointment.doctor?.specialization}</td>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleCancelAppointment(appointment.id)}>Отменить</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAppointments;
