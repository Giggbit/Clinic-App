import { useState, useEffect } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

interface GetUserId {
    getId: string;
}

const UserData: React.FC<GetUserId> = ({ getId }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const response = await axios.get<IUser>(`http://localhost:3000/users/${getId}`);
            setUserData(response.data);
        } 
        catch (error) {
            setError('Ошибка при загрузке данных пользователя');
        }
    };

    fetchUserData();
  }, [getId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">User Profile</h2>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
    </div>
  );
};

export default UserData;
