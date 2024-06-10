import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MedicalFieldCard from './MedicalFieldCard';
import IMedicalField from '../../interfaces/IMedicalField';

const MedicalFieldsList: React.FC = () => {
  const [fields, setFields] = useState<IMedicalField[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
      const response = await axios.get<IMedicalField[]>('http://localhost:3000/medicalFields');
      setFields(response.data);
    };

    fetchFields();
  }, []);

  return (
    <div className="container">
      <div className="row">
        {fields.map((field) => (
          <div className="col-md-4" key={field.id}>
            <MedicalFieldCard field={field} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalFieldsList;
