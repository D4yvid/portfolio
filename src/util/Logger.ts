enum LogLevel {
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  TRACE = 'trace'
}

class Logger {
  private log(level: LogLevel, message: string) {
    console.log(`%c${level}%c ${message}`, this.styleOf(level), 'color: inherit');
  }

  private styleOf(level: LogLevel) {
    const style: Record<string, string> = {
      'padding': '2px 4px',
      'border-radius': '4px'
    };

    switch (level) {
      case LogLevel.INFO:
        style.background = '#5050f4ff';
        break;

      case LogLevel.WARN:
        style.background = '#f4e450ff';
        style.color = '#000000';
        break;

      case LogLevel.ERROR:
        style.background = '#f45050ff';
        style.color = '#000000';
        break;

      case LogLevel.TRACE:
        style.background = '#2e2e2eff';
        break;
    }

    return Object.entries(style)
      .map(([key, value]) => `${key}: ${value}`)
      .join(';');
  }

  public info(...args: any[]) {
    return this.log(LogLevel.INFO, args.map(String).join(' '));
  }

  public warn(...args: any[]) {
    return this.log(LogLevel.WARN, args.map(String).join(' '));
  }

  public err(...args: any[]) {
    return this.log(LogLevel.ERROR, args.map(String).join(' '));
  }

  public trace(...args: any[]) {
    return this.log(LogLevel.TRACE, args.map(String).join(' '));
  }
}

export const logger: Logger = new Logger();
