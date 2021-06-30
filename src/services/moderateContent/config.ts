import { get } from '../api';

const baseUrl = 'https://api.moderatecontent.com/moderate/';
const key = process.env.REACT_APP_MODERATE_CONTENT_API_KEY || '';

export const getIsImageAppropriate = async (imageUrl: string, signal?: AbortSignal) => {
  const searchParams = new URLSearchParams({
    key,
    url: imageUrl,
  }).toString();

  try {
    const data = await get(`${baseUrl}?${searchParams}`, signal);
    return data.rating_label === 'everyone';
  } catch (error) {
    console.log('Error in Image Appropriation: ', error);
    throw error;
  }
}