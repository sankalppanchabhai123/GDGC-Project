import React, { useContext, useEffect } from "react";
import styles from "./Events.module.css";
import { upcomingEvents, previousEvents } from "./EventsInfo.jsx";
import { ThemeContext } from "../../App";

const Events = () => {
  const { theme } = useContext(ThemeContext);
  const googleColors = ["#4285F4", "#EA4335", "#FBBC04", "#34A853"];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.wrapper} data-theme={theme}>
      <div className={styles.container}>
        {/* UPCOMING SECTION */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Upcoming Events</h2>
          <div className={styles.grid}>
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  isUpcoming={true}
                  accentColor="#4285F4"
                />
              ))
            ) : (
              <div className={styles.noEvents}>
                No upcoming events. Stay tuned!
              </div>
            )}
          </div>
        </section>

        <div className={styles.divider}></div>

        {/* PAST SECTION */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Past Events</h2>
          <div className={styles.grid}>
            {previousEvents.map((event, index) => (
              <EventCard
                key={event.id}
                event={event}
                isUpcoming={false}
                accentColor={googleColors[index % googleColors.length]}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

const EventCard = ({ event, isUpcoming, accentColor }) => (
  <div className={styles.card} style={{ "--hover-color": accentColor }}>
    <div className={styles.logoWrapper}>
      <div className={styles.logoCircle}>
        <div className={styles.imageFrame}>
          {/* Dynamic Image from eventInfo */}
          <img
            src={event.image || "https://via.placeholder.com/150"}
            alt={event.title}
            className={styles.eventImage}
          />
        </div>
      </div>
    </div>

    <div className={styles.cardBody}>
      <p className={styles.date}>{event.date}</p>
      <h3 className={styles.type}>{event.type}</h3>
      <h4 className={styles.title}>{event.title}</h4>
      <p className={styles.location}>{event.location}</p>
      {isUpcoming && (
        <a
          href={event.link}
          className={styles.registerBtn}
          target="_blank"
          rel="noreferrer"
        >
          Register Now
        </a>
      )}
    </div>
  </div>
);

export default Events;
