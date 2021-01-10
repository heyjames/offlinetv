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