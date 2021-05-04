export default function Contact({ content }) {
  return (
    <section id='contact'>
      {content.phone && <div id='phone'>{content.phone}</div>}
      {content.email && <div id='email'>{content.email}</div>}
      {content.linkedin && <div id='linkedin'>{content.linkedin}</div>}
      {content.github && <div id='github'>{content.github}</div>}
    </section>
  );
}
