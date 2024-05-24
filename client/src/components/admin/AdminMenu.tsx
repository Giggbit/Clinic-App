import { Link } from 'react-router-dom';

const AdminMenu: React.FC = () => {
    return (
        <div className="row justify-content-center">
            <div className="col-8">
                <h2 className="text-center">Административное меню</h2>
                <div className="list-group mt-5">
                    <Link className="list-group-item list-group-item-action" to="/admin/doctors">Просмотр списка врачей</Link>
                    <Link className="list-group-item list-group-item-action" to="/admin/add-doctor">Добавить врача</Link>
                    <Link className="list-group-item list-group-item-action" to="/admin/edit-doctor">Редактировать врача</Link>
                    <Link className="list-group-item list-group-item-action" to="/admin/delete-doctor">Удалить врача</Link>
                </div>
            </div>
        </div>
    );
};

export default AdminMenu;
