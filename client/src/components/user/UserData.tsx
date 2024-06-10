import { useState, useEffect } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

interface UserDataProps {
  userId: string;
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [passwordSuccess, setPasswordSuccess] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<IUser>(`http://localhost:3000/users/${userId}`);
        setUserData(response.data);
      } 
      catch (error) {
        setError('Ошибка при загрузке данных пользователя');
      }
    };

    fetchUserData();
  }, [userId]);

  const handlePasswordChange = async () => {
    if (!newPassword) {
      setPasswordError('Пароль не может быть пустым');
      return;
    }

    try {
      await axios.put(`http://localhost:3000/users/${userId}`, {
        ...userData,
        password: newPassword,
      });
      setPasswordSuccess('Пароль успешно изменен');
      setNewPassword('');
      setIsEditingPassword(false);
    } 
    catch (error) {
      setPasswordError('Ошибка при изменении пароля');
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">User Profile</h2>

      <div className="row justify-content-center">
        <div className="col-5 mt-5">
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">First Name</th>
                <td>{userData.firstName}</td>
              </tr>
              <tr>
                <th scope="row">Last Name</th>
                <td>{userData.lastName}</td>
              </tr>
              <tr>
                <th scope="row">Username</th>
                <td>{userData.username}</td>
              </tr>
              <tr>
                <th scope="row">Email</th>
                <td>{userData.email}</td>
              </tr>
              <tr>
                <th scope="row">Birthday</th>
                <td>{userData.birthYear}</td>
              </tr>
              <tr>
                <th scope="row">Password</th>
                <td>
                  {showPassword ? userData.password : '********'}
                  <button className="btn btn-secondary ms-2" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                  </button>
                  <button className="btn btn-primary ms-2" onClick={() => setIsEditingPassword(!isEditingPassword)}>
                    Изменить пароль
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isEditingPassword && (
        <div>
          <h3>Изменить пароль</h3>
          {passwordError && <div className="alert alert-danger">{passwordError}</div>}
          {passwordSuccess && <div className="alert alert-success">{passwordSuccess}</div>}
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">Новый пароль</label>
            <input type="password" className="form-control" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
          </div>
          <button className="btn btn-primary" onClick={handlePasswordChange}>Сохранить новый пароль</button>
        </div>
      )}
    </div>
  );
};

export default UserData;
