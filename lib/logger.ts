// lib/logger.ts
type LogLevel = 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

const LOG_ENDPOINT = '/api/log';

async function sendLog(entry: LogEntry) {
  try {
    await fetch(LOG_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(entry),
    });
  } catch {
    // jangan ganggu user jika log gagal
  }
}

export const logger = {
  info(message: string, data?: Record<string, unknown>) {
    sendLog({ level: 'info', message, data, timestamp: new Date().toISOString() });
  },
  warn(message: string, data?: Record<string, unknown>) {
    sendLog({ level: 'warn', message, data, timestamp: new Date().toISOString() });
  },
  error(message: string, data?: Record<string, unknown>) {
    sendLog({ level: 'error', message, data, timestamp: new Date().toISOString() });
  }
};