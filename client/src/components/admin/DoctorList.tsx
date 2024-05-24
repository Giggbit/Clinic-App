import { useEffect, useState } from "react";
import axios from "axios";
import IDoctor from "../../interfaces/IDoctor";

function DoctorList() {
    const [doctors, setDoctors] = useState<IDoctor[]>([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get<IDoctor[]>('http://localhost:3000/doctors');
            setDoctors(response.data);
        } 
        catch (error) {
            console.error('Ошибка при получении данных о врачах:', error);
        }
    };

    return (
        <div>
            <h2 className="text-center">Список врачей</h2>
            <table className="table table-hover mt-4">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">Name</th>
                        <th scope="col">Specialization</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <th scope="row">{doctor.id}</th>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DoctorList;