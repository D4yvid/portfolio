import { logger } from "../util/Logger";
import { Renderer } from "./Renderer";

export interface WebGLRendererOptions {
  version: 1 | 2;
}

type ContextType<T extends { version: 1 | 2 }> = T['version'] extends 2 ? WebGL2RenderingContext : WebGLRenderingContext;

export class WebGLRenderer extends Renderer<WebGL2RenderingContext | WebGLRenderingContext> {
  public readonly options: WebGLRendererOptions;

  constructor(
    context: WebGLRenderingContext | WebGL2RenderingContext,
    options: WebGLRendererOptions
  ) {
    super(context);

    this.options = options;
  }

  public init(): void {
    logger.info("WebGL Renderer initialized", "version:", this.version);
  }

  public resize(width: number, height: number): void {
    logger.info(`GL resized: ${width}x${height}`);

    this.gl.viewport(0, 0, width, height);
  }

  private get gl(): this['version'] extends 2 ? WebGL2RenderingContext : WebGLRenderingContext {
    return this.context as ContextType<this>;
  }

  get version(): 1 | 2 {
    return this.options.version;
  }

}
