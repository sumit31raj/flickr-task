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

export const post = async (
  url: string,
  body: any,
  headers: {[key: string ] : string},
  signal?: AbortSignal,
) => {
  try {
    const response = await fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers,
      body,
      signal,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Got error in Get request:');
    console.log('URL:', url);
    return error;
  }
}

