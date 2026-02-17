import React, { useState, useContext } from "react";
import info from "./EventsInfo.jsx";
import styles from "./Events.module.css";
import {ThemeContext} from "../../App.jsx" // adjust path if needed

export default function Events() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const { theme } = useContext(ThemeContext);

  const events = activeTab === "upcoming" ? info.upcoming : info.previous;

  return (
    <div
      className={`${styles.container} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      
      {/* Tabs */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tabButton} ${
            activeTab === "upcoming" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming Events
        </button>
        <button
          className={`${styles.tabButton} ${
            activeTab === "previous" ? styles.active : ""
          }`}
          onClick={() => setActiveTab("previous")}
        >
          Previous Events
        </button>
      </div>

      {/* Events Grid */}
      <div className={styles.eventsGrid}>
        {events.map((event) => (
          <div key={event.id} className={styles.card}>
            <img src={event.image} alt={event.title} className={styles.image} />

            <div className={styles.cardContent}>
              <h3>{event.title}</h3>
              <p className={styles.description}>{event.description}</p>

              <div className={styles.meta}>
                <span>{event.date}</span>
                <span>{event.time}</span>
              </div>

              <div className={styles.location}>📍 {event.location}</div>

              {/* Register Button Only for Upcoming */}
              {activeTab === "upcoming" && (
                <button className={styles.registerBtn}>Register Now</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
