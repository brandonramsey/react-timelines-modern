import { MouseEvent } from "react";

interface MinimalMouseEvent {
  clientX: MouseEvent["clientX"];
  currentTarget: {
    getBoundingClientRect: MouseEvent["currentTarget"]["getBoundingClientRect"];
  };
}
const getMouseX = (e: MinimalMouseEvent) => {
  const target = e.currentTarget;
  const bounds = target.getBoundingClientRect();
  return e.clientX - bounds.left;
};

export default getMouseX;
