import React from "react";
import { shallow } from "enzyme";

import Body from "./Body";
import Tracks from "./Tracks";
import Grid from "./Grid";
import createTime from "../../utils/time";

type BodyProps = React.ComponentProps<typeof Body>;

const defaultProps: BodyProps = {
  time: createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  }),
  grid: [],
  tracks: [],
};

describe("<Body />", () => {
  it("renders <Tracks />", () => {
    const wrapper = shallow(<Body {...defaultProps} />);
    expect(wrapper.find(Tracks).exists()).toBe(true);
  });

  it("renders <Grid /> if grid prop exists", () => {
    const wrapper = shallow(<Body {...defaultProps} />);
    expect(wrapper.find(Grid).exists()).toBe(true);
  });

  it("does not render <Grid /> if grid prop does not exist", () => {
    const props = {
      ...defaultProps,
      grid: undefined,
    };
    const wrapper = shallow(<Body {...props} />);
    expect(wrapper.find(Grid).exists()).toBe(false);
  });
});
