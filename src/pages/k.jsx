// ... Other imports and code ...

const Signup = () => {
    // ... Form state and other code ...
  
    // Function to handle adding a new tag for a project
    const handleAddTag = (projectIndex) => {
      setFormData((prevData) => {
        const projectsCopy = [...prevData.projects];
        projectsCopy[projectIndex].tags.push({
          name: "",
          color: "blue-text-gradient",
        });
        return { ...prevData, projects: projectsCopy };
      });
    };
  
    // ... handleOnChange function and other code ...
  
    return (
      // ... JSX elements ...
      <div className="signup-wrapper">
        {/* ... Other JSX elements ... */}


        
        <div className="group-item">
          {/* Projects */}
          <div className="form-group data_section">
            <h3>Projects</h3>
            {formData.projects.map((project, projectIndex) => (
              <div key={projectIndex} className="project-item">
                {/* ... Other project fields ... */}
                {project.tags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="form-group">
                    <label>Tag Name</label>
                    <input
                      type="text"
                      name={`projects.${projectIndex}.tags.${tagIndex}.name`}
                      value={tag.name}
                      onChange={handleOnChange}
                    />
                    <label>Tag Color</label>
                    <select
                      name={`projects.${projectIndex}.tags.${tagIndex}.color`}
                      value={tag.color}
                      onChange={handleOnChange}
                    >
                      <option value="blue-text-gradient">Blue</option>
                      <option value="green-text-gradient">Green</option>
                      <option value="pink-text-gradient">Pink</option>
                    </select>
                  </div>
                ))}
                <button type="button" onClick={() => handleAddTag(projectIndex)}>
                  Add Tag
                </button>
              </div>
            ))}
          </div>
        </div>


        {/* ... Other JSX elements ... */}
      </div>
    );
  };
  
  export default Signup;
  