import React, { useState, useEffect, useContext } from "react";
import classes from "./Login.module.css";
import bg from "../../assets/grp277.png";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import { getUserData } from "../../getData/getUserData";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const theme = useContext(ThemeContext);

  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });

  const [dataArray, setDataArray] = useState([]);
  const [logged, setLogged] = useState(false);

  /* =========================
     FETCH USERS DATA
  ========================== */
  useEffect(() => {
    AOS.init({ duration: 1000 });

    async function fetchUsers() {
      const data = await getUserData();
      setDataArray(data);
      console.log("Fetched Users:", data);
    }

    fetchUsers();
  }, []); 

  /* =========================
     LOGIN CHECK
  ========================== */
  const openMsg = (e) => {
    e.preventDefault();

    if (!userdata.email || !userdata.password) {
      alert("Please fill all the fields");
      return;
    }

    const userFound = dataArray.find(
      (user) =>
        user.username === userdata.email &&
        user.password === userdata.password
    );

    if (userFound) {
      console.log("✅ Login Successful", userFound);
      alert("Login Successful ✅");

      localStorage.setItem("loggedInUser", JSON.stringify(userFound));
      setLogged(false);

      // Redirect if needed
      // navigate("/dashboard");
    } else {
      console.log("❌ Login Failed");
      setLogged(true);
    }
  };

  const closeMsg = () => {
    setLogged(false);
  };

  /* =========================
     UI
  ========================== */
  return (
    <div
      className={`${classes.main} ${
        theme.theme === "light" ? classes.light : classes.dark
      }`}
    >
      <div className={`${classes.main2} ${logged ? classes.overlay : ""}`}>
        <img src={bg} className={classes.mainbg} alt="" />

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
            <span className={classes.welcome}>WELCOME</span> Techie
            <span className={classes.expp}>!</span>
          </p>

          <p className={classes.please}>Please enter your details!</p>

          <motion.div
            className={classes.main_conatct}
            initial={{ rotateY: 180 }}
            animate={{ rotateY: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form className={classes.contactform}>
              <label className={classes.label}>Email</label>
              <input
                type="email"
                className={classes.input}
                value={userdata.email}
                onChange={(e) =>
                  setUserdata({ ...userdata, email: e.target.value })
                }
                placeholder="Enter your Email"
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
                placeholder="**************"
                required
              />

              <button
                className={classes.signin}
                onClick={openMsg}
                type="submit"
              >
                Sign In
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* =========================
          ERROR POPUP
      ========================== */}
      <AnimatePresence>
        {logged && (
          <motion.div
            className={classes.message}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <span onClick={closeMsg}></span>
            <h1>Sorry 😕</h1>
            <h2>Seems like you are not a GDSC Team Member</h2>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;
