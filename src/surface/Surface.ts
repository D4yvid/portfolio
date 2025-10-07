import type { Display } from "../display/Display";

/**
 * A surface is an image, that can be from a window, a texture, or another content that can be displayed into a display.
 * You need to create a surface from a display, but the surface can be rendered on other displays (depending on the implementation of it.)
 * 
 * See {@link Display}.
 */
export abstract class Surface {
}