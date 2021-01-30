import members from '../db/members.json'
import axios from 'axios';

export function getMembers() {
  return axios.get("http://localhost:3001/api/members");
}

export function getMembersOffline() {
  return members;
}