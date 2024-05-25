import { useEffect, useState } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

const UsersList: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<IUser[]>('http://localhost:3000/users');
        setUsers(response.data);
      } 
      catch (error) {
        setError('Ошибка при загрузке данных пользователей');
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <table className="table table-hover mt-5">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Username</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Gender</th>
            <th scope="col">Birth Year</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.birthYear}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
