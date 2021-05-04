import fs from 'fs';
import { join, extname } from 'path';
import matter from 'gray-matter';

const resumesDirectory = join(process.cwd(), '_resumes');

export function getResumeBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(resumesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const items = {};
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllResumes(fields = []) {
  const slugs = getResumeSlugs();
  const resumes = slugs.map((slug) => getResumeBySlug(slug, fields));
  return resumes;
}

export function getResumeSlugs() {
  return fs
    .readdirSync(resumesDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile && extname(dirent.name) === '.md')
    .map((dirent) => dirent.name);
}
