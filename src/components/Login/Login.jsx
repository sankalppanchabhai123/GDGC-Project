import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import bg from "../../assets/grp277.png";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContexts";

const Login = () => {
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  const { userLoggedIn, loading } = useAuth();

  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState(false);

  /* =========================
     AOS INIT
  ========================== */
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  /* =========================
     AUTO REDIRECT IF LOGGED IN
  ========================== */
  useEffect(() => {
    if (!loading && userLoggedIn) {
      navigate("/admin", { replace: true });
    }
  }, [userLoggedIn, loading, navigate]);

  /* =========================
     FIREBASE LOGIN
  ========================== */
  const openMsg = async (e) => {
    e.preventDefault();

    if (!userdata.email || !userdata.password) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const userCredential = await doSignInWithEmailAndPassword(
        userdata.email,
        userdata.password
      );

      const uid = userCredential.user.uid; // ✅ UID here
      console.log("UID:", uid);

      navigate("/admin", { replace: true });
    } catch (error) {
      console.error("❌ Login Failed:", error.message);
      setLoginError(true);
    }
  };

  const closeMsg = () => {
    setLoginError(false);
  };

  /* =========================
     LOADING STATE
  ========================== */
  if (loading) {
    return null; // or <Loader />
  }

  /* =========================
     UI
  ========================== */
  return (
    <div
      className={`${classes.main} ${
        theme.theme === "light" ? classes.light : classes.dark
      }`}
    >
      <div className={`${classes.main2} ${loginError ? classes.overlay : ""}`}>
        <img src={bg} className={classes.mainbg} alt="background" />

        <div className={classes.left_body}>
          <motion.img
            className={classes.logo}
            src={logo}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
            alt="logo"
          />

          <p className={classes.mp}>
            <span className={classes.welcome}>WELCOME</span> Techie!
          </p>

          <p className={classes.please}>Please enter your details!</p>

          <motion.div
            className={classes.main_conatct}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className={classes.contactform} onSubmit={openMsg}>
              <label className={classes.label}>Email</label>
              <input
                type="email"
                className={classes.input}
                value={userdata.email}
                onChange={(e) =>
                  setUserdata({ ...userdata, email: e.target.value })
                }
                required
              />

              <label className={classes.label}>Password</label>
              <input
                type="password"
                className={classes.input}
                value={userdata.password}
                onChange={(e) =>
                  setUserdata({ ...userdata, password: e.target.value })
                }
                required
              />

              <button className={classes.signin} type="submit">
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {loginError && (
          <motion.div
            className={classes.message}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <span onClick={closeMsg}></span>
            <h1>Sorry 😕</h1>
            <h2>Invalid email or password</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
