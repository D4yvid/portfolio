import { EventEmitter } from "../event/EventEmitter";
import type { Seat } from "../seat/Seat";

export type WindowManagerEventMap = {
};

export class WindowManager extends EventEmitter<WindowManagerEventMap> {
  public readonly seat: Seat;

  public constructor(seat: Seat) {
    super();

    this.seat = seat;
  }

  public init() {
    this.seat.init();
  }

  public start() {
    const frameCallback = async () => {
      requestAnimationFrame(frameCallback);
    };

    requestAnimationFrame(frameCallback);
  }
}