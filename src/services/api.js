import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '26390614-440d4a1ea806ddcf9832f9246',
    page: 1,
    per_page: 12,
  },
});

export const getImages = async (query, page = 1) => {
  const { data } = await instance.get('', {
    params: {
      q: query,
      page: page,
    },
  });
  console.log(data);
  return data;
};
