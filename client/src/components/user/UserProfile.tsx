import { Link } from "react-router-dom";

const UserProfile = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-8">
                <h2 className="text-center">User Profile</h2>

                <div className="list-group mt-5">
                    <Link className="list-group-item list-group-item-action" to="/user/data">Профиль</Link>
                    <Link to="/user-profile/appointments" className="list-group-item list-group-item-action">Просмотр записей</Link>
                    <Link className="list-group-item list-group-item-action" to="/user/edit-data">Редактировать данные</Link>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
