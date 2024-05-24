import { Link } from "react-router-dom";

interface NavbarProps {
  user: { id: string; username: string } | null;
  isAdmin: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, isAdmin, onLogout }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark-subtle">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Clinic</a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav" 
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {user ? (
                <>
                  <li className="nav-item me-3">
                    <Link className="btn btn-primary" to={`/${isAdmin ? 'admin' : 'user-profile'}`}>{user.username}</Link>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-outline-danger" onClick={onLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <br />
    </>
  );
};

export default Navbar;
