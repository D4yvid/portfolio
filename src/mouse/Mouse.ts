import { EventEmitter } from "../event/EventEmitter";

export enum MouseButton {
  PRIMARY = 0x01,
  ACTION = 0x02,
  MIDDLE = 0x04,
  EXTRA_BACK = 0x08,
  EXTRA_FORWARD = 0x10
}

export interface MouseState {
  event: keyof MouseEventMap;
  mouse: Mouse;

  dx: number;
  dy: number;
  button: number;
}

export type MouseEventMap = {
  'motion': (state: MouseState) => void;
  'button.down': (state: MouseState) => void;
  'button.up': (state: MouseState) => void;
};

export abstract class Mouse extends EventEmitter<MouseEventMap> {
  public abstract init(): void;
}