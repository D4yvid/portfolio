import { Keyboard, KeyModifier, type KeyState } from "./Keyboard";

export class DOMKeyboard extends Keyboard {
  public constructor() {
    super();
  }

  public init() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
    window.addEventListener('keypress', (event) => this.onKeyPress(event));
  }

  private keyStateFor(event: KeyboardEvent): Partial<KeyState> {
    let modifiers = 0x00;

    modifiers |= event.metaKey ? KeyModifier.META : 0;
    modifiers |= event.altKey ? KeyModifier.ALT : 0;
    modifiers |= event.shiftKey ? KeyModifier.SHIFT : 0;
    modifiers |= event.ctrlKey ? KeyModifier.CTRL : 0;

    return {
      keyboard: this,
      key: event.key,
      modifiers,
    } satisfies Partial<KeyState>;
  }

  private onKeyDown(event: KeyboardEvent) {
    let state = this.keyStateFor(event);

    state.event = 'key.down';

    this.emit('key.down', state as KeyState);
  }

  private onKeyUp(event: KeyboardEvent) {
    let state = this.keyStateFor(event);

    state.event = 'key.up';

    this.emit('key.up', state as KeyState);
  }

  private onKeyPress(event: KeyboardEvent) {
    let state = this.keyStateFor(event);

    state.event = 'key.pressed';

    this.emit('key.pressed', state as KeyState);
  }
}