import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DeleteDoctor: React.FC = () => {
  const [id, setId] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.delete(`http://localhost:3000/doctors/${id}`);
      alert('Данные врача успешно удалены');
      navigate('/admin/doctors');
    } catch (error) {
      console.error('Ошибка при удалении врача:', error);
    }
  };

  return (
    <div>
      <h2 className="text-center">Удалить врача</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">ID Врача</label>
          <input
            type="text"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-danger">Удалить</button>
      </form>
    </div>
  );
};

export default DeleteDoctor;
