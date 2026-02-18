import React, { useContext, useState, useEffect } from 'react'
import classes from './ProjectSection.module.css'
import { ThemeContext } from '../../App'
import ProjectCard2 from '../common/ProjectCard2/ProjectCard2'
import AOS from 'aos';
import 'aos/dist/aos.css';
import info from '../../getData/getProjectsData'

const SearchIcon = ({ className = "" }) => {
    return (
        <svg 
            className={className} 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor"
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
};

const ProjectSection = () => {
    useEffect(() => {
        AOS.init({
            duration: 500,
            once: true
        });
    }, []);
    
    const theme = useContext(ThemeContext);
    const [projectData, setProjectData] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedTag, setSelectedTag] = useState('All')

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                setProjectData(info);
                
                setTimeout(() => {
                    setLoading(false);
                }, 500);
                
            } catch (err) {
                console.error("Error loading projects:", err);
                setProjectData(info);
                setLoading(false);
            }
        }
        getData()
    }, [])

    // Get all unique tags from projects
    const allTags = ['All', ...new Set(projectData.flatMap(project => project.tags))];

    // Filter projects
    const filteredProjects = projectData.filter(project => {
        if (selectedTag !== 'All' && !project.tags.includes(selectedTag)) {
            return false;
        }
        
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            return (
                project.projectName.toLowerCase().includes(term) ||
                (project.description && project.description.toLowerCase().includes(term)) ||
                project.authors.some(author => author.toLowerCase().includes(term)) ||
                project.languages.some(lang => lang.toLowerCase().includes(term))
            );
        }
        
        return true;
    });

    // Calculate stats
    const totalProjects = projectData.length;
    const totalDevelopers = [...new Set(projectData.flatMap(p => p.authors))].length;
    const totalTechnologies = allTags.length - 1;

    return (
        <div className={`${classes.mainDiv} ${theme.theme === "dark" ? classes.dark : ""}`}>
            {/* Stats Cards - Using CORRECT class names */}
            <div className={classes.statsContainer} data-aos="fade-up">
                <div className={classes.statItem}>
                    <span className={classes.statNumber}>{totalProjects}</span>
                    <span className={classes.statLabel}>PROJECTS</span>
                </div>
                <div className={classes.statItem}>
                    <span className={classes.statNumber}>{totalDevelopers}</span>
                    <span className={classes.statLabel}>DEVELOPERS</span>
                </div>
                <div className={classes.statItem}>
                    <span className={classes.statNumber}>{totalTechnologies}</span>
                    <span className={classes.statLabel}>TECHNOLOGIES</span>
                </div>
            </div>

            {/* Search Bar - Using CORRECT class names */}
            <div className={classes.controls} data-aos="fade-up" data-aos-delay="100">
                <div className={classes.searchContainer}>
                    <input
                        type="text"
                        placeholder="Search projects"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={classes.searchInput}
                    />
                    <SearchIcon className={classes.searchIcon} />
                </div>
                
                {/* Tag Filters - Using CORRECT class names */}
                <div className={classes.filterContainer}>
                    <div className={classes.tagFilters}>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                className={`${classes.tagButton} ${selectedTag === tag ? classes.active : ''}`}
                                onClick={() => setSelectedTag(tag)}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading && (
                <div className={classes.loadingContainer}>
                    <div className={classes.spinner}></div>
                    <p>Loading projects...</p>
                </div>
            )}

            {/* Projects Grid - Using CORRECT class name */}
            {!loading && (
                <>
                    {filteredProjects.length > 0 ? (
                        <div className={classes.container}>
                            {filteredProjects.map((current, index) => (
                                <ProjectCard2 
                                key={current.id || current.projectName} 
                                current={current} 
                                index={index}   // <-- add this
                                data-aos="fade-up"
                                data-aos-delay={100 * (index % 3)}
                            />

                            ))}
                        </div>
                    ) : (
                        <div className={classes.noResults}>
                            <div className={classes.noResultsIcon}>
                                <SearchIcon />
                            </div>
                            <h3>No projects found</h3>
                            <p>Try adjusting your search or filter</p>
                            <button 
                                className={classes.clearButton}
                                onClick={() => {
                                    setSearchTerm('');
                                    setSelectedTag('All');
                                }}
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default ProjectSection