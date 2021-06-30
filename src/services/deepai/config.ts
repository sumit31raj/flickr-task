import { post } from '../api';

const baseUrl = 'https://api.deepai.org/api/content-moderation';
const KEY = process.env.REACT_APP_DEEPAI_API_KEY || '';

const getFormData = (imageUrl: string) => {
  const formData = new FormData();
  formData.append('image', imageUrl);
  return formData;
}

export const getIsImageAppropriate = async (imageUrl: string, signal?: AbortSignal) => {
  const formData= getFormData(imageUrl);

  try {
    const data = await post(
      baseUrl,
      formData,
      { 'api-key': KEY },
      signal,
    );
    
    return data.output.nsfw_score < 0.8;
  } catch (error) {
    console.log('Error in Image Appropriation: ', error);
    throw error;
  }
}