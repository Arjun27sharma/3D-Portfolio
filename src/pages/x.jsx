import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    about_desc: "", // Change overview to about_desc
    workExperience: [
      {
        title: "",
        company_name: "",
        startDate: "",
        endDate: "",
        points: [""],
      },
    ],
    skills: [
      {
        name: "",
        proficiency: "Beginner",
        icon: "",
      },
    ],
    projects_desc: "", // Add projects_desc field
    projects: [
      {
        title: "",
        description: "",
        imageURL: "",
        projectURL: "",
        tags: [{ name: "", color: "blue-text-gradient" }],
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
    ], // Add services field
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    // Handle nested fields for workExperience, skills, projects, and testimonials
    if (
      name.startsWith("workExperience") ||
      name.startsWith("skills") ||
      name.startsWith("projects") ||
      name.startsWith("testimonials")
    ) {
      handleNestedField(name, value, formData, setFormData);
    } else if (name.includes("socialMediaLinks.")) {
      handleNestedField(name, value, formData, setFormData);
    } else if (name.startsWith("tags.")) {
      const [section, index, field] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [section]: prevData[section].map((item, i) =>
          i.toString() === index ? { ...item, [field]: value } : item
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleNestedField = (name, value, formData, setFormData) => {
    const [section, ...rest] = name.split(".");
    if (rest.length === 1) {
      setFormData((prevData) => ({
        ...prevData,
        [section]: { ...prevData[section], [rest[0]]: value },
      }));
    } else {
      const index = rest[0];
      const field = rest[1];
      setFormData((prevData) => ({
        ...prevData,
        [section]: prevData[section].map((item, i) =>
          i.toString() === index ? { ...item, [field]: value } : item
        ),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", formData, {
        withCredentials: true,
      });
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred during signup.");
    }
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <h2>Signup Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Rest of the form elements */}


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
          </div>

          <hr className="divider" />

          <div className="group-item">
            {/* Overview */}
            <div className="form-group data_section">
              <label>Overview</label>
              <textarea
                placeholder="Enter your overview"
                name="about_desc"
                value={formData.about_desc}
                onChange={handleOnChange}
              />
            </div>
          </div>

          <hr className="divider" />

<div className="group-item">
  {/* Services */}
  <div className="form-group data_section">
    <h3>Services</h3>
    {formData.services.map((service, index) => (
      <div key={index} className="service-item">
        <div className="form-group">
          <label>Service Name</label>
          <input
            type="text"
            name={`services.${index}.name`}
            value={service.name}
            onChange={handleOnChange}
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            name={`services.${index}.imgUrl`}
            value={service.imgUrl}
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
          services: [...prevData.services, { name: "", imgUrl: "" }],
        }))
      }
    >
      Add Service
    </button>
  </div>
</div>



          <hr className="divider" />

          <div className="group-item">
            {/* Projects Description */}
            <div className="form-group">
              <label>Projects Description</label>
              <textarea
                name="projects_desc"
                value={formData.projects_desc}
                onChange={handleOnChange}
                required
              />
            </div>
          </div>

          {/* Rest of the form elements */}



          <hr className="divider" />

          <div className="group-item">
            {/* Work Experience */}
            <div className="form-group data_section">
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
                  {/* <div className="form-group">
                    <label>Description</label>
                    <textarea
                      name={`workExperience.${index}.points.0`}
                      value={workExp.points[0]}
                      onChange={handleOnChange}
                    />
                  </div> */}
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
          </div>

          <hr className="divider" />

          <div className="group-item">
            {/* Skills */}
            <div className="form-group data_section">
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
                    <select
                      name={`skills.${index}.icon`}
                      value={skill.icon}
                      onChange={handleOnChange}
                    >
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="javascript">JavaScript</option>
                      <option value="typescript">TypeScript</option>
                      <option value="reactjs">ReactJS</option>
                      <option value="redux">Redux</option>
                      <option value="tailwind">Tailwind</option>
                      <option value="nodejs">Node.js</option>
                      <option value="mongodb">MongoDB</option>
                      <option value="threejs">Three.js</option>
                      <option value="git">Git</option>
                      <option value="figma">Figma</option>
                      <option value="docker">Docker</option>
                    </select>
                  </div>



                  <div className="form-group">
                    <label>Proficiency</label>
                    <select
                      name={`skills.${index}.proficiency`}
                      value={skill.proficiency}
                      onChange={handleOnChange}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
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
                        proficiency: "Beginner",
                        icon: "",
                      },
                    ],
                  }))
                }
              >
                Add Skill
              </button>
            </div>
          </div>

          <hr className="divider" />

          <div className="group-item">
            {/* Projects */}
            <div className="form-group data_section">
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
                  <div className="form-group">
                    <label>Tag Name</label>
                    <input
                      type="text"
                      name={`projects.${index}.tags.0.name`}
                      value={project.tags[0].name}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Tag Color</label>
                    <select
                      name={`projects.${index}.tags.0.color`}
                      value={project.tags[0].color}
                      onChange={handleOnChange}
                    >
                      <option value="blue-text-gradient">Blue</option>
                      <option value="green-text-gradient">Green</option>
                      <option value="pink-text-gradient">Pink</option>
                    </select>
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
                        tags: [{ name: "", color: "blue-text-gradient" }],
                      },
                    ],
                  }))
                }
              >
                Add Project
              </button>
            </div>
          </div>

          <hr className="divider" />

          <div className="group-item">
            {/* Social Media Links */}
            <div className="form-group data_section">
              <h3>Social Media Links</h3>
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="socialMediaLinks.linkedIn"
                  value={formData.socialMediaLinks.linkedIn}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="text"
                  name="socialMediaLinks.twitter"
                  value={formData.socialMediaLinks.twitter}
                  onChange={handleOnChange}
                />
              </div>
              <div className="form-group">
                <label>GitHub</label>
                <input
                  type="text"
                  name="socialMediaLinks.github"
                  value={formData.socialMediaLinks.github}
                  onChange={handleOnChange}
                />
              </div>
            </div>
          </div>

          <hr className="divider" />

          <div className="group-item">
            {/* Testimonials */}
            <div className="form-group">
              <h3>Testimonials</h3>
              {formData.testimonials.map((testimonial, index) => (
                <div key={index} className="testimonial-item">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name={`testimonials.${index}.name`}
                      value={testimonial.name}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Testimonial</label>
                    <textarea
                      name={`testimonials.${index}.testimonial`}
                      value={testimonial.testimonial}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Designation</label>
                    <input
                      type="text"
                      name={`testimonials.${index}.designation`}
                      value={testimonial.designation}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      name={`testimonials.${index}.company`}
                      value={testimonial.company}
                      onChange={handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Image URL</label>
                    <input
                      type="text"
                      name={`testimonials.${index}.imageUrl`}
                      value={testimonial.imageUrl}
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
                    testimonials: [
                      ...prevData.testimonials,
                      { name: "", testimonial: "", designation: "", company: "", imageUrl: "" },
                    ],
                  }))
                }
              >
                Add Testimonial
              </button>
            </div>
          </div>


          {/* Submit Button */}
          <button type="submit">Submit</button>

          <span>
            Already have an account? <Link to={"/login"}>Signin</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
