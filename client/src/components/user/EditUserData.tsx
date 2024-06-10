import { useState, useEffect } from 'react';
import axios from 'axios';
import IUser from '../../interfaces/IUser';

interface EditUserProfileProps {
  userId: string | undefined;
}

const EditUserProfile: React.FC<EditUserProfileProps> = ({ userId }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthYear, setBirthYear] = useState<string | ''>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get<IUser>(`http://localhost:3000/users/${userId}`);
        const user = response.data;
        setUserData(user);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setUsername(user.username);
        setEmail(user.email);
        setGender(user.gender);
        setBirthYear(user.birthYear);
      } 
      catch (error) {
        setError('Ошибка при загрузке данных пользователя');
      }
    };

    fetchUserData();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/${userId}`, {
        ...userData, 
        firstName,
        lastName,
        username,
        email,
        gender,
        birthYear,
      });
      setSuccess('Данные успешно обновлены');
    } 
    catch (error) {
      setError('Ошибка при обновлении данных пользователя');
    }
  };

  return (
    <div>
      <h2 className="text-center">Edit User Profile</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      {userData ? (
        <div className="row justify-content-center mt-5">
            <div className="col-5">
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <label htmlFor="firstName" className="input-group-text">First Name</label>
                    <input type="text" className="form-control" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <label htmlFor="lastName" className="input-group-text">Last Name</label>
                    <input type="text" className="form-control" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <label htmlFor="username" className="input-group-text">Username</label>
                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <label htmlFor="email" className="input-group-text">Email</label>
                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="input-group mb-3">
                    <label htmlFor="gender" className="input-group-text">Gender</label>
                    <select className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Female">Other</option>
                      <option value="Female">Helicopter</option>
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <label htmlFor="birthYear" className="input-group-text">Birth Year</label>
                    <input type="date" className="form-control" id="birthYear" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditUserProfile;
