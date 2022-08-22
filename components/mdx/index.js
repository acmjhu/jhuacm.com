import { MDXProvider } from '@mdx-js/react';
import { Heading } from './heading';
import { ListFamily } from './list';
import { Blockquote } from './blockquote';
import { Text } from './text';
import { Anchor } from './anchor';
import { Code } from './code';

const { H1, H2, H3 } = Heading;
const { List, OrderedList, ListItem } = ListFamily;

const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  ul: List,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  p: Text,
  a: Anchor,
  code: Code,
};

export const Post = ({ children, ...props }) => {
  return (
    <MDXProvider components={components}>
      <main {...props}>{children}</main>
    </MDXProvider>
  );
};

export default Post;
