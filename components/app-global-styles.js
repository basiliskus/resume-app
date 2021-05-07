import homeStyles from '../styles/globals.scss?type=global';
import resumeStyles from '../styles/globals.resume.scss?type=global';

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
