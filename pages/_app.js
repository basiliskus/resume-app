import { useRouter } from 'next/router';

import AppStyles from '../components/app-global-styles';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isResume = router.pathname.startsWith('/resumes');

  return (
    <>
      <Component {...pageProps} />
      <AppStyles isResume={isResume} />
    </>
  );
}
