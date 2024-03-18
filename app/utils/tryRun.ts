export async function tryRun<T extends Promise<unknown>>(
  promise: T
): Promise<
  | {
      data: Awaited<T>;
      error: undefined;
    }
  | {
      data: undefined;
      error: Error;
    }
> {
  try {
    const val = await promise;
    return {
      data: val,
      error: undefined,
    };
  } catch (e) {
    return {
      data: undefined,
      error: e as Error,
    };
  }
}
