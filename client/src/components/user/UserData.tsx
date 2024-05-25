import { useState, useEffect } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

interface GetUserId {
    userId: string | undefined;
}

const UserData: React.FC<GetUserId> = ({ userId }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const passwordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
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
            <th>Password</th>
              <td>
                {showPassword ? userData.password : '********'}
                <button className="btn btn-sm btn-secondary ms-3" onClick={passwordVisibility}>
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default UserData;
