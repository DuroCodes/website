import { toString } from 'mdast-util-to-string';
import readingTime from 'reading-time';

export const remarkReadingTime = () => {
  return (tree, { data }) => {
    const textOnPage = toString(tree);
    const readTime = readingTime(textOnPage);

    data.astro.frontmatter.readingTime = readTime.text;
  };
};
