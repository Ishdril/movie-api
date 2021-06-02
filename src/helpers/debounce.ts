/**
 * Debounce function for delayed API calls. Returns a promise that will resolve to a Timeout. If the function is called again before
 * the waitfor timer runs off, it will cancel the previous callback and reset the timer.
 * As a result, the callback is only called once at the end of the transactions.
 *
 * Used to edit fields and only send the result information once to the API, not every time that onChange fires.
 *
 * @param func - callback function after delay
 * @param waitFor - delay in miliseconds before executing the function.
 */

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<F>): Promise<ReturnType<F>> =>
    new Promise(resolve => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
};
