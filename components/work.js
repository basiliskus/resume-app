export default function Work({ content }) {
  return (
    <section id='work'>
      <h2>Work Experience</h2>

      {content
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
  );
}
