import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./loginStyles.module.css";
// import MediaQuery for mobile-responsive;
import { useMediaQuery } from 'react-responsive';

const Login = () => {

  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isBigScreen = useMediaQuery({ minWidth: 1824 })
  const navigate = useNavigate();

  const SignUpBox = () => (
    <>
        <div className={styles.right}>
          <h1>New Here ?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
        </div>
    </>
  )

  const LoginForm = () => (
    <>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Login to Your Account</h1>
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
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.red_btn}>
              Sign In
            </button>
          </form>
        </div>
    </>
  );

  const DesktopView = () => (
    <>
      <div className={styles.login_form_container_desktop}>
        <LoginForm/>
        <SignUpBox/>
      </div>
    </>
  )
  
  const MobileView = () => (
    <>
      <div className={styles.login_form_container_mobile}>
        <LoginForm/>
        <SignUpBox/>
      </div>
    </>
  );


  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className={styles.login_container}>
      {(isDesktopOrLaptop||isBigScreen)?<DesktopView/>:<MobileView/>}
    </div>
  );
};

export default Login;