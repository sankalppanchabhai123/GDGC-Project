// TimeLineEventCard.js
import React from 'react';
import classes from './TimelineEventCard.module.css';
import { ThemeContext } from '../../../App';
import { useContext } from 'react';

const TimelineEventCard = ({ event }) => {
    const theme = useContext(ThemeContext);
    
    return (
        <div className={`${classes.card} ${theme.theme === 'dark' ? classes.dark : ''}`}>
            <div className={classes.cardHeader}>
                <span className={classes.tag} style={{ backgroundColor: event.color }}>
                    {event.tag}
                </span>
                <h3 className={classes.eventName}>{event.name}</h3>
                <p className={classes.eventDate}>{event.date}</p>
            </div>
            
            <div className={classes.cardBody}>
                <p className={classes.description}>{event.description}</p>
                
                {event.highlights && event.highlights.length > 0 && (
                    <div className={classes.highlights}>
                        <h4>Highlights:</h4>
                        <div className={classes.highlightTags}>
                            {event.highlights.map((highlight, idx) => (
                                <span key={idx} className={classes.highlightTag}>
                                    {highlight}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            
            <div className={classes.cardFooter}>
                {event.register && (
                    <a 
                        href={event.register} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`${classes.button} ${classes.registerBtn}`}
                    >
                        Register Now
                    </a>
                )}
            </div>
        </div>
    );
};

export default TimelineEventCard;