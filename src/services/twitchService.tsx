import axios from 'axios';

export function getMyAPI() {
  return axios.get("http://localhost:3001/api/members");
}