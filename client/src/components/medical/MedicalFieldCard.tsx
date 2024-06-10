import React from 'react';
import { Link } from 'react-router-dom';
import IMedicalField from '../../interfaces/IMedicalField';

interface MedicalFieldCardProps {
  field: IMedicalField;
}

const MedicalFieldCard: React.FC<MedicalFieldCardProps> = ({ field }) => {
  return (
    <div className="card mb-3" style={{ width: '18rem' }}>
      <img src={field.imageUrl} className="card-img-top" alt={field.name} />
      <div className="card-body">
        <h5 className="card-title">{field.name}</h5>
        <p className="card-text">{field.description}</p>
        <Link to={`/appointment-scheduler/${field.id}`} className="btn btn-primary">Записаться</Link>
      </div>
    </div>
  );
};

export default MedicalFieldCard;
