type UserTextEvent = { value: string };
type UserMouseEvent = { value: [number, number] };

type UserEvent = UserTextEvent | UserMouseEvent;

function handle(event: UserEvent) {
  if (typeof event.value === 'string') {
    const v = event.value; // string
    return v;
  }

  return event.value; // [number, number]
}


// объединение
type UserTextEvent2 = { value: string; target: HTMLInputElement };
type UserMouseEvent2 = { value: [number, number]; target: HTMLElement };

type UserEvent2 = UserTextEvent2 | UserMouseEvent2;

function handle2(event: UserEvent2) {
  if (typeof event.value === 'string') {
    const v = event.value; // string
    const t = event.target; // HTMLInputElement | HTMLElement
    return { v, t };
  }

  const target = event.target; // HTMLInputElement | HTMLElement
  return { v: event.value, t: target }; // [number, number]
}

// solution
type UserTextEvent3 = { type: 'TextEvent'; value: string; target: HTMLInputElement };
type UserMouseEvent3 = { type: 'MouseEvent'; value: [number, number]; target: HTMLElement };

type UserEvent3 = UserTextEvent3 | UserMouseEvent3;

function handle3(event: UserEvent3) {
  if (event.type === 'TextEvent') {
    const v = event.value; // string
    const t = event.target; // HTMLInputElement
    return { v, t };
  }

  const target = event.target; // HTMLElement
  return { v: event.value, t: target }; // [number, number]
}
