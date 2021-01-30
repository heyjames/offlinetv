import { Member } from './types';

/**
 * Pause code execution to simulate a slow API call.
 * Example: await pause(1);
 *
 * @param  {String}  milliseconds Time in milliseconds to pause code execution.
 * @return {Promise}
 */
export function pause(milliseconds: number) {
  return new Promise<void>(resolve => {
      setTimeout(() => { resolve() }, milliseconds);
  });
}

export function mySort(theArray: any[], prop1: any, prop2: any) {
    return theArray.sort(
      (a: any, b: any) => (a[prop1][prop2] > b[prop1][prop2]) ? -1 : 1
    );
}

export function sortMembers(members: Member[], online: boolean): Member[] {
  let isLive: Member[] = [];
  let notLiveNoLastSeen: Member[] = [];
  let notLivehasLastSeen: Member[] = [];

  // Get online members and sort by descending view count.
  if (online) {
    isLive = members.filter((member: Member) => member.stream.live === true);
    if (isLive.length > 1) mySort(isLive, "api", "viewers");
  }

  // Get offline members and sort by ascending alias.
  notLiveNoLastSeen = members.filter((member: Member) => {
    return member.stream.live === false && member.stream.last_stream_date === "";
  });
  notLiveNoLastSeen.sort((a, b) => {
    return (a.alias.toLowerCase() > b.alias.toLowerCase()) ? 1 : -1;
  });

  // Get offline members with a "last seen" date and sort by ascending age.
  notLivehasLastSeen = members.filter((member: Member) => {
    return member.stream.live === false && member.stream.last_stream_date !== "";
  });
  notLivehasLastSeen.sort((a, b) => {
    const compareA = new Date(a.stream.last_stream_date).getTime();
    const compareB = new Date(b.stream.last_stream_date).getTime();
    return (compareB < compareA) ? -1 : 1;
  });
  
  return [...isLive, ...notLivehasLastSeen, ...notLiveNoLastSeen];
}