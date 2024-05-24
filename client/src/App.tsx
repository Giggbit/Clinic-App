import { useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (user: IUser) => {
    setUser(user);
    setIsAdmin(user.username === 'admin');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <>
      <BrowserRouter>
        <Navbar user={user} isAdmin={isAdmin} onLogout={handleLogout} />
        <div className='container-md'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />
            <Route path='/register' element={<RegisterForm />} />
            <Route path='/user-profile' element={<UserProfile />} />
            <Route path='/user-data' element={<UserData getId={user.id} />} />
            {user && user.username === 'admin' && (
              <>
                <Route path="/admin" element={<AdminMenu />} />
                <Route path="/admin/doctors" element={<DoctorList />} />
                <Route path="/admin/add-doctor" element={<AddDoctor />} />
                <Route path="/admin/edit-doctor" element={<EditDoctor />} />
                <Route path="/admin/delete-doctor" element={<DeleteDoctor />} />
              </>
            )}
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
