import axios from 'axios';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
// const acceptLink = "application/vnd.twitchtv.v5+json";
const OAUTH_TOKEN = process.env.REACT_APP_OAUTH_TOKEN;

const TwitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/helix/",
  headers: {
    "Client-ID": CLIENT_ID,
    "Authorization": "Bearer " + OAUTH_TOKEN
  }
});

export async function getStreamer(id: any) {
  return TwitchAPI.get(`users?id=${id}`);
};

export async function getStream(id: any) {
  return TwitchAPI.get(`streams?user_id=${id}&first=1`);
};