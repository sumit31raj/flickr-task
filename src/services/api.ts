export const get = async (url: string) => {
  try {
    const response = await fetch(url);
    const data = response.json();
    return data;
  } catch (error) {
    console.log('Got error in Get request:');
    console.log('URL:', url);
    return error;
  }
}
