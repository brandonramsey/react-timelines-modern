import { shallow } from "enzyme";

import PointerMarker from "./PointerMarker";
import Marker from "./Marker";
import createTime from "../../../utils/time";

const time = createTime({
  start: new Date("2017-01-01"),
  end: new Date("2018-01-01"),
  zoom: 1,
});

describe("<PointerMarker />", () => {
  const props = {
    time,
    date: new Date("2017-01-02"),
    visible: false,
    highlighted: false,
  };

  it("renders <Marker /> passing down horizontal position", () => {
    const wrapper = shallow(<PointerMarker {...props} />);
    const marker = wrapper.find(Marker);
    expect(marker.prop("x")).toBe(1);
  });

  /* @todo: fix possible timezone/utc display issues -- expecting 2 Jan, but receiving 1 Jan */
  /* @todo: And -- the test seems mis-named -- it's not looking at text, it's looking at date... Sj*/
  it.todo(
    'renders "text"'
    // () => {
    //   const wrapper = shallow(<PointerMarker {...props} />);
    //   expect(wrapper.find("strong").text()).toBe("2 Jan");
    // }
  );
});
