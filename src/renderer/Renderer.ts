import { UnsupportedError } from "../exception/UnsupportedError";

export abstract class Renderer<ContextType = RenderingContext> {
  protected readonly context: ContextType;

  protected constructor(context: ContextType) {
    this.context = context;
  }

  abstract init(): void;
  abstract resize(width: number, height: number): void;
}