export const get = async (url: string, signal?: AbortSignal) => {
  try {
    const response = await fetch(url, { signal });
    const data = response.json();
    return data;
  } catch (error) {
    console.log('Got error in Get request:');
    console.log('URL:', url);
    throw error;
  }
}

export const post = async (
  url: string,
  body: any,
  headers: {[key: string ] : string},
  signal?: AbortSignal,
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
      signal,
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Got error in Post request:');
    console.log('URL:', url);
    throw error;
  }
}

