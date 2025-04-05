import {
  MouseSensor as DndKitMouseSensor,
  TouchSensor as DndKitTouchSensor,
  MouseSensorOptions,
  TouchSensorOptions,
} from '@dnd-kit/core';

// Định nghĩa kiểu hàm cho `handler`
type MouseHandlerType = (
  { nativeEvent }: { nativeEvent: MouseEvent },
  options: MouseSensorOptions
) => boolean;

type TouchHandlerType = (
  { nativeEvent }: { nativeEvent: TouchEvent },
  options: TouchSensorOptions
) => boolean;

// Block DnD event propagation nếu phần tử có thuộc tính "data-no-dnd"
const mouseHandler: MouseHandlerType = ({ nativeEvent: event }, options) => {
  let cur: EventTarget | null = event.target;

  while (cur instanceof HTMLElement) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

const touchHandler: TouchHandlerType = ({ nativeEvent: event }, options) => {
  let cur: EventTarget | null = event.target;

  while (cur instanceof HTMLElement) {
    if (cur.dataset && cur.dataset.noDnd) {
      return false;
    }
    cur = cur.parentElement;
  }

  return true;
};

// Kế thừa và định nghĩa lớp với `activators`
export class MouseSensor extends DndKitMouseSensor {
  static activators = [
    { eventName: 'onMouseDown' as const, handler: mouseHandler },
  ];
}

export class TouchSensor extends DndKitTouchSensor {
  static activators = [
    { eventName: 'onTouchStart' as const, handler: touchHandler },
  ];
}
