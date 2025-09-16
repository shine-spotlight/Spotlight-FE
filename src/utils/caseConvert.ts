// key 변환 유틸
const snakeToCamelKey = (k: string) =>
  k.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
const camelToSnakeKey = (k: string) =>
  k.replace(/[A-Z]/g, (c) => `_${c.toLowerCase()}`);

// 내부 재귀 (unknown 사용, 외부에서 제네릭으로 안전하게 감싸줌)
function _toCamelCase(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(_toCamelCase);
  if (obj instanceof Date) return obj;
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        snakeToCamelKey(k),
        _toCamelCase(v),
      ])
    );
  }
  return obj;
}

function _toSnakeCase(obj: unknown): unknown {
  if (Array.isArray(obj)) return obj.map(_toSnakeCase);
  if (obj instanceof Date) return obj;
  if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj as Record<string, unknown>).map(([k, v]) => [
        camelToSnakeKey(k),
        _toSnakeCase(v),
      ])
    );
  }
  return obj;
}

// snake_case -> camelCase
export function toCamelCase<TInput, TOutput>(input: TInput): TOutput {
  return _toCamelCase(input) as TOutput;
}

// camelCase -> snake_case
export function toSnakeCase<TInput, TOutput>(input: TInput): TOutput {
  return _toSnakeCase(input) as TOutput;
}
