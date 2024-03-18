export function assert(condition: unknown, error: string | Error): asserts condition {
  if (!condition) {
    throw error instanceof Error ? error : new Error(error);
  }
}
