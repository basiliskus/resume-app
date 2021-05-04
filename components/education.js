export default function Education({ content }) {
  return (
    <section id='education'>
      <h2>Education</h2>

      {content.map((degree, index) => (
        <div key={index} className='degree'>
          {degree.title && <div className='name'>{degree.title}</div>}
          {degree.institution && (
            <div className='institution'>{degree.institution}</div>
          )}
          {degree.location && <div className='location'>{degree.location}</div>}
          {degree.date && <div className='date'>{degree.date}</div>}
          {degree.details && <div className='details'>{degree.details}</div>}
        </div>
      ))}
    </section>
  );
}
