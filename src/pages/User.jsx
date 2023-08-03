// UserDetails.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./userstyle.css"
import { About, Contact, Experience, Feedbacks, Hero, Navbar, StarsCanvas, Tech, Works } from '../components';

const UserDetails = () => {
  const [user, setUser] = useState(null);

  

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    try {
      const response = await axios.get('http://localhost:4000/user-details', {withCredentials: true,});
      console.log(response)
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  console.log(user.overview)

  return (
    

    <div>

        <div>
        <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar userName={user.username}/>
          <Hero username={user.username} tagline1={"I develope"}/>
        </div>
        <About overview={user.about_desc} services={user.services}/>
        <Experience experiences={user.workExperience}/>
        <Tech technologies={user.skills}/>


        <Works text={user.project_desc} projects={user.projects}/>


        <Feedbacks testimonials={user.testimonials}/>



        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>
        </div>
    </div>

  );
};

export default UserDetails;
