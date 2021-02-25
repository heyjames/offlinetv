import React from 'react';
import DetailsOnline from './detailsOnline';
import DetailsOffline from './detailsOffline';
import { Member } from '../types';

export interface DetailsProps {
  live: boolean,
  member: Member
}
 
const Details: React.FC<DetailsProps> = ({ member, live }) => {
  if (live === true) return <DetailsOnline member={member} />
  
  return <DetailsOffline member={member} />
}
 
export default Details;