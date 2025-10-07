import { Vector2 } from "../math/Vector";
import { logger } from "../util/Logger";
import { Renderer } from "./Renderer";

export class SoftwareRenderer extends Renderer<CanvasRenderingContext2D> {
  public constructor(context: CanvasRenderingContext2D) {
    super(context);
  }

  public init(): void {
    this.clearScreen();
  }

  public resize(width: number, height: number): void {
    logger.info(`Renderer resized: ${width}x${height}`);
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.context;
  }

  private clearRegion(pos: Vector2, size: Vector2) {
    this.ctx.clearRect(pos.x, pos.y, size.x, size.y);
  }

  private clearScreen() {
    this.clearRegion(Vector2.ZERO, Vector2.INFINITY);
  }
}

