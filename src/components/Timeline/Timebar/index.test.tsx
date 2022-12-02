import { shallow } from "enzyme";
import createTime from "../../../utils/time";

import Timebar from ".";
import Row from "./Row";

describe("<Timebar />", () => {
  it("renders <Row /> components", () => {
    const props = {
      time: createTime({
        start: new Date("2017-01-01"),
        end: new Date("2018-01-01"),
        zoom: 1,
      }),
      rows: [
        { id: "1", cells: [], style: {}, title: "Title 1" },
        { id: "1", cells: [], style: {}, title: "Title 1" },
      ],
    };
    const wrapper = shallow(<Timebar {...props} />);
    expect(wrapper.find(Row)).toHaveLength(2);
  });
});
