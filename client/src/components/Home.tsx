import MedicalFieldsList from "./medical/MedicalFieldsList";

export default function Home() {
    return (
        <>
            <div className="row justify-content-center mt-5">
                <div className="col-11">
                    <MedicalFieldsList/>
                </div>
            </div>
        </>
    );
}