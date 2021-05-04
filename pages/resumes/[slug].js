import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { getResumeBySlug, getAllResumes } from '../../lib/api';
import resumeMarkdownToObject from '../../lib/resumeMarkdownToObject';
import Resume from '../../components/resume';

export default function ResumePage({ resume }) {
  const router = useRouter();
  if (!router.isFallback && !resume?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return <Resume document={resume.content} />;
}

export async function getStaticProps({ params }) {
  const resume = getResumeBySlug(params.slug, ['slug', 'content']);
  const [content, _] = resumeMarkdownToObject(resume.content || '');

  return { props: { resume: { ...resume, content } } };
}

export async function getStaticPaths() {
  const resumes = getAllResumes(['slug']);
  const paths = resumes.map((resume) => ({
    params: { slug: resume.slug },
  }));

  return { paths, fallback: false };
}
