import React, { useEffect } from "react";
// import ProjectCard from "../components/common/ProjectCard/ProjectCard";
import ProjectSection from "../components/ProjectSection/ProjectSection";
import ScrollingFeatureShowcase from "../components/ui/ScrollingFeatureShowcase"
const ProjectsPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      {/* <ProjectSection /> */}
      <ScrollingFeatureShowcase />
    </>
  );
};

export default ProjectsPage;
