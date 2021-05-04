import packageJson from '/package.json';

export default function HomeFooter() {
  return (
    <footer>
      <div>Resume App v{packageJson.version}</div>
    </footer>
  );
}
