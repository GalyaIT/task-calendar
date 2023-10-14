import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { userQuery, userTasksQuery } from './utils/data';

export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2021-11-16',
  useCdn: false,
  token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);


export const getUser = async (id) => {
  const query = userQuery(id);
  try {
    const data = await client.fetch(query);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.msg);
  }
}

export const getTasks = async (id) => {
  const query = userTasksQuery(id);
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.log(error.msg);
  }
}

