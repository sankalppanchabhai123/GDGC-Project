// src/data/projectsInfo.js
import img1 from "../assets/tagImg.png"

const projectsInfo = [
    {
        id: 1,
        projectName: "Athena",
        authors: ["Palash Rambhia"],
        authorImages: [img1],
        tags: ["Web Development", "Open Source"],
        languages: ["HTML", "CSS", "JS", "ReactJS"],
        description: "A modern web application for learning and collaboration.",
        link: "",
        github: "https://github.com/Palash2911/Athena",
        color: "#EA4335",
        status: "Completed",
        type: "Web Application",
        date: "2024-01-15"
    },
    {
        id: 2,
        projectName: "Animating Buttons",
        authors: ["Om Gawande", "Palash Rambhia"],
        authorImages: [img1, img1],
        tags: ["Web Development", "Open Source", "UI/UX"],
        languages: ["HTML", "CSS", "JS", "ReactJs"],
        description: "A collection of beautifully animated buttons for web projects.",
        link: "",
        github: "https://github.com/Spyware007/Animating-Buttons",
        color: "#0F9D58",
        status: "Live",
        type: "UI Library",
        date: "2024-02-10"
    },
    {
        id: 3,
        projectName: "Tour India",
        authors: ["Om Gawande"],
        authorImages: [img1],
        tags: ["Web Development", "Open Source"],
        languages: ["HTML", "CSS", "JS"],
        description: "A travel guide website showcasing beautiful destinations in India.",
        link: "",
        github: "https://github.com/Spyware007/TourIndia",
        color: "#0F9D58",
        status: "Completed",
        type: "Travel Website",
        date: "2024-01-28"
    },
    {
        id: 4,
        projectName: "UN - Toxic",
        authors: ["Palash Rambhia"],
        authorImages: [img1],
        tags: ["Flutter Project", "Mobile App"],
        languages: ["Dart", "Swift"],
        description: "A mobile app for reporting and tracking environmental issues.",
        link: "",
        github: "https://github.com/Palash2911/UN-Toxic",
        color: "#4285F4",
        status: "In Progress",
        type: "Mobile Application",
        date: "2024-03-05"
    },
    {
        id: 5,
        projectName: "SAHARA",
        authors: ["Shweta Mandal"],
        authorImages: [img1],
        tags: ["Web Development", "Open Source"],
        languages: ["HTML", "CSS", "JS", "ReactJS", "FireBase"],
        description: "E-commerce platform for desert adventure equipment.",
        link: "",
        github: "https://github.com/Shweta2003/SAHARA",
        color: "#EA4335",
        status: "Completed",
        type: "E-commerce",
        date: "2024-02-20"
    },
    {
        id: 6,
        projectName: "Helper",
        authors: ["Shweta Mandal"],
        authorImages: [img1],
        tags: ["Android Development", "Open Source"],
        languages: ["Android Studio", "Java", "FireBase"],
        description: "Android app for daily task management and reminders.",
        link: "",
        github: "https://github.com/Shweta2003/Helper",
        color: "#0F9D58",
        status: "Live",
        type: "Android App",
        date: "2024-02-15"
    },
    {
        id: 7,
        projectName: "Rempo",
        authors: ["Om Gawande", "Palash Rambhia", "Saurabh Barde"],
        authorImages: [img1, img1, img1],
        tags: ["Flutter Project", "Mobile App"],
        languages: ["Kotlin", "JavaScript", "CSS"],
        description: "Remote employee management and productivity tracking app.",
        link: "",
        github: "https://github.com/Palash2911/Rempo",
        color: "#4285F4",
        status: "In Progress",
        type: "Mobile Application",
        date: "2024-03-12"
    }
];

export default projectsInfo;