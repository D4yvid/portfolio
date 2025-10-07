import { Surface } from "../surface/Surface";
import type { Optional } from "../types/Optional";
import { randomId } from "../util/Initializer";

/**
 * A buffer is the contents of a {@link Surface}.
 */
export abstract class Buffer {
  public readonly id: number = randomId();

  private _surface: Optional<Surface>;

  public attach(to: Optional<Surface>): void {
    this._surface = to;
  }

  public get surface() {
    return this._surface;
  }
}