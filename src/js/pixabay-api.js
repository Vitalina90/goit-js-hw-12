import axios from 'axios';

const API_KEY = '49652753-628f6ab7e356d597b0d2f9b26';

let per_page = 15;

export const fetchImages = async (searchText, page) => {
  try {
    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchText,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: per_page,
        page: page,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
