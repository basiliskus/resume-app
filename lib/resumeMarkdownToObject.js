import fromMarkdown from 'mdast-util-from-markdown';
import toString from 'mdast-util-to-string';
import { visitParents } from 'unist-util-visit-parents';
import { select, selectAll } from 'unist-util-select';

const keyValueRegex = /(?<key>\w+):\s*(?<value>.+)/;
const experienceRegex = /(?<title>.+)\|(?<institution>.+)\|(?<date>.+)\|(?<location>.*)/;
const projectsRegex = /(?<name>.+)\|(?<date>.+)\|(?<type>.*)/;

const sections = {
  name: {
    parse: (str) => {
      const [firstName, lastName] = str.split(' ');
      return { firstName, lastName };
    },
  },
  basics: {
    parse: (lines) => {
      return parseKeyValueLines(lines);
    },
  },
  summary: {
    parse: (paragraphs) => {
      return paragraphs;
    },
  },
  skills: {
    parse: (lines) => {
      if (isKeyValueLine(lines[0])) {
        return parseKeyValueLines(lines);
      } else {
        return lines;
      }
    },
  },
  work: {
    parse: (line) => {
      return parseLine(line, experienceRegex);
    },
  },
  projects: {
    parse: (line) => {
      return parseLine(line, projectsRegex);
    },
  },
  education: {
    parse: (lines) => {
      return lines.map((line) => parseLine(line, experienceRegex));
    },
  },
};

export default function resumeMarkdownToObject(markdown) {
  const mdast = fromMarkdown(markdown);
  let resume = fromMdast(mdast);
  return [resume, mdast];
}

function fromMdast(mdast) {
  let heading = '';
  let currentKey = '';
  let currentObject = {};
  let depth = 0;
  let include = true;
  let resume = {
    name: '',
    basics: {},
    summary: [],
    skills: {},
    projects: [],
    work: [],
    education: [],
  };

  visitParents(mdast, (node, ancestors) => {
    if (node.type == 'heading') {
      heading = select('text', node).value;
      if (node.depth === 1) {
        // Name
        resume.name = sections.name.parse(heading);
        depth = 1;
      } else if (node.depth === 2) {
        currentKey = getKeyFromHeading(heading);
        include = true;
        depth = 2;
      } else if (node.depth === 3) {
        let parsedHeading = sections[currentKey].parse(heading);
        currentObject = { ...parsedHeading, include: include };
        resume[currentKey].push(currentObject);
        depth = 3;
      }
    } else if (node.type == 'paragraph') {
      if (ancestors.find((n) => n.type === 'list') || !heading) {
        return;
      }
      // const paragraph = select('text', node).value;
      const paragraph = toString(node);
      if (depth === 2) {
        resume[currentKey].push(paragraph);
      } else if (depth === 3) {
        (currentObject.content = currentObject.content || []).push(paragraph);
      }
    } else if (node.type == 'list') {
      const listItemNodes = selectAll('text', node);
      if (!listItemNodes || !heading) {
        return;
      }

      const items = listItemNodes.map((n) => n['value']);

      if (depth === 1) {
        // Basics
        resume.basics = sections.basics.parse(items);
      } else if (depth === 2) {
        resume[currentKey] = sections[currentKey].parse(items);
      } else if (depth === 3) {
        let i = resume[currentKey].indexOf(currentObject);
        currentObject = { ...currentObject, content: items };
        resume[currentKey][i] = currentObject;
      }
    } else if (node.type == 'html') {
      const includeRegex = /<!-- include: (?<include>\S+) -->/;
      let match = includeRegex.exec(node.value);
      if (!match) return;
      include = match.groups.include !== 'no';
    } else if (node.type == 'link') {
      return;
    }
  });

  return resume;
}

function parseLine(line, regex) {
  let match = regex.exec(line);
  if (!match) return null;
  const groups = match.groups;
  Object.keys(groups).forEach((k) => (groups[k] = groups[k].trim()));
  return match.groups;
}

function parseKeyValueLines(lines) {
  let obj = {};
  lines.forEach((line) => {
    const { key, value } = parseLine(line, keyValueRegex);
    obj[key.toLowerCase()] = value;
  });
  return obj;
}

function isKeyValueLine(line) {
  let match = keyValueRegex.exec(line);
  return !!match;
}

function getKeyFromHeading(heading) {
  return heading.split(' ')[0].toLowerCase();
}
