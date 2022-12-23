const KEY = '31381634-1aa714b0129639c0faecef278';
export const getImagesApi = (query, page = 1, perPage = 12) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  )
    .then(res => res.json())
    .then(response => {
      return response.hits;
    });
};
