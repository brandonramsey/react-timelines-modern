import { shallow } from "enzyme";
import createTime from "../../../utils/time";

import Tracks from ".";
import Track from "./Track";

describe("<Tracks />", () => {
  it("renders <Track /> components", () => {
    const props = {
      time: createTime({
        start: new Date("2017-01-01"),
        end: new Date("2018-01-01"),
        zoom: 1,
      }),
      tracks: [
        { id: "1", elements: [], title: "" },
        { id: "2", elements: [], title: "" },
      ],
    };
    const wrapper = shallow(<Tracks {...props} />);
    expect(wrapper.find(Track)).toHaveLength(2);
  });
});
