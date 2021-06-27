const baseUrl = 'https://www.flickr.com/services/rest/';
const apiKey = process.env.REACT_APP_FLICKR_API_KEY;

export const getURL = (params: {[key: string]: string }) => {
  const searchParams = new URLSearchParams(params);

  return `${baseUrl}?api_key=${apiKey}&format=json&nojsoncallback=true&${searchParams.toString()}`;
}

