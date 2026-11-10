const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

const parts = (value: string) => {
  const match = ISO_DATE.exec(value);

  if (!match) {
    throw new Error(`Expected a YYYY-MM-DD date, received ${value}`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])] as [
    number,
    number,
    number,
  ];
};

/** Calendar date in the local timezone, so the displayed day does not shift. */
export const parsePostDate = (value: string) => {
  const [year, month, day] = parts(value);
  return new Date(year, month - 1, day);
};

/** Noon UTC, so RSS keeps the calendar day in every timezone. */
export const rssDate = (value: string) => {
  const [year, month, day] = parts(value);
  return new Date(Date.UTC(year, month - 1, day, 12));
};

export const formatPostDate = (value: string) =>
  parsePostDate(value).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
