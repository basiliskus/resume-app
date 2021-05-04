import Link from 'next/link';

import { getAllResumes } from '../lib/api';
import Layout from '../components/layout';

export default function Index({ allResumes }) {
  return (
    <Layout>
      {allResumes.length > 0 ? (
        <ul className='resumes'>
          {allResumes.map((resume, index) => (
            <li key={index}>
              <Link as={`/resumes/${resume.slug}`} href='/resumes/[slug]'>
                <a>{resume.slug}</a>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className='resumes'>No resumes found</div>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const allResumes = getAllResumes(['slug']);

  return {
    props: { allResumes },
  };
}
