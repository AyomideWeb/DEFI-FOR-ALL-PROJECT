import React from 'react';
import { useNavigate } from 'react-router-dom';

import PaymentCard from './PaymentCard';
import { loading_icon } from '../assets';

const DisplayProjects = ({ title, isLoading, projects }) => {
  const navigate = useNavigate();

  const handleNavigate = (project) => {
    navigate(`/project-details/${project.title}`, { state: project })
  }

  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({projects.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loading_icon} alt="loading...Please wait." className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && projects.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any Project Campaigns yet.<br /> Kindly click on the Create Project Campaign tab.
          </p>
        )}

        {!isLoading && projects.length > 0 && projects.map((project) => <PaymentCard
          key={project.id}
          {...project}
          handleClick={() => handleNavigate(project)}
        />)}

      </div>
    </div>
  )
}

export default DisplayProjects