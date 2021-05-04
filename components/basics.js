export default function Basics({ name, content }) {
  return (
    <section id='basics'>
      <div id='name'>
        <div className='first-name'>{name.firstName}</div>
        <div className='last-name'>{name.lastName}</div>
      </div>
      <div id='career-title'>{content.title}</div>
      {content.location && <div id='location'>{content.location}</div>}
    </section>
  );
}
