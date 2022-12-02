import { shallow } from "enzyme";

import createTime from "../../../utils/time";

import Row from "./Row";
import Cell from "./Cell";

describe("<Row />", () => {
  it("renders the <Cell /> components", () => {
    const props = {
      time: createTime({
        start: new Date("2017-01-01"),
        end: new Date("2018-01-01"),
        zoom: 1,
      }),
      style: {},
      cells: [
        {
          title: "test",
          start: new Date(),
          end: new Date(),
          id: "1",
        },
        {
          title: "test",
          start: new Date(),
          end: new Date(),
          id: "2",
        },
      ],
    };
    const wrapper = shallow(<Row {...props} />);
    expect(wrapper.find(Cell)).toHaveLength(2);
  });
});
