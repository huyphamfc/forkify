const TIMEOUT_SEC = import.meta.env.VITE_TIMEOUT_SEC;

const timeout = (time: number): Promise<PromiseRejectedResult> =>
  new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${time} second.`));
    }, time * 1000);
  });

export const getJSON = async (url: string) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    if (res instanceof Response) {
      const result = await res.json();
      return result;
    }
  } catch (err) {
    throw err;
  }
};
