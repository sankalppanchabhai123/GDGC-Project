// Events.js - Horizontal Timeline
import React, { useContext, useEffect, useState, useRef } from 'react'
import EventCard from '../common/EventCard/EventCard'
import TimelineEventCard from '../common/TimeLineEventCard/TimeLineEventCard'
import classes from './Events.module.css'
import info from './EventsInfo'
import { ThemeContext } from '../../App'
import { useSpring, animated } from "react-spring"
import { getEventsData } from '../../getData/getEventsData'
import MomentsGallery from './momentsGallery'
import { Button } from '../common'

// Number animation component
function Number({ n }) {
    const { number } = useSpring({
        from: { number: 0 },
        number: n,
        delay: 200,
        config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
}

const Events = () => {
    const theme = useContext(ThemeContext)
    const [previousEvents, setPreviousEvents] = useState([])
    const [upcomingEvents, setUpcomingEvents] = useState([])
    const [activeUpcomingIndex, setActiveUpcomingIndex] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [displayTimeLeft, setDisplayTimeLeft] = useState(10)
    const animationTimeoutRef = useRef(null)
    const displayTimeoutRef = useRef(null)
    const displayIntervalRef = useRef(null)
    const timelineRef = useRef(null)

    useEffect(() => {
        async function fetchData() {
            try {
                const preData = await getEventsData("past");
                const upcomingdata = await getEventsData("upcoming");
                
                // Use fetched data or fallback to local data
                setPreviousEvents(preData.length > 0 ? preData : info.previous)
                setUpcomingEvents(upcomingdata.length > 0 ? upcomingdata : info.upcoming)
            } catch (error) {
                console.log("Error fetching data:", error);
                // Fallback to local data
                setPreviousEvents(info.previous)
                setUpcomingEvents(info.upcoming)
            }
        }
        fetchData();
    }, []);

    // Start animation sequence for a card
    const startAnimationSequence = () => {
        // Clear any existing timeouts/intervals
        clearTimeouts();
        
        // Reset display timer
        setDisplayTimeLeft(10);
        
        // Start animation
        setIsAnimating(true);
        
        // After 1 second (animation completes), show joined card
        animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            
            // Start countdown timer
            startDisplayCountdown();
            
            // After 10 seconds, move to next card
            displayTimeoutRef.current = setTimeout(() => {
                goToNextUpcoming();
            }, 10000); // Display joined card for 10 seconds
        }, 1000); // Animation duration (1 second)
    };

    // Start countdown timer
    const startDisplayCountdown = () => {
        // Clear any existing interval
        if (displayIntervalRef.current) {
            clearInterval(displayIntervalRef.current);
        }
        
        // Start countdown from 10
        let timeLeft = 10;
        setDisplayTimeLeft(timeLeft);
        
        // Update countdown every second
        displayIntervalRef.current = setInterval(() => {
            timeLeft--;
            setDisplayTimeLeft(timeLeft);
            
            if (timeLeft <= 0) {
                clearInterval(displayIntervalRef.current);
            }
        }, 1000);
    };

    // Clear all timeouts and intervals
    const clearTimeouts = () => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        if (displayTimeoutRef.current) {
            clearTimeout(displayTimeoutRef.current);
        }
        if (displayIntervalRef.current) {
            clearInterval(displayIntervalRef.current);
        }
    };

    // Auto-rotation effect for upcoming events
    useEffect(() => {
        // Clear any existing timeouts
        clearTimeouts();
        
        // Only set up rotation if there are upcoming events
        if (upcomingEvents.length > 0) {
            // Start the animation sequence
            startAnimationSequence();
        }
        
        // Cleanup
        return () => {
            clearTimeouts();
        };
    }, [upcomingEvents, activeUpcomingIndex]); // Re-run when active index changes

    // Manual navigation functions
    const goToNextUpcoming = () => {
        setActiveUpcomingIndex((prevIndex) => 
            prevIndex === upcomingEvents.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevUpcoming = () => {
        setActiveUpcomingIndex((prevIndex) => 
            prevIndex === 0 ? upcomingEvents.length - 1 : prevIndex - 1
        );
    };

    const handleDotClick = (index) => {
        if (index !== activeUpcomingIndex) {
            setActiveUpcomingIndex(index);
        }
    };

    // Scroll function for horizontal timeline (past events)
    const scrollTimeline = (direction) => {
        if (timelineRef.current) {
            const scrollAmount = 400;
            timelineRef.current.scrollLeft += direction * scrollAmount;
        }
    };

    return (
        <div className={`${classes.mainContainer} ${theme.theme === "dark" ? classes.dark : ""}`}>
                

            {/* Upcoming Events Section - Single Card with Split Animation */}
            <div className={classes.sectionContainer}>
                <div className={classes.sectionHeader}>
                    <div className={classes.titleWithIcon}>
                        <span className={classes.sectionIcon}>🚀</span>
                        <h1>Upcoming Events</h1>
                    </div>
                    
                    {/* Rotation Controls */}
                    {upcomingEvents.length > 1 && (
                        <div className={classes.rotationControls}>
                            <button 
                                className={classes.rotationBtn} 
                                onClick={goToPrevUpcoming}
                                aria-label="Previous event"
                            >
                                ←
                            </button>
                            
                            {/* Progress Display with Timer */}
                            <div className={classes.rotationProgress}>
                                
                                <div className={classes.progressDots}>
                                    {upcomingEvents.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`${classes.progressDot} ${idx === activeUpcomingIndex ? classes.activeDot : ''}`}
                                            onClick={() => handleDotClick(idx)}
                                            style={{ 
                                                backgroundColor: idx === activeUpcomingIndex ? upcomingEvents[idx].color : '#ccc' 
                                            }}
                                        />
                                    ))}
                                </div>
                                <div className={classes.timerContainer}>
                                    <div className={classes.timerBar}>
                                        <div 
                                            className={classes.timerProgress}
                                            style={{ 
                                                backgroundColor: upcomingEvents[activeUpcomingIndex]?.color || '#9C27B0',
                                                width: isAnimating ? '0%' : `${(displayTimeLeft / 10) * 100}%`,
                                                transition: isAnimating ? 'width 1s linear' : 'width 1s linear'
                                            }}
                                        ></div>
                                    </div>
                                    <span className={classes.timerText}>
                                        {isAnimating ? "Animating..." : `Next in ${displayTimeLeft}s`}
                                    </span>
                                </div>
                            </div>
                            
                            <button 
                                className={classes.rotationBtn} 
                                onClick={goToNextUpcoming}
                                aria-label="Next event"
                            >
                                →
                            </button>
                        </div>
                    )}
                </div>
                
                <div className={classes.upcomingEventsWrapper}>
                    <div className={classes.upcomingCardsContainer}>
                        {upcomingEvents.length > 0 ? (
                            <div className={classes.singleCardWrapper}>
                                {/* Split Card Container */}
                                <div className={`${classes.splitCardContainer} ${isAnimating ? classes.animating : classes.joined}`}>
                                    {/* Image Block - Slides from left */}
                                    <div className={`${classes.imageBlock} ${isAnimating ? classes.slideFromLeft : ''}`}>
                                        <div className={classes.imageContent}>
                                            {upcomingEvents[activeUpcomingIndex]?.image ? (
                                                <img 
                                                    src={upcomingEvents[activeUpcomingIndex].image} 
                                                    alt={upcomingEvents[activeUpcomingIndex].name}
                                                    className={classes.eventImage}
                                                />
                                            ) : (
                                                <div className={classes.imagePlaceholder} 
                                                    style={{ 
                                                        backgroundColor: `${upcomingEvents[activeUpcomingIndex]?.color || '#9C27B0'}20` 
                                                    }}>
                                                    <div className={classes.placeholderIcon}>📅</div>
                                                    <span>{upcomingEvents[activeUpcomingIndex]?.name}</span>
                                                </div>
                                            )}
                                            <div className={classes.imageBadge}>
                                                <span style={{ backgroundColor: upcomingEvents[activeUpcomingIndex]?.color || '#9C27B0' }}>
                                                    {upcomingEvents[activeUpcomingIndex]?.tag || "Upcoming"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Description Block - Slides from right */}
                                    <div className={`${classes.descriptionBlock} ${isAnimating ? classes.slideFromRight : ''}`}>
                                        <div className={classes.descriptionContent}>
                                            <div className={classes.descriptionHeader}>
                                                <h2 className={classes.eventTitle}>
                                                    {upcomingEvents[activeUpcomingIndex]?.name}
                                                </h2>
                                                <div className={classes.eventDate}>
                                                    <span className={classes.dateIcon}>📅</span>
                                                    {upcomingEvents[activeUpcomingIndex]?.date}
                                                </div>
                                            </div>
                                            
                                            <p className={classes.eventDescription}>
                                                {upcomingEvents[activeUpcomingIndex]?.description}
                                            </p>
                                            
                                            {upcomingEvents[activeUpcomingIndex]?.highlights && (
                                                <div className={classes.highlightsContainer}>
                                                    <h4>Highlights:</h4>
                                                    <div className={classes.highlightsGrid}>
                                                        {upcomingEvents[activeUpcomingIndex].highlights.map((highlight, idx) => (
                                                            <div key={idx} className={classes.highlightItem}>
                                                                <span className={classes.highlightIcon}>★</span>
                                                                <span>{highlight}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                            
                                            <div className={classes.actionButtons}>
                                                <Button 
                                                    label="Register Now →"
                                                    bgColor={upcomingEvents[activeUpcomingIndex]?.color || '#9C27B0'}
                                                    textColor="#fff"
                                                    onClick={() => window.open(upcomingEvents[activeUpcomingIndex]?.register, "_blank")}
                                                    size="large"
                                                    className={classes.registerBtn}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Next Card Preview */}
                                {upcomingEvents.length > 1 && (
                                    <div className={classes.nextCardPreview}>
                                        <div className={classes.nextCardLabel}>
                                            <span>Next:</span>
                                            <span className={classes.nextCardTitle}>
                                                {upcomingEvents[
                                                    activeUpcomingIndex === upcomingEvents.length - 1 
                                                    ? 0 
                                                    : activeUpcomingIndex + 1
                                                ].name}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className={classes.noEventsMessage}>
                                <div className={classes.noEventsIcon}>📅</div>
                                <h2>No Upcoming Events Scheduled</h2>
                                <p>We're working on exciting events! Check back soon.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Horizontal Timeline Section - Past Events */}
            <div className={classes.sectionContainer}>
                <div className={classes.sectionHeader}>
                    <div className={classes.titleWithIcon}>
                        <span className={classes.sectionIcon}>📅</span>
                        <h1>Past Events</h1>
                    </div>
                    <div className={classes.scrollControls}>
                        <button 
                            className={classes.scrollBtn} 
                            onClick={() => scrollTimeline(-1)}
                            aria-label="Scroll left"
                        >
                            ←
                        </button>
                        <button 
                            className={classes.scrollBtn} 
                            onClick={() => scrollTimeline(1)}
                            aria-label="Scroll right"
                        >
                            →
                        </button>
                    </div>
                </div>
                
                <div className={classes.timelineWrapper}>
                    <div className={classes.timelineContainer} ref={timelineRef}>
                        <div className={classes.timelineTrack}>
                            <div className={classes.timelineLine}></div>
                            
                            {previousEvents.map((event, index) => (
                                <div key={index} className={classes.timelineItem}>
                                    <div className={classes.timelineMarker}>
                                        <div 
                                            className={classes.markerDot}
                                            style={{ backgroundColor: event.color }}
                                        ></div>
                                        <div className={classes.timelineDate}>
                                            {event.month}
                                        </div>
                                    </div>
                                    <div className={classes.timelineContent}>
                                        <TimelineEventCard event={event} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Moments Gallery Section */}
            <MomentsGallery />
        </div>
    );
};

export default Events;