const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parts(value: string): [number, number, number] {
  const match = ISO_DATE.exec(value);

  if (!match) {
    throw new Error(`Expected a YYYY-MM-DD date, received ${value}`);
  }

  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

/** Calendar date in the local timezone, so the displayed day does not shift. */
export function parsePostDate(value: string): Date {
  const [year, month, day] = parts(value);
  return new Date(year, month - 1, day);
}

/** Noon UTC, so RSS keeps the calendar day in every timezone. */
export function rssDate(value: string): Date {
  const [year, month, day] = parts(value);
  return new Date(Date.UTC(year, month - 1, day, 12));
}

export function formatPostDate(value: string): string {
  return parsePostDate(value).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
