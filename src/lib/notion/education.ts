import { notion } from './client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getEducationData() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EDUCATION_ID!,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  });

  return response.results
    .filter((item): item is PageObjectResponse => 'properties' in item)
    .map((item) => {
      const props = item.properties;

      return {
        id: item.id,
        institution:
          props.Institution.type === 'title'
            ? props.Institution.title[0]?.plain_text ?? ''
            : '',
        degree:
          props.Degree.type === 'rich_text'
            ? props.Degree.rich_text[0]?.plain_text ?? ''
            : '',
        description:
          props.Description?.type === 'rich_text'
            ? props.Description.rich_text[0]?.plain_text ?? ''
            : '',
      };
    });
}
