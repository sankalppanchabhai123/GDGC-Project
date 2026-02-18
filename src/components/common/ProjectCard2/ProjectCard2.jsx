import React, { useContext, useEffect } from 'react';
import classes from './ProjectCard2.module.css';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import LinkIcon from '../SVGs/Link';
import GithubIcon from '../SVGs/Github';
import { ThemeContext } from '../../../App';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Local project images
import project1Img from '../../../assets/Project1.png';
import project2Img from '../../../assets/Project2.png';
import project3Img from '../../../assets/Project3.png';
import project4Img from '../../../assets/Project4.png';
import project5Img from '../../../assets/Project5.png';
import project6Img from '../../../assets/Project6.png';
import project7Img from '../../../assets/Project7.png';

// Image array (order matters)
const projectImages = [
  project1Img,
  project2Img,
  project3Img,
  project4Img,
  project5Img,
  project6Img,
  project7Img,
];


const ProjectCard2 = ({ current, index }) => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);

  // Pick image using index
  const projectImage = projectImages[index % projectImages.length];
  console.log(index, projectImage);


  const getStatusColor = (status) => {
    const isDark = theme.theme === 'dark';
    switch (status?.toLowerCase()) {
      case 'live': return isDark ? '#10B981' : '#059669';
      case 'completed': return isDark ? '#3B82F6' : '#2563EB';
      case 'in progress': return isDark ? '#F59E0B' : '#D97706';
      case 'planned': return isDark ? '#8B5CF6' : '#7C3AED';
      default: return isDark ? '#6B7280' : '#4B5563';
    }
  };

  const accentColor = theme.theme === 'dark' ? '#3B82F6' : '#2563EB';
  const statusColor = getStatusColor(current.status);

  const getLanguagesArray = () =>
    Array.isArray(current.languages)
      ? current.languages
      : typeof current.languages === 'string'
      ? current.languages.split(',').map(l => l.trim())
      : [];

  const getTagsArray = () =>
    Array.isArray(current.tags)
      ? current.tags
      : typeof current.tags === 'string'
      ? current.tags.split(',').map(t => t.trim())
      : [];

  const getFirstTag = () => {
    const tags = getTagsArray();
    return tags.length > 0 ? tags[0] : 'Project';
  };

  return (
    <div
      className={`${classes.main} ${theme.theme === 'dark' ? classes.dark : ''}`}
      data-aos="fade-up"
      style={{
        '--accent-color': accentColor,
        '--status-color': statusColor,
      }}
    >
      {/* Status */}
      {current.status && (
        <div className={classes.statusBadge}>
          <span className={classes.statusDot}></span>
          {current.status}
        </div>
      )}

      {/* Actions */}
      <div className={classes.quickActions}>
        {current.link && (
          <Link to={current.link} target="_blank" className={classes.actionIcon}>
            <LinkIcon color={accentColor} />
          </Link>
        )}
        {current.github && (
          <Link to={current.github} target="_blank" className={classes.actionIcon}>
            <GithubIcon color={accentColor} />
          </Link>
        )}
      </div>

      {/* Image */}
      <div className={classes.imageContainer}>
        <img
          src={projectImage}
          alt={current.projectName}
          className={classes.projectImage}
        />
        <div className={classes.imageOverlay}></div>
        <div className={classes.imageBadge}>{getFirstTag()}</div>
      </div>

      {/* Content */}
      <div className={classes.content}>
        <h3 className={classes.projectTitle}>{current.projectName}</h3>

        {current.description && (
          <p className={classes.projectDescription}>
            {current.description.length > 100
              ? current.description.slice(0, 100) + '...'
              : current.description}
          </p>
        )}

        {/* Tech stack */}
        {getLanguagesArray().length > 0 && (
          <div className={classes.languagesSection}>
            <span className={classes.languagesLabel}>Tech Stack:</span>
            <div className={classes.languagesList}>
              {getLanguagesArray().slice(0, 3).map((lang, i) => (
                <span key={i} className={classes.languageTag}>{lang}</span>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        {getTagsArray().length > 0 && (
          <div className={classes.tagsContainer}>
            {getTagsArray().slice(0, 3).map((tag, i) => (
              <span key={i} className={classes.tag}>{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className={classes.footer}>
          {current.github && (
            <Button
              onClick={() => window.open(current.github, '_blank')}
              label="View on GitHub"
              padding="10px 20px"
              borderRadius="8px"
              bgColor={accentColor}
              textColor="#fff"
              icon="→"
              iconPosition="right"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard2;
