import members from '../db/members.json'
import fuslieUser from '../db/fuslieUser.json'
import fuslieStreamLive from '../db/fuslieStreamLive.json'

export function getMembers() {
  return members;
}

export function getStreamer() {
  return fuslieUser;
}

export function getStream() {
  return fuslieStreamLive;
}