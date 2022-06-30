import axios from 'axios';

export default async function (body) {
  try {
    await axios.put('http://localhost:3001/api/users/update-token', body);
  } catch (error) {
    console.error(error);
  }
}
