export default function Projects({ content }) {
  return (
    <section id='projects'>
      <h2>Personal Projects</h2>

      {content
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
  );
}
