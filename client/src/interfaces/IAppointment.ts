export default interface IAppointment {
    id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  doctor: {
    name: string;
    specialization: string;
  };
}