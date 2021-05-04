import Header from './header';
import Basics from './basics';
import Skills from './skills';
import Contact from './contact';
import Summary from './summary';
import Work from './work';
import Education from './education';
import Projects from './projects';
import Footer from './footer';

export default function Resume({ document }) {
  return (
    <div id='resume'>
      <Header />
      <Basics name={document.name} content={document.basics} />
      <Contact content={document.basics} />
      <Summary content={document.summary} />
      <Skills content={document.skills} />
      <Work content={document.work} />
      {document.projects.length > 0 && <Projects content={document.projects} />}
      <Education content={document.education} />
      <Footer />
    </div>
  );
}
