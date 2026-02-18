import React, { useContext, useEffect } from "react";
import classes from "./TeamCard.module.css";
import LinkedIn from "../SVGs/LinkedIn";
import Insta from "../SVGs/Insta";
import GithubIcon from "../SVGs/Github";
import ImgBg from "../SVGs/ImgBg";
import { ThemeContext } from "../../../App";
import AOS from "aos";
import "aos/dist/aos.css";

const TeamCard = ({ current }) => {
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  const heights = "20px";
  const theme = useContext(ThemeContext);
  console.log( current.imgurl);
  console.log( current.instagram);

  
  const handleClick = (link) => {
    if (link === "insta") {
      window.open(current.instagram, "_blank");
    }
    if (link === "linkedin") {
      window.open(current.linkedin, "_blank");
    }
    if (link === "github") {
      window.open(current.github, "_blank");
    }
  };
  return (
    <div
      className={` ${classes.main} ${
        theme.theme === "dark" ? classes.dark : ""
      }`}
      data-aos="zoom-in"
    >
      <div className={classes.imgDiv}>
        <ImgBg imgColor={`${theme.theme === "dark" ? "#ccc" : "#222"}`} />
        <div className={classes.imgContainer}>
          <img src={current.imgurl} alt="Profile" />
        </div>
      </div>
      <div className={classes.info}>
        <h3>{current.name}</h3>
        <p>{current.position}</p>
        <div className={classes.icons}>
          <div className={classes.iconContainer}>
            <Insta
              height={heights}
              width={heights}
              redirect={() => handleClick("insta")}
            />
          </div>
          <div className={classes.iconContainer}>
            <GithubIcon
              height={heights}
              width={heights}
              color={`${theme.theme === "dark" ? "#fff" : "#222"}`}
              redirect={() => handleClick("github")}
            />
          </div>
          <div className={classes.iconContainer}>
            <LinkedIn
              height={heights}
              width={heights}
              redirect={() => handleClick("linkedin")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
