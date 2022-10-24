import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./signupStyles.module.css";
// import MediaQuery for mobile-responsive;
import { useMediaQuery } from 'react-responsive';

const Signup = () => {
  const isDesktopOrLaptop = useMediaQuery({ minWidth: 1224 })
  const isBigScreen = useMediaQuery({ minWidth: 1824 })

  

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {

  };

  const SignInBox = () => (
    <>
      <div className={styles.left}>
        <h1>Welcome Back</h1>
        <Link to="/login">
          <button type="button" className={styles.white_btn}>
            Sign in
          </button>
        </Link>
      </div>
    </>
  )

  const SignUpBox = () => (
    <>
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
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.red_btn}>
              Sign Up
            </button>
          </form>
        </div>
    </>
  )

  const DesktopView = () => (
    <>
      <div className={styles.signup_form_container_desktop}>
        <SignInBox/>
        <SignUpBox/>
      </div>
    </>
  )

  const MobileView = () => (
    <>
      <div className={styles.signup_form_container_mobile}>
        <SignInBox/>
        <SignUpBox/>
      </div>
    </>
  )

  return (
    <div className={styles.signup_container}>
      {(isDesktopOrLaptop||isBigScreen)?<DesktopView/>:<MobileView/>}
    </div>
  );
};

export default Signup;