import getMouseX from "./getMouseX";

describe("getMouseX", () => {
  it("gets mouse X position for a given event by subtracting left from clientX", () => {
    const event = {
      clientX: 200,
      currentTarget: {
        getBoundingClientRect: () => ({
          left: 10,
          height: 0,
          width: 0,
          top: 0,
          right: 0,
          bottom: 0,
          x: 0,
          y: 0,
          toJSON: () => {},
        }),
      },
    };
    expect(getMouseX(event)).toBe(190);
  });
});
