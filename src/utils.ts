/**
 * Pause code execution to simulate a slow API call.
 * Example: await pause(1);
 *
 * @param  {String}  seconds Time in seconds to pause code execution.
 * @return {Promise}
 */
export function pause(seconds: any) {
  return new Promise<void>(resolve => {
      setTimeout(() => { resolve() }, seconds * 1000);
  });
}

export function mySort(theArray: Array<any>, prop1: any, prop2: any) {
    return theArray.sort(
      (a: any, b: any) => (a[prop1][prop2] > b[prop1][prop2]) ? -1 : 1
    );
}