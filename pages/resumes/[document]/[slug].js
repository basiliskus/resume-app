import { useRouter } from 'next/router';
import ErrorPage from 'next/error';

import { getResumeBySlug, getAllResumes } from '../../../lib/api';
import resumeMarkdownToObject from '../../../lib/resumeMarkdownToObject';
import resumeHtmlToPdf from '../../../lib/resumeHtmlToPdf';
import Resume from '../../../components/resume';

export default function ResumePage({ resume, document }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!router.isFallback && !resume?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  if (document === 'md') {
    return <pre>{resume.content}</pre>;
  }

  return <Resume document={resume.content} />;
}

export async function getStaticProps({ params }) {
  const resume = getResumeBySlug(params.slug, ['slug', 'content']);

  if (params.document === 'md') {
    return { props: { resume, document: params.document } };
  }

  const [content, _] = resumeMarkdownToObject(resume.content || '');

  if (params.document === 'pdf') {
    await resumeHtmlToPdf(<Resume document={content} />, params.slug);
    return {
      redirect: { destination: `/pdfs/${params.slug}.pdf`, permanent: false },
    };
  }

  return {
    props: { resume: { ...resume, content }, document: params.document },
  };
}

export async function getStaticPaths() {
  const resumes = getAllResumes(['slug']);
  const documentTypes = ['html', 'pdf', 'md'];
  let paths = [];
  resumes.forEach((resume) => {
    documentTypes.forEach((document) =>
      paths.push({ params: { slug: resume.slug, document: document } })
    );
  });

  return { paths, fallback: true };
}
