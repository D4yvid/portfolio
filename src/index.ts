import { CanvasDisplay } from "./display/CanvasDisplay";
import { NotFoundError } from "./exception/NotFoundError";
import { DOMKeyboard } from "./keyboard/DOMKeyboard";
import { DOMMouse } from "./mouse/DOMMouse";
import { Seat } from "./seat/Seat";
import { WindowManager } from "./wm/WindowManager";

function globalErrorHandler(error: Error) {
  const NOTICE = `If you want to debug this, please type 'yes' down. Otherwise, the page will reload.`;

  const errorName = Object.getPrototypeOf(error).name;
  const result = prompt(`FATAL: ${errorName}: ${error.message}.\n${NOTICE}`);

  if (result === 'yes') {
    return;
  }

  window.location.reload();
}

async function main() {
  const canvas = document.querySelector<HTMLCanvasElement>("canvas.display");

  if (!canvas) {
    throw new NotFoundError("The display canvas was not found.");
  }

  const display = new CanvasDisplay(canvas);
  const keyboard = new DOMKeyboard();
  const mouse = new DOMMouse();

  const seat = new Seat(display, keyboard, mouse);

  const wm = new WindowManager(seat);

  wm.init();
  wm.start();
}

main().catch(globalErrorHandler);
