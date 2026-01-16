import React, { useContext } from "react";
import classes from "./Footer.module.css";
import FooterLogo from "../common/SVGs/FooterLogo";
import GithubIcon from "../common/SVGs/Github";
import LinkedIn from "../common/SVGs/LinkedIn";
import Insta from "../common/SVGs/Insta";
import Discord from "../common/SVGs/Discord";
import { Link } from "react-router-dom";
import Youtube from "../common/SVGs/Youtube";
import Twitter from "../common/SVGs/Twitter";
import Medium from "../common/SVGs/Medium";
import Facebook from "../common/SVGs/Facebook";
import { ThemeContext } from '../../App';

const Footer = () => {
  const theme = useContext(ThemeContext);
  const isLight = theme.theme === "light";

  // Define colors for both themes
  const iconColor = isLight ? "#5f6368" : "#bdc1c6";
  const hoverColor = "#1a73e8"; // Google blue for hover
 const logoColors = isLight
  ? { 
      color1: "#1a73e8",   // Google blue (darker, perfect for light bg)
      color2: "#3c4043"    // Google dark gray
    }
  : { 
      color1: "#8ab4f8",   // Light blue for dark bg
      color2: "#bdc1c6"    // Light gray
    };

 
  return (
    <div className={`${classes.main} ${isLight ? classes.light : classes.dark}`}>
      <div className={classes.logo}>
  <FooterLogo color1={logoColors.color1} color2={logoColors.color2} />
</div>


      <div className={classes.links}>
        <div className={classes.contribute}>
          <h2>Contribute</h2>
          <ul>
            <li>
              <Link 
                target="_blank" 
                to="https://github.com/DSC-DYPCOE/GDSC_Web_Frontend/issues/new"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                File a Bug
              </Link>
            </li>
            <li>
              <Link 
                target="_blank" 
                to="https://github.com/DSC-DYPCOE/GDSC_Web_Frontend"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                View Source
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.programs}>
          <h2>Programs</h2>
          <ul>
            <li>
              <Link 
                target="_blank" 
                to="https://developers.google.com/womentechmakers"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Women Techmakers
              </Link>
            </li>
            <li>
              <Link 
                target="_blank" 
                to="https://developers.google.com/community/experts"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Google Developer Experts
              </Link>
            </li>
            <li>
              <Link 
                target="_blank" 
                to="https://developers.google.com/community/gdg"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Google Developer Groups
              </Link>
            </li>
          </ul>
        </div>
        <div className={classes.impLinks}>
          <h2>Important Links</h2>
          <ul>
            <li>
              <Link 
                target="_blank" 
                to="https://console.firebase.google.com/"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Firebase Console
              </Link>
            </li>
            <li>
              <Link 
                target="_blank" 
                to="https://console.cloud.google.com/"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Google Cloud Platform
              </Link>
            </li>
            <li>
              <Link 
                target="_blank" 
                to="https://console.actions.google.com/"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Action on Google
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.connect}>
        <h2>Connect</h2>
        <ul>
          {[
            { Component: GithubIcon, url: "https://github.com/DSC-DYPCOE" },
            { Component: LinkedIn, url: "https://www.linkedin.com/company/dsc-dypcoe/" },
            { Component: Insta, url: "https://www.instagram.com/dsc_dypcoe/" },
            { Component: Discord, url: "https://discord.com/invite/AjHxR5D5rE" },
            { Component: Twitter, url: "https://twitter.com/DSC_DYPCOE" },
            { Component: Youtube, url: "https://www.youtube.com/@gdscdypcoe6579" },
            { Component: Medium, url: "https://medium.com/dsc-dypcoe" },
            { Component: Facebook, url: "https://www.facebook.com/dsc.dypcoe" },
          ].map(({ Component, url }, index) => (
            <li key={index}>
              <Link target="_blank" to={url}>
                <Component 
                  height={28} 
                  width={28} 
                  color={iconColor}
                  hoverColor={hoverColor}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;