import React from "react";


import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
// import { technologies } from "../constants";

const Tech = ({technologies}) => {
  console.log(technologies)
  return (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name} style={{textAlign: "center"}}>
          <p className="self-center">{technology.name}</p>
          <BallCanvas icon={technology.icon} />
          {/* <img src={technology.icon}  width={100} height={100} alt="" /> */}
          
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, "");
