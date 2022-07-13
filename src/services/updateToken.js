import axios from 'axios';
import { BASE_URL } from '../utils/config';

export default async function (body) {
  try {
    await axios.put(`${BASE_URL}/users/update-token`, body);
  } catch (error) {
    console.error(error);
  }
}
