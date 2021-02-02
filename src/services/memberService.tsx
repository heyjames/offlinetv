import members from '../db/members.json'
import axios from 'axios';

export async function getMembers() {
  const { data: result } = await axios.get("http://localhost:3001/api/members");
  return result;
}

export function getMembersOffline() {
  return members;
}