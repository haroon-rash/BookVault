/**
 * Lightweight app logger — info/warn/error in all envs, debug in development only.
 */

type LogMeta = Record<string, unknown>;

function write(
  level: "info" | "warn" | "error" | "debug",
  scope: string,
  message: string,
  meta?: LogMeta
) {
  const tag = `[${scope}]`;
  const payload = meta ? { ...meta } : undefined;

  switch (level) {
    case "info":
      console.info(tag, message, payload ?? "");
      break;
    case "warn":
      console.warn(tag, message, payload ?? "");
      break;
    case "error":
      console.error(tag, message, payload ?? "");
      break;
    case "debug":
      if (process.env.NODE_ENV === "development") {
        console.debug(tag, message, payload ?? "");
      }
      break;
  }
}

/** Central logger used across server modules */
export const logger = {
  /** General flow messages (startup, success paths) */
  info: (scope: string, message: string, meta?: LogMeta) =>
    write("info", scope, message, meta),

  /** Recoverable issues */
  warn: (scope: string, message: string, meta?: LogMeta) =>
    write("warn", scope, message, meta),

  /** Failures and exceptions */
  error: (scope: string, message: string, meta?: LogMeta) =>
    write("error", scope, message, meta),

  /** Verbose details — dev only */
  debug: (scope: string, message: string, meta?: LogMeta) =>
    write("debug", scope, message, meta),
};
