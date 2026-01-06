import React, { useContext, useEffect, useState } from 'react'
import classes from './TeamsPage.module.css'
import { TeamCard } from '../common'
// import info from './TeamsInfo'
import TechIcon from '../common/SVGs/TechIcon'
import DesignIcon from '../common/SVGs/DesignIcon'
import ManagementIcon from '../common/SVGs/ManagementIcon'
import PRIcon from '../common/SVGs/PRIcon'
import TechTeamPage from './TechTeamPage/TechTeamPage'
import DesignTeam from './DesignTeamPage/DesignTeam'
import ManagementTeam from './ManagementTeam/ManagementTeam'
import PRTeam from './PRTeam/PRTeam'
import { getTeamsData } from '../../getData/getTeamsData'
import { ThemeContext } from '../../App'
import bgg from '../../assets/bgg.png'
import bgy from '../../assets/bgy.png'
import Meet from '../../assets/meet.svg'
import meet2 from '../../assets/meetb.svg'
import AOS from 'aos';
import 'aos/dist/aos.css';

const TeamsPage = () => {
  const theme = useContext(ThemeContext)

  useEffect(() => {
    AOS.init({ duration: 50 });
  }, []);

  const [teamName, setTeamName] = useState("technical")
  const [dataArray, setDataArray] = useState([])
  const [leads, setLeads] = useState([])
  useEffect(() => {
    async function getData() {
      const data = await getTeamsData(teamName)
      setDataArray(data)
    }
    getData()
  }, [teamName])



  return (
    <div className={`${classes.container} ${theme.theme === "dark" ? classes.dark : ""}`}>
      <img src={bgg} alt='' className={classes.bgg} />
      <img src={bgy} alt='' className={classes.bgy} />
      {
        (theme.theme === "dark") ? <img src={meet2} alt='' className={classes.head} />
          : <img src={Meet} alt='' className={classes.head} data-aos="fade-down" />
      }
      {/* <div className={`${classes.leads} ${classes.cardContainers}`}>
        {leads.map((current, idx) => <TeamCard key={idx} current={current} />)}
      </div> */}

      <div className={classes.icons} >
        <TechIcon onClick={() => { setTeamName("technical") }} selected={teamName === "technical"} />
        <DesignIcon onClick={() => { setTeamName("design") }} selected={teamName === "design"} />
        <ManagementIcon onClick={() => { setTeamName("management") }} selected={teamName === "management"} />
        <PRIcon onClick={() => { setTeamName("pr") }} selected={teamName === "pr"} />

      </div>
      {
        teamName === "technical" ? <TechTeamPage data={dataArray} /> :
          teamName === "design" ? <DesignTeam data={dataArray} /> :
            teamName === "management" ? <ManagementTeam data={dataArray} /> :
              teamName === "pr" ? <PRTeam data={dataArray} /> : null
      }

      {/* new added */}
      {/* <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        spaceBetween={20} // Increased spacing for better mobile view
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 30, // Reduced rotation for better image visibility
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 20 }, // Single view on small mobile
          480: { slidesPerView: 1.1, spaceBetween: 20 }, // Better spacing for mobile
          640: { slidesPerView: 1.5, spaceBetween: 30 }, // Better spacing for tablets
          1024: { slidesPerView: 2.5, spaceBetween: 40 }, // Better desktop view
        }}
      >
        {teamMembersLead.map((member) => (
          <SwiperSlide key={member.id} className="py-6 px-4">  // Increased padding for better spacing
            <TechTeamPage data={dataArray} />
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  )
}

export default TeamsPage