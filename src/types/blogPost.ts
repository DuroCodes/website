export interface BlogPost {
  url: string;
  frontmatter: {
    title: string;
    description: string;
    pubDate: string;
    readingTime: string;
    draft?: boolean;
  };
}
