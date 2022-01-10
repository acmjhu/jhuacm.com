import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export const parseMarkdown = async (md) => {
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(md);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return contentHtml;
};
