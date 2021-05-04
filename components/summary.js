export default function Summary({ content }) {
  return (
    <section id='summary'>
      <h2>Summary</h2>
      <div>
        {content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
