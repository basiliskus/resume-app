export default function Skills({ content }) {
  return (
    <section id='skills'>
      <h2>Skills</h2>

      {!Array.isArray(content)
        ? Object.keys(content).map((key) => (
            <div key={key} className='skill'>
              <div className='name'>{key}</div>
              <div className='details'>{content[key]}</div>
            </div>
          ))
        : content.map((skill, index) => (
            <div key={index} className='skill'>
              {skill}
            </div>
          ))}
    </section>
  );
}
