import { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import DoctorList from './components/admin/DoctorList';
import Home from './components/Home';
import Navbar from './components/Navbar';
import IUser from './interfaces/IUser';
import LoginForm from './components/forms/LoginForm';
import AdminMenu from './components/admin/AdminMenu';
import AddDoctor from './components/admin/AddDoctor';
import EditDoctor from './components/admin/EditDoctor';
import DeleteDoctor from './components/admin/DeleteDoctor';
import RegisterForm from './components/forms/RegisterForm';
import UserProfile from './components/user/UserProfile';
import UserData from './components/user/UserData';
import UsersList from './components/admin/UsersList';
import EditUserData from './components/user/EditUserData';
import AppointmentScheduler from './components/medical/AppointmentScheduler';
import MedicalFieldsList from './components/medical/MedicalFieldsList';
import UserAppointments from './components/user/UserAppointments';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAdmin(parsedUser.username === 'admin');
      navigate("/");
    }
  }, []);

  const handleLogin = (user: IUser) => {
    setUser(user);
    setIsAdmin(user.username === 'admin');
    localStorage.setItem('user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('user');
    navigate("/");
  };

  return (
    <>
      <Navbar user={user} isAdmin={isAdmin} onLogout={handleLogout} />
      <div className='container-md'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-profile" element={<UserProfile />} />
          <Route path="/user/data" element={<UserData userId={user?.id ?? ""} />} />
          <Route path="/user/edit-data" element={<EditUserData userId={user?.id}/>} />
          <Route path="/appointment-scheduler/:fieldId" element={<AppointmentScheduler user={user} />} />
          <Route path="/user-profile/appointments" element={<UserAppointments user={user}/>} />
          <Route path="/medical-fields" element={<MedicalFieldsList />} />
          {user && user.username === "admin" && (
            <>
              <Route path="/admin" element={<AdminMenu />} />
              <Route path="/admin/users" element={<UsersList />} />
              <Route path="/admin/doctors" element={<DoctorList />} />
              <Route path="/admin/add-doctor" element={<AddDoctor />} />
              <Route path="/admin/edit-doctor" element={<EditDoctor />} />
              <Route path="/admin/delete-doctor" element={<DeleteDoctor />} />
            </>
          )}
        </Routes>
      </div>
    </>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
