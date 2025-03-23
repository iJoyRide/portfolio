import { notion } from './client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

export async function getProjectsData() {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_PROJECTS_ID!,
    sorts: [{ timestamp: 'created_time', direction: 'descending' }],
  });

  return response.results
    .filter((item): item is PageObjectResponse => 'properties' in item)
    .map((item) => {
      const props = item.properties;

      const stack =
        props.Stack?.type === 'multi_select'
          ? props.Stack.multi_select.map((tag) => ({
              name: tag.name,
              color: tag.color,
            }))
          : [];

      return {
        id: item.id,
        name:
          props.Name?.type === 'title'
            ? props.Name.title[0]?.plain_text ?? ''
            : '',
        stack,
        description:
          props.Description?.type === 'rich_text'
            ? props.Description.rich_text[0]?.plain_text ?? ''
            : '',
      };
    });
}
