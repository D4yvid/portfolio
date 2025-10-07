import { UnsupportedError } from "../exception/UnsupportedError";
import { Vector2 } from "../math/Vector";
import { Renderer } from "../renderer/Renderer";
import { SoftwareRenderer } from "../renderer/SoftwareRenderer";
import type { Optional } from "../types/Optional";
import { logger } from "../util/Logger";
import type { Display } from "./Display";

export class CanvasDisplay implements Display {
  private readonly canvas: HTMLCanvasElement;

  private _renderer: Optional<Renderer> = null;
  private _resolution = Vector2.ZERO;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  public init() {
    let context = this.canvas.getContext('2d', { alpha: true });;

    logger.warn("WebGL is not supported (or not implemented yet)! Fallbacking to 2d rendering");

    if (!context) {
      throw new UnsupportedError("Your computer doesn't support any kind of rendering on canvases!");
    }

    this._renderer = new SoftwareRenderer(context);
    window.onresize = () => this.onResize();

    // Trigger a manual resize of the canvas
    this.onResize();
  }

  public get renderer(): Renderer {
    return this._renderer!;
  }

  public get resolution(): Vector2 {
    return this._resolution;
  }

  private onResize() {
    const [width, height] = [window.innerWidth, window.innerHeight];

    this.canvas.width = width;
    this.canvas.height = height;

    this.renderer.resize(width, height);
  }
}
