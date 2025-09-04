import axios from 'axios';

export const fetchAirportsData = async () => {
  try {
    const response = await axios.get('https://dir.aviapages.com/api/airports/', {
      headers: {
        Authorization: 'Token WJUeXU8O6sj9YLoYJX7zeV4w92u2OAnkMqDy',
      },
    });
    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      throw new Error('An error occurred, please try again later');
    }
  }
};