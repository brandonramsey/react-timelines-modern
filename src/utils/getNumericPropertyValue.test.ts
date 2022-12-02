import getNumericPropertyValue from "./getNumericPropertyValue";
import computedStyle from "./computedStyle";

jest.mock("./computedStyle");

describe("getNumericPropertyValue", () => {
  it("returns the numeric portion within a property value of a DOM node", () => {
    (computedStyle as jest.Mock).mockImplementation((node) => ({
      getPropertyValue(prop: string) {
        return node.style[prop];
      },
    }));
    const node = document.createElement("div");
    node.style.height = "100px";
    const actual = getNumericPropertyValue(node, "height");
    expect(actual).toBe(100);
  });
});
