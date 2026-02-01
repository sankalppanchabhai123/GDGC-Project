import React, { useState, useContext } from "react";
import { ThemeContext } from "../../App";
import classes from "./MomentsGallery.module.css";

import techsprintImg from "../../assets/techsprint.png";
import infosessionImg from "../../assets/infosession.jpg";

const momentsData = [
  {
    id: 1,
    title: "TechSprint Hackathon 2026",
    date: "January 2026",
    image: techsprintImg,
    description:
      "100+ participants showcasing innovative solutions integrating google technologies",
    color: "#EA4335",
  },
  {
    id: 2,
    title: "InfoSession & Community Launch",
    date: "October 2025",
    image: infosessionImg,
    description:
      "Official community launch with 40+ enthusiastic members joining our journey",
    color: "#4285F4",
  },
];

const MomentsGallery = () => {
  const theme = useContext(ThemeContext);
  const [activeEvent, setActiveEvent] = useState(momentsData[0]);

  return (
    <div
      className={`${classes.momentsSection} ${
        theme.theme === "dark" ? classes.dark : ""
      }`}
    >
      <h2 className={classes.heading}>Memorable Moments</h2>

      {/* 🔘 EVENT BUTTONS */}
      <div className={classes.eventButtons}>
        {momentsData.map((event) => (
          <button
            key={event.id}
            className={`${classes.eventBtn} ${
              activeEvent.id === event.id ? classes.active : ""
            }`}
            style={{
              borderColor: event.color,
              background:
                activeEvent.id === event.id ? event.color : "transparent",
              color:
                activeEvent.id === event.id ? "#fff" : event.color,
            }}
            onClick={() => setActiveEvent(event)}
          >
            {event.title}
          </button>
        ))}
      </div>

      {/* 🟦 BIG RECTANGLE IMAGE */}
      <div className={classes.imageContainer}>
        <img src={activeEvent.image} alt={activeEvent.title} />
      </div>

      {/* 📄 EVENT INFO */}
      <div className={classes.eventInfo}>
        <h3>{activeEvent.title}</h3>
        <span className={classes.date}>{activeEvent.date}</span>
        <p>{activeEvent.description}</p>
      </div>
    </div>
  );
};

export default MomentsGallery;
