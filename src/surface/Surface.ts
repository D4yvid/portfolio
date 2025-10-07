import type { Buffer } from "../buffer/Buffer";
import type { Display } from "../display/Display";
import { EventEmitter } from "../event/EventEmitter";
import type { Optional } from "../types/Optional";
import { randomId } from "../util/Initializer";

export type SurfaceEventMap = {
  'frame.requested': (surface: Surface) => void;
};

/**
 * A surface is an image, that can be from a window, a texture, or another content that can be displayed into a display.
 * You need to create a surface from a display, but the surface can be rendered on other displays (depending on the implementation of it.)
 * 
 * See {@link Display}.
 */
export abstract class Surface extends EventEmitter<SurfaceEventMap> {
  public readonly id: number = randomId();
  public readonly display: Display;

  private buffer: Optional<Buffer>;

  private requestedFrame: boolean = false;
  private inFrameRequestedCallback: boolean = false;

  private commited: boolean = false;

  public constructor(display: Display) {
    super();

    this.display = display;
  }

  /**
   * Attach a buffer to this surface. When this is in the `frame.requested` event callback, this is 
   * 
   * @param buffer The buffer to attach this surface into
   */
  public attachBuffer(buffer: Optional<Buffer>) {
    if (!this.requestedFrame) {
      // An frame was not requested, cannot change the buffer of this surface
      return;
    }

    this.buffer?.attach(null);

    this.buffer = buffer;

    buffer?.attach(this);
  }

  /** Commit the update of a surface into the current display */
  public commit() {
    if (!this.requestedFrame && !this.inFrameRequestedCallback) {
      // A frame was not requested, cannot commit without a frame request
      return;
    }

    if (this.commited)
      // The frame was already commited, or is trying to re-send the same buffer
      return;

    this.commited = true;

    // The next frame is not requested now, as it was already commited, so allow the user to request another
    this.requestedFrame = false;
  }

  /** Request a new frame to be drawn. When the compositor is ready, it will emit the `frame.requested` event. */
  public requestFrame() {
    if (this.requestedFrame && !this.inFrameRequestedCallback) {
      // An frame was already requested
      return;
    }

    this.requestedFrame = true;
  }

  public async emit<
    Event extends keyof SurfaceEventMap,
    Params extends Parameters<SurfaceEventMap[Event]> = Parameters<SurfaceEventMap[Event]>
  >(event: Event, ...args: Params): Promise<void> {
    if (event == 'frame.requested' && !this.requestedFrame || this.inFrameRequestedCallback)
      return;

    if (event == 'frame.requested') {
      this.inFrameRequestedCallback = true;

      // Allow for a next commit of a frame
      this.commited = false;
    }

    await super.emit(event, ...args);

    if (event == 'frame.requested') {
      this.inFrameRequestedCallback = false;
    }
  }

  public get currentBuffer() {
    return this.buffer;
  }
}