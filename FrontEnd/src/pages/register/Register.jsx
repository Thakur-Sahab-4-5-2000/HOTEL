import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });

  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/auth/register", credentials);
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleButtonClick = () => {
    setError(null);
  };

  const home = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button onClick={handleClick} className="lButton">
          Sign Up
        </button>
        {error ? (
          ""
        ) : (
          <button className="lButton" onClick={home}>
            Go To Home
          </button>
        )}
        {error && error}
        {error && (
          <button className="lButton" onClick={handleButtonClick}>
            ok
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
