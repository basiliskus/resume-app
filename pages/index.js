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
              {resume.slug}:&nbsp;
              <Link
                href='/resumes/[document]/[slug]'
                as={`/resumes/html/${resume.slug}`}
              >
                <a>html</a>
              </Link>
              ,&nbsp;
              <Link
                href='/resumes/[document]/[slug]'
                as={`/resumes/pdf/${resume.slug}`}
              >
                <a>pdf</a>
              </Link>
              ,&nbsp;
              <Link
                href='/resumes/[document]/[slug]'
                as={`/resumes/md/${resume.slug}`}
              >
                <a>md</a>
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
