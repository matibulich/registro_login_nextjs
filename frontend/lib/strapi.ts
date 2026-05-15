import qs from 'qs'

export const BASE_URL = 'http://127.0.0.1:1337';

// Strapi v4 expects relational/dynamic-zone expansion via `populate` in the querystring,

const QUERY_HOME_PAGE = {
  populate: {
    sections: {
      populate: '*',
    },
  },
};


export async function getHomePage(){
  'use cache'

  const query = qs.stringify(QUERY_HOME_PAGE, { encodeValuesOnly: true })
  const response= getStrapiData(`/api/home-page?${query}`)
 return response
 
}

export async function getStrapiData(url: string){

try
  {    const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
  const body = await response.text();
  throw new Error(`Strapi error ${response.status} ${response.statusText} | ${response.url} | ${body}`);
}
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2)) // Log the entire response data;
     return data
  } catch (error) {
    console.error('Error al traer informacion de strapi:', error);
    throw error;
  } 
 
}

export async function RegisterUserService(userData:object) {
  const url = `${BASE_URL}/api/auth/local/register`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const text = await response.text();
    const json = text ? JSON.parse(text) : null;

    if (!response.ok) {
      return {
        error: {
          status: response.status,
          message: json?.error?.message ?? response.statusText,
          details: json?.error?.details ?? json,
        },
      };
    }

    console.log('User registered successfully:', json);
    return { data: json };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      error: {
        status: 0,
        message: error instanceof Error ? error.message : 'Unknown error',
        details: null,
      },
    };
  }
}

export async function LoginUserService(userData:object) {
  const url = `${BASE_URL}/api/auth/local`; 

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Strapi error ${response.status} ${response.statusText} | ${response.url} | ${body}`);
    }

    const data = await response.json();
    console.log('User logged in successfully:', data);
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
}