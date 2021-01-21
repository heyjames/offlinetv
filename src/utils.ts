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