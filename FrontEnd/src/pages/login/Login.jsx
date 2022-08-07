import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();
  const [errory, setErrory] = useState();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:5000/auth/login",
        credentials
      );
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setErrory(error);
    }
  };

  const handleButtonClick = () => {
    setErrory(null);
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
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {errory ? (
          ""
        ) : (
          <button className="lButton" onClick={home}>
            Go To Home
          </button>
        )}
        <span style={{marginLeft: 30, marginTop: 5}}>{errory && errory}</span>
        {errory && (
          <button className="lButton" onClick={handleButtonClick}>
            ok
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
