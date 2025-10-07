import type { Optional } from "../types/Optional";
import { Mouse, MouseButton, type MouseEventMap, type MouseState } from "./Mouse";

export class DOMMouse extends Mouse {
  private previousState: Optional<MouseState>;

  public constructor() {
    super();
  }

  public init(): void {
    window.addEventListener('mousemove', e => this.onMouseMove(e));
    window.addEventListener('mousedown', e => this.onMouseDown(e));
    window.addEventListener('mouseup', e => this.onMouseUp(e));
    window.addEventListener('contextmenu', e => this.onContextMenu(e));
  }

  private mouseStateFor(event: keyof MouseEventMap, browserEvent: MouseEvent): MouseState {
    let button = 0x00;

    if (browserEvent.buttons & 1) {
      button |= MouseButton.PRIMARY;
    }

    if (browserEvent.buttons & 2) {
      button |= MouseButton.ACTION;
    }

    if (browserEvent.buttons & 4) {
      button |= MouseButton.MIDDLE;
    }

    if (browserEvent.buttons & 8) {
      button |= MouseButton.EXTRA_BACK;
    }

    if (browserEvent.buttons & 8) {
      button |= MouseButton.EXTRA_FORWARD;
    }

    if ((event == 'button.up' || event == 'button.down') && this.previousState) {
      // Emit only the changed button for up and down events. Motion should contain all pressed currently
      button ^= this.previousState.button;
    }

    const state = {
      mouse: this,
      event,
      button,
      dx: browserEvent.movementX,
      dy: browserEvent.movementY,
    };

    this.previousState = state;

    return state;
  }

  private onMouseDown(event: MouseEvent) {
    this.emit('button.down', this.mouseStateFor('button.down', event));
  }

  private onMouseUp(event: MouseEvent) {
    this.emit('button.up', this.mouseStateFor('button.up', event));
  }

  private onMouseMove(event: MouseEvent) {
    this.emit('motion', this.mouseStateFor('motion', event));
  }

  private onContextMenu(event: MouseEvent) {
    // Hide context menu when action button is pressed
    event.preventDefault();
  }
}