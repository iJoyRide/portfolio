import { notion } from './client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getExperienceData() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EXPERIENCE_ID!,
  });

  const experiences = response.results
    .filter((item): item is PageObjectResponse => 'properties' in item)
    .map((item) => {
      const props = item.properties;

      const startDate =
        props.Start?.type === 'date' ? props.Start.date?.start : null;

      const endDate =
        props.End?.type === 'date' ? props.End.date?.start : null;

      return {
        id: item.id,
        position:
          props.Position.type === 'title'
            ? props.Position.title[0]?.plain_text ?? ''
            : '',
        company:
          props.Company.type === 'rich_text'
            ? props.Company.rich_text[0]?.plain_text ?? ''
            : '',
        description:
          props.Description.type === 'rich_text'
            ? props.Description.rich_text[0]?.plain_text ?? ''
            : '',
        start: startDate,
        end: endDate,
      };
    });

  // ✅ Sort: Present first, then descending by end date
  return experiences.sort((a, b) => {
    if (!a.end && b.end) return -1; // a is ongoing, comes first
    if (a.end && !b.end) return 1;  // b is ongoing, comes first

    if (a.end && b.end) {
      return new Date(b.end).getTime() - new Date(a.end).getTime();
    }

    return 0; // both null
  });
}
