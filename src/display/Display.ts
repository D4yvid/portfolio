import type { Renderer } from "../renderer/Renderer";

export interface Display {
  /**
   * Initializes the display
   */
  init(): void;

  /**
   * Get the available renderer for this display.
   */
  get renderer(): Renderer;
}
