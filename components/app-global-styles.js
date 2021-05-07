import homeStyles from '../styles/css/globals.css?type=global';
import resumeStyles from '../styles/css/globals.resume.css?type=global';

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
