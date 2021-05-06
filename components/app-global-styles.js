import homeStyles from '../styles/globals.css';
import resumeStyles from '../styles/globals.resume.css';

export default function AppStyles({ isResume }) {
  if (isResume) {
    return (
      <style jsx global>
        {resumeStyles}
      </style>
    );
  } else {
    return (
      <style jsx global>
        {homeStyles}
      </style>
    );
  }
}
