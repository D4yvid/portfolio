import type { Display } from "../display/Display";
import type { Keyboard } from "../keyboard/Keyboard";
import type { Mouse } from "../mouse/Mouse";

// TODO: use multiple browser windows as multiple seats (multiple monitor support)
export class Seat {

  public readonly display: Display;
  public readonly keyboard: Keyboard;
  public readonly mouse: Mouse;

  constructor(display: Display, keyboard: Keyboard, mouse: Mouse) {
    this.display = display;
    this.keyboard = keyboard;
    this.mouse = mouse;
  }

  public init() {
    this.keyboard.init();
    this.mouse.init();
    this.display.init();
  }

}