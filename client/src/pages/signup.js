import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signupStyles.module.css";
import { Circles } from "react-loader-spinner";
import PasswordStrengthIndicator from "../components/passwordStrength";
const Signup = () => {
  const isNumberRegx = /\d/;
  // eslint-disable-next-line
  const specialCharacterRegx = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [passwordValidity, setPasswordValidity] = useState({
    minChar: null,
    number: null,
    specialChar: null,
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const onChangePassword = (password) => {
    setData({ ...data, password });

    setPasswordValidity({
      minChar: password.length >= 8 ? true : false,
      number: isNumberRegx.test(password) ? true : false,
      specialChar: specialCharacterRegx.test(password) ? true : false,
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      if(!passwordValidity.minChar || !passwordValidity.number || !passwordValidity.specialChar) {
        setLoading(false);
        setError("Password requirements not met");
        return;
      }
      const response = await fetch("https://umasseatthis.herokuapp.com/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      localStorage.setItem("userId", responseData.result.insertedId);
      localStorage.setItem("token", responseData.token);
      setLoading(false);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    }

  };

  return (
    <div className={styles.signup_container}>
      {loading && (
        <div className={styles.overlay}>
          <Circles
            type="Circles"
            color="#881c1c"
            height={40}
            width={40}
          />
        </div>
      )}
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/loginPage">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>

        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChangePassword(e.target.value)}
              value={data.password}
              required
              className={styles.input}
            />
           
            <PasswordStrengthIndicator validity={passwordValidity} />
            
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.red_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;