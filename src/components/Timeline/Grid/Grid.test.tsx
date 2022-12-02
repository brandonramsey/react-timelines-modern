import { shallow, ShallowWrapper } from "enzyme";

import Grid from "./Grid";
import createTime from "../../../utils/time";

const time = createTime({
  start: new Date("2017-01-01T00:00:00.000Z"),
  end: new Date("2017-01-30T00:00:00.000Z"),
  zoom: 10, // 10px === 1 day
});

const grid = [
  {
    id: "1",
    start: new Date("2017-01-01T00:00:00.000Z"),
    end: new Date("2017-01-06T00:00:00.000Z"),
    title: "Cell 1",
  },
  {
    id: "2",
    start: new Date("2017-01-06T00:00:00.000Z"),
    end: new Date("2017-01-11T00:00:00.000Z"),
    title: "Cell 2",
  },
  {
    id: "3",
    start: new Date("2017-01-11T00:00:00.000Z"),
    end: new Date("2017-01-16T00:00:00.000Z"),
    title: "Cell 3",
  },
];

describe("<Grid />", () => {
  it("renders grid cells, the styling of each repesenting the start and end dates in the grid prop", () => {
    const getItemStyle = (wrapper: ShallowWrapper, i: number) =>
      wrapper.find(".rt-grid__cell").get(i).props.style;

    const wrapper = shallow(<Grid time={time} grid={grid} />);
    expect(getItemStyle(wrapper, 0)).toEqual({ left: "0px", width: "50px" });
    expect(getItemStyle(wrapper, 1)).toEqual({ left: "50px", width: "50px" });
    expect(getItemStyle(wrapper, 2)).toEqual({ left: "100px", width: "50px" });
  });
});
