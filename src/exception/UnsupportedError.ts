export class UnsupportedError extends Error {
  constructor(message?: string, options?: ErrorOptions) {
    super(message, options);
  }
}
