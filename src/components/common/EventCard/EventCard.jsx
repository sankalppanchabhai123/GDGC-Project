import React, { useContext, useEffect, useState, useRef } from "react";
import classes from "./EventCard.module.css";
import Button from '../../common/Button/Button'
import { ThemeContext } from '../../../App'
import Aos from 'aos';
import 'aos/dist/aos.css';

const EventCard = ({ current, isActive }) => {
  const theme = useContext(ThemeContext);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  
  useEffect(() => {
    Aos.init();
    if (isActive) {
      setIsVisible(true);
    }
  }, [isActive]);

  const redirect = (link) => {
    if (link) window.open(link, "_blank");
  };

  // Debug: Check if color is being passed
  console.log('EventCard color:', current.color);

  return (
    <div 
      ref={cardRef}
      className={`${classes.card} ${theme.theme === "dark" ? classes.dark : ""} ${classes.upcoming} ${isActive ? classes.active : ''}`}
      // FIXED: Make sure CSS variable is set properly
      style={{ 
        "--event-color": current.color || '#9C27B0',
        // For testing - add a border to see the color
        border: `2px solid ${current.color || '#9C27B0'}20`
      }}
      data-aos={isActive ? "fade" : "fade-out"}
      data-aos-duration="1000"
    >
      {/* Test element to see if CSS variable is working */}
      <div style={{ 
        display: 'none',
        color: 'var(--event-color)',
        backgroundColor: 'color-mix(in srgb, var(--event-color) 20%, transparent)'
      }}>
        Test: {current.color}
      </div>
      
      <div className={classes.cardSplitContainer}>
        {/* Image Section - Animated from left */}
        <div 
          className={`${classes.imageSection} ${isVisible ? classes.slideInLeft : ''}`}
          data-aos={isActive ? "fade-right" : ""}
          data-aos-duration="1000"
          data-aos-delay="200"
        >
          <div className={classes.imageWrapper}>
            {current.image ? (
              <img 
                src={current.image} 
                alt={current.name} 
                className={classes.eventImage}
                loading="lazy"
              />
            ) : (
              <div className={classes.imagePlaceholder}>
                <div className={classes.placeholderIcon}>📅</div>
                <span>{current.name}</span>
              </div>
            )}
            
            {/* Overlay Badges */}
            <div className={classes.imageOverlay}>
              {/* Remove inline style, let CSS handle it */}
              <div className={classes.statusBadge}>
                {current.tag}
              </div>
              <div className={classes.monthBadge}>
                {current.month}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Animated from right */}
        <div 
          className={`${classes.contentSection} ${isVisible ? classes.slideInRight : ''}`}
          data-aos={isActive ? "fade-left" : ""}
          data-aos-duration="1000"
          data-aos-delay="400"
        >
          <div className={classes.contentWrapper}>
            {/* Header */}
            <div className={classes.cardHeader}>
              <h2 className={classes.eventTitle}>{current.name}</h2>
              <div className={classes.dateDisplay}>
                <span className={classes.dateIcon}>📅</span>
                <span className={classes.dateText}>{current.date}</span>
              </div>
            </div>

            {/* Description */}
            <div className={classes.descriptionContainer}>
              <p className={classes.description}>{current.description}</p>
            </div>

            {/* Highlights */}
            {current.highlights && current.highlights.length > 0 && (
              <div className={classes.highlightsSection}>
                <h4 className={classes.highlightsTitle}>Event Highlights:</h4>
                <div className={classes.highlightsGrid}>
                  {current.highlights.map((highlight, idx) => (
                    <div 
                      key={idx} 
                      className={classes.highlightItem}
                      style={{ '--delay': idx * 100 }}
                    >
                      {/* Remove inline style, let CSS handle it */}
                      <div className={classes.highlightIcon}>
                        ★
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className={classes.actionSection}>
              <Button 
                label={current.register ? "Register Now →" : "View Details"} 
                cursorValue={current.register ? "pointer" : "default"}
                bgColor={current.color}
                textColor="#fff"
                onClick={() => redirect(current.register || current.more)}
                size="large"
                className={classes.primaryButton}
              />
            </div>

            {/* Countdown Indicator */}
            <div className={classes.countdownIndicator}>
              <div className={classes.pulseAnimation}>
                {/* Remove inline style, let CSS handle it */}
                <div className={classes.pulseCircle}></div>
                <div className={classes.pulseCircle}></div>
                <div className={classes.pulseCircle}></div>
              </div>
              <span className={classes.countdownText}>Coming Soon</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;