import React, { useEffect, useState } from "react";

import TeamCard from "../../common/TeamCard/TeamCard";

import info from "../TeamsInfo";

import classes from "./TechTeamPage.module.css";

import bgr from "../../../assets/redball.png";

import bgg from "../../../assets/bgg.png";

import bgb from "../../../assets/blueball.png";

import bgy from "../../../assets/bgy.png";

import { getAllTeamsData } from "../../../getData/getAllTeamsData";

const TechTeamPage = ({ data }) => {
  

  const techTeamData = data.filter((doc) =>
    ["web", "cloud", "aiml", "dsa", "android", "cs"].includes(doc.domain)
  );

  const techLeads = techTeamData.filter((member) => member.position === "lead" || member.position === "president");
  const techCoords = techTeamData.filter(
    (member) => member.position === "coor"
  );

  return (
    <>
      <img src={bgr} alt="" className={classes.bgr} />

      <img src={bgb} alt="" className={classes.bgb} />

      <img src={bgg} alt="" className={classes.bgg1} />

      <img src={bgy} alt="" className={classes.bgy1} />

      <h1 className={classes.h1} data-aos="fade-left">
        Technical Leads
      </h1>

      {/* <h1 className={classes.h1} data-aos="fade-left">Leads</h1> */}

      <div className={`${classes.technicalTeam} ${classes.cardContainers}`}>
        {
          // data.map((current, idx) => <TeamCard key={idx} current={current} />)

          techLeads.map((current, idx) => (
            <TeamCard key={idx} current={current} />
          ))
        }
      </div>

      <h1 className={classes.h1} data-aos="fade-left">
        Coordinators
      </h1>

      <div className={`${classes.managementTeam} ${classes.cardContainers}`}>
        {techCoords.map((current, idx) => (
          <TeamCard key={idx} current={current} />
        ))}
      </div>
    </>
  );
};

export default TechTeamPage;
