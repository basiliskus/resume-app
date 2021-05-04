import packageJson from '/package.json';

export default function Footer() {
  return (
    <footer>
      <div>Resume App v{packageJson.version}</div>
    </footer>
  );
}
