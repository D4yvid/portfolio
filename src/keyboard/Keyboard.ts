import { EventEmitter } from "../event/EventEmitter";

export type KeyboardEventMap = {
  'key.down': (state: KeyState) => void;
  'key.up': (state: KeyState) => void;
  'key.pressed': (state: KeyState) => void;
};

export enum KeyModifier {
  CTRL = 0x01,
  ALT = 0x02,
  SHIFT = 0x04,
  META = 0x08
}

export interface KeyState {
  event: keyof KeyboardEventMap;
  keyboard: Keyboard;

  key: string;
  modifiers: number;
}

export abstract class Keyboard extends EventEmitter<KeyboardEventMap> {

  public abstract init(): void;

}