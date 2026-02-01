// EventsInfo.js
import React from 'react';
//import image1 from '../../assets/events/techfest2026.png';
import image2 from '../../assets/devsummit2026.png';

const EventsInfo = {
  total: [
    { number: 3, name: "Past Events", color: "#EA4335" },
    { number: 2, name: "Upcoming", color: "#34A853" },
    { number: 350, name: "Participants", color: "#FBBC04" }
  ],
  
  upcoming: [
    {
      name: "TechFest 2026",
      date: "February 9-10, 2026",
      description: "Annual technology festival featuring workshops, competitions, and tech exhibitions",
      color: "#9C27B0",
      register: "https://gdsc.com/techfest-register",
      more: "https://gdsc.com/techfest-details",
      month: "February 2026",
      status: "upcoming",
      tag: "Upcoming",
      highlights: ["Tech Workshops", "Competition", "Guest Speakers", "Games"]
    },
    {
      name: "DevSummit 2026",
      date: "February 27-28, 2026",
      description: "Developer summit with sessions on latest technologies, career guidance, and hands-on labs",
      color: "#9C27B0",
      register: "https://gdsc.com/devsummit-register",
      image:image2,
      month: "February 2026",
      status: "upcoming",
      tag: "Upcoming",
      highlights: ["Tech Talks", "Career Sessions", "Hands-on Labs", "Open Source"]
    }
  ],
  
  previous: [
    {
      name: "TechSprint Hackathon 2026",
      date: "January 25-26, 2026",
      description: "A innovative hackathon focusing on sustainable tech solutions and social impact",
      color: "#0F9D58",
      register: null,
      more: "https://gdsc.com/techsprint-2026",
      month: "January 2026",
      status: "past",
      tag: "Past",
      highlights: ["AI solutions", "200+ participants", "Sustainability focus", "Google technologies"]
    },
    {
      name: "InfoSession & Community Launch",
      date: "October 15, 2025",
      description: "Official GDGC launch event introducing the community, roadmap, and team for the academic year",
      color: "#4285F4",
      register: null,
      more: "https://gdsc.com/infosession-2025",
      month: "October 2025",
      status: "past",
      tag: "Past",
      highlights: ["Community Launch", "Year Roadmap", "Team Intro", "Networking"]
    },
    {
      name: "NoCode Ignition Workshop",
      date: "August 10, 2025",
      description: "FlutterFlow X Postman Community Pune workshop on no-code app development and API integration",
      color: "#DB4437",
      register: null,
      more: "https://gdsc.com/nocode-ignition",
      month: "August 2025",
      status: "past",
      tag: "Past",
      highlights: ["FlutterFlow", "Postman API", "No-Code Dev", "Live Demo"]
    }
  ]
};

export default EventsInfo;