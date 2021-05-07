import homeStyles from '../styles/globals.css?type=global';
import resumeStyles from '../styles/globals.resume.css?type=global';

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
