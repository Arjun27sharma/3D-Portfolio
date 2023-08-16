import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UpdateProfile = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    logo: "",
    about_desc: "",
    tagline: "",
    workExperience: [
      {
        title: "",
        company_name: "",
        startDate: "",
        endDate: "",
        desc: "",
        companyImgUrl: "",
      },
    ],
    skills: [
      {
        name: "",
        proficiency: "Beginner",
        icon: "",
      },
    ],
    project_desc: "",
    projects: [
      {
        title: "",
        description: "",
        imageURL: "",
        projectURL: "",
      },
    ],
    socialMediaLinks: {
      linkedIn: "",
      twitter: "",
      github: "",
    },
    testimonials: [
      {
        name: "",
        testimonial: "",
        designation: "",
        company: "",
        imageUrl: "",
      },
    ],
    services: [
      {
        name: "",
        imgUrl: "",
      },
    ],
  });

  useEffect(() => {
    fetchUserData();
  }, []);

//   const fetchUserData = async () => {
//     try {
//     //   const response = await axios.get("http://localhost:4000/user-details", {
//     //     withCredentials: true,
//     //   });
//     //   console.log(response)
//     //   setFormData(response.data.user);


//     const response = await axios.get("http://localhost:4000/user-details", {
//       withCredentials: true,
//     });
//     const { user } = response.data;

//     console.log(user)
    
//     // Convert the date format for workExperience startDate and endDate
//     const updatedWorkExperience = user.workExperience.map((workExp) => ({
//       ...workExp,
//       startDate: workExp.startDate.split("T")[0], // Get only the date part
//       endDate: workExp.endDate.split("T")[0], // Get only the date part
//     }));

//     setFormData({
//       ...user,
//       workExperience: updatedWorkExperience,
//     });
//     } catch (error) {
//       console.error(error);
//     }
//   };



const fetchUserData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user-details", {withCredentials: true});
      const { user } = response.data;


      console.log(user)
      
      // Convert the date format for workExperience startDate and endDate
      const updatedWorkExperience = user.workExperience.map((workExp) => ({
        ...workExp,
        startDate: workExp.startDate ? workExp.startDate.split("T")[0] : "", // Check if startDate exists before splitting
        endDate: workExp.endDate ? workExp.endDate.split("T")[0] : "", // Check if endDate exists before splitting
      }));
  
      setFormData({
        ...user,
        workExperience: updatedWorkExperience,
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/update", formData, {
        withCredentials: true,
      });
      const { success, user } = response.data;
      if (success) {
        console.log("User data updated:", user);
        alert("User data updated successfully!");
      } else {
        console.error("Error updating user data");
        alert("Error updating user data. Please try again.");
      }
    } catch (error) {
      console.error(error);
    }
  };

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };



const handleOnChange = (e) => {
    const { name, value } = e.target;
  
    // Check if the field is a nested field within an array
    if (name.startsWith("workExperience") || name.startsWith("skills") || name.startsWith("projects")) {
      const [section, index, field] = name.split(".");
      setFormData((prevData) => {
        const newArray = [...prevData[section]];
        newArray[index] = {
          ...newArray[index],
          [field]: value,
        };
        return {
          ...prevData,
          [section]: newArray,
        };
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };
  

  return (
    <div>
      {/* Display each section with the existing data */}
      <div className="group-item">
        {/* Email */}
        <div className="form-group">
          <label>Email</label>
          <input
            placeholder="Enter your email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleOnChange}
            required
          />
        </div>
        {/* Password */}
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder="Enter your password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleOnChange}
            required
          />
        </div>
        {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            placeholder="Enter your username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            placeholder="Enter your Logo Url"
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleOnChange}
            required
          />
        </div>
      </div>


              {/* tagline */}
              <div className="form-group">
          <label>Tagline</label>
          <input
            placeholder="Enter your tagline"
            type="text"
            name="tagline"
            value={formData.tagline}
            onChange={handleOnChange}
            required
          />
        </div>

      {/* Work Experience */}
      <div className="group-item">
        <h3>Work Experience</h3>
        {formData.workExperience.map((workExp, index) => (
          <div key={index} className="work-experience-item">
            <div className="form-group">
              <label>Job Title</label>
              <input
                placeholder="Enter your job title"
                type="text"
                name={`workExperience.${index}.title`}
                value={workExp.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                placeholder="Enter your company"
                type="text"
                name={`workExperience.${index}.company_name`}
                value={workExp.company_name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Company Logo Url</label>
              <input
                placeholder="Company Logo Url"
                type="text"
                name={`workExperience.${index}.companyImgUrl`}
                value={workExp.companyImgUrl}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name={`workExperience.${index}.startDate`}
                value={workExp.startDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name={`workExperience.${index}.endDate`}
                value={workExp.endDate}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                placeholder="Enter your Description"
                type="text"
                name={`workExperience.${index}.desc`}
                value={workExp.desc}
                onChange={handleOnChange}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prevData) => ({
              ...prevData,
              workExperience: [
                ...prevData.workExperience,
                {
                  title: "",
                  company_name: "",
                  startDate: "",
                  endDate: "",
                  points: [""],
                },
              ],
            }))
          }
        >
          Add Work Experience
        </button>
      </div>

      {/* Skills */}
      <div className="group-item">
        <h3>Skills</h3>
        {formData.skills.map((skill, index) => (
          <div key={index} className="skill-item">
            <div className="form-group">
              <label>Skill Name</label>
              <input
                type="text"
                name={`skills.${index}.name`}
                value={skill.name}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                name={`skills.${index}.icon`}
                value={skill.icon}
                onChange={handleOnChange}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prevData) => ({
              ...prevData,
              skills: [
                ...prevData.skills,
                {
                  name: "",
                  icon: "",
                },
              ],
            }))
          }
        >
          Add Skill
        </button>
      </div>

      {/* Projects */}
      <div className="group-item">
        <h3>Projects</h3>
        {formData.projects.map((project, index) => (
          <div key={index} className="project-item">
            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                name={`projects.${index}.title`}
                value={project.title}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                name={`projects.${index}.description`}
                value={project.description}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="text"
                name={`projects.${index}.imageURL`}
                value={project.imageURL}
                onChange={handleOnChange}
              />
            </div>
            <div className="form-group">
              <label>Project URL</label>
              <input
                type="text"
                name={`projects.${index}.projectURL`}
                value={project.projectURL}
                onChange={handleOnChange}
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData((prevData) => ({
              ...prevData,
              projects: [
                ...prevData.projects,
                {
                  title: "",
                  description: "",
                  imageURL: "",
                  projectURL: "",
                },
              ],
            }))
          }
        >
          Add Project
        </button>
      </div>

      {/* Rest of the sections */}
      {/* ... */}

      {/* Submit Button */}
      <button type="submit" onClick={handleSubmit}>
        Update Profile
      </button>

      <span>
        {/* Link to the profile page */}
        <Link to={"/"}>Go back to profile</Link>
      </span>
    </div>
  );
};

export default UpdateProfile;
