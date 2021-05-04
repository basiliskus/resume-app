export default function ResumeTemplate({ document }) {
  return (
    <div id='resume'>
      <section id='header'>
        <div className='content'></div>
      </section>

      <section id='basics'>
        <div id='name'>
          <div className='first-name'>{document.name.firstName}</div>
          <div className='last-name'>{document.name.lastName}</div>
        </div>
        <div id='career-title'>{document.basics.title}</div>
        {document.basics.location && (
          <div id='location'>{document.basics.location}</div>
        )}
      </section>

      <section id='contact'>
        {document.basics.phone && <div id='phone'>{document.basics.phone}</div>}
        {document.basics.email && <div id='email'>{document.basics.email}</div>}
        {document.basics.linkedin && (
          <div id='linkedin'>{document.basics.linkedin}</div>
        )}
        {document.basics.github && (
          <div id='github'>{document.basics.github}</div>
        )}
      </section>

      <section id='summary'>
        <h2>Summary</h2>
        <div>
          {document.summary.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section id='skills'>
        <h2>Skills</h2>

        {!Array.isArray(document.skills)
          ? Object.keys(document.skills).map((key) => (
              <div key={key} className='skill'>
                <div className='name'>{key}</div>
                <div className='details'>{document.skills[key]}</div>
              </div>
            ))
          : document.skills.map((skill, index) => (
              <div key={index} className='skill'>
                {skill}
              </div>
            ))}
      </section>

      <section id='work'>
        <h2>Work Experience</h2>

        {document.work
          .filter((job) => job.include)
          .map((job, index) => (
            <div key={index} className='job'>
              <div className='company'>{job.institution}</div>
              <div className='title'>{job.title}</div>
              {job.location && <div className='location'>{job.location}</div>}
              <div className='date'>{job.date}</div>
              {Array.isArray(job.content) && job.content.length > 1 ? (
                <ul className='details'>
                  {job.content.map((detail, indexl) => (
                    <li key={indexl}>{detail}</li>
                  ))}
                </ul>
              ) : (
                <div className='details'>
                  {job.content.map((paragraph, indexp) => (
                    <p key={indexp}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
      </section>

      {document.projects.length > 0 && (
        <section id='projects'>
          <h2>Personal Projects</h2>

          {document.projects
            .filter((project) => project.include)
            .map((project, index) => (
              <div key={index} className='project'>
                <div className='name'>{project.name}</div>
                {project.date && <div className='date'>({project.date})</div>}
                <div className='description'>
                  {project.content[0]}
                  {project.content.slice(1).map((paragraph, indexp) => (
                    <p key={indexp}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
        </section>
      )}

      <section id='education'>
        <h2>Education</h2>

        {document.education.map((degree, index) => (
          <div key={index} className='degree'>
            {degree.title && <div className='name'>{degree.title}</div>}
            {degree.institution && (
              <div className='institution'>{degree.institution}</div>
            )}
            {degree.location && (
              <div className='location'>{degree.location}</div>
            )}
            {degree.date && <div className='date'>{degree.date}</div>}
            {degree.details && <div className='details'>{degree.details}</div>}
          </div>
        ))}
      </section>

      <section id='footer'>
        <div className='content'></div>
      </section>
    </div>
  );
}
