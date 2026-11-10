import { formatPostDate } from "../util/dates";

export interface Props {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  url: string;
}

const Blog = ({
  title,
  description,
  date,
  url,
  readingTime,
}: Props) => {
  return (
    <a
      href={url}
      rel="prefetch"
      className="flex flex-col gap-y-3 hover:(no-underline bg-neutral-800) p-4 mb-8 transition-colors rounded-xl"
    >
      <h3 className="text-(themeMain xl) md:text-2xl font-extrabold">
        {title}
      </h3>

      <p className="text-sm md:text-base font-medium">{description}</p>

      <div className="flex items-center gap-x-2 text-(neutral-200 xs) md:text-sm font-medium">
        <time dateTime={date}>{formatPostDate(date)}</time>

        <span>•</span>

        <span>{readingTime}</span>
      </div>
    </a>
  );
};

export default Blog;
