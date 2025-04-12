import axios from 'axios';

const API_KEY = '49652753-628f6ab7e356d597b0d2f9b26';
let per_page = 15;
// getImagesByQuery(query, page);
// fetchImages = async(searchText, page);
export const getImagesByQuery = async (query, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error fetching images:', error);
    return [];
  }
};
