/* eslint-disable comma-dangle */
import { SiteClient } from 'datocms-client';

export default async function requestHandler(request, response) {
  if (request.method === 'POST') {
    const TOKEN = '68367e36fb4e5bd08352c9aad0c8ff';
    const client = new SiteClient(TOKEN);

    const record = await client.items.create({
      itemType: '972990', // model ID
      ...request.body
    });

    response.json({
      record,
    });

    return;
  }
  response.status(404).json({
    message: 'Rota GET não implementada.',
  });
}
