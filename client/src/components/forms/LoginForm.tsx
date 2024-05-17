import React, { useState } from "react";
import axios from "axios";
import ILogin from "../../interfaces/ILogin";

const LoginForm: React.FC<ILogin> = ({onLoginSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const serverUrl = import.meta.env.VITE_PATH_TO_SERVER;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post(serverUrl + "login", {username, password,});
          onLoginSuccess(response.data.username);
        } 
        catch (error) {
          console.error('Ошибка при входе:', error);
        }
    };
    
    return (
        <>
        <form className="form" onSubmit={handleSubmit}>
            <div className="col-4">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="username">Login:</label>
                    <input className="form-control" type="text" id="username" value={username}
                        onChange={(e) => setUsername(e.target.value)} required/>
                </div>
            </div>

            <div className="col-4">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="password">Password:</label>
                    <input className="form-control" type="password" id="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required/>
                </div>
            </div>
            <button className="btn btn-primary" type="submit">Войти</button>
        </form>
        </>
    );
}


export default LoginForm;