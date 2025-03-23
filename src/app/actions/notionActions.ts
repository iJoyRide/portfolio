'use server';

import { notion } from '@/lib/notion';

export async function addExperience(formData: FormData) {
  const position = formData.get('position')?.toString();
  const company = formData.get('company')?.toString();
  const description = formData.get('description')?.toString();

  if (!position || !company) return;

  await notion.pages.create({
    parent: {
      database_id: process.env.NOTION_DATABASE_ID!,
    },
    properties: {
      Position: {
        title: [{ text: { content: position } }],
      },
      Company: {
        rich_text: [{ text: { content: company } }],
      },
      Description: {
        rich_text: [{ text: { content: description ?? '' } }],
      },
    },
  });
}
