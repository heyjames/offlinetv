import members from '../db/members.json'
import axios from 'axios';

export async function getMembers() {
  const { data: result } = await axios.get(process.env.REACT_APP_API_URL);
  return result;
}

export function getMembersOffline() {
  return members;
}