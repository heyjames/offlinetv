import axios from 'axios';

const client_id = process.env.REACT_APP_TWITCH_KEY;
const acceptLink = "application/vnd.twitchtv.v5+json";

const TwitchAPI = axios.create({
  baseURL: "https://api.twitch.tv/kraken/",
  headers: {
    "Client-ID": client_id,
    Accept: acceptLink
  }
});

export async function getStreamer(id: any) {
  const response = await TwitchAPI.get(`users/${id}`);
  return response.data;
};

export async function getStream(id: any) {
  const response = await TwitchAPI.get(`streams/${id}`);
  return response.data.stream;
};