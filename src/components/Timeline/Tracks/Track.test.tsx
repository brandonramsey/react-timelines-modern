import { shallow } from "enzyme";

import Track from "./Track";
import Tracks from ".";
import Element from "./Element";
import { ComponentPropsWithoutRef } from "react";
import createTime from "../../../utils/time";

const DEFAULT_TIME = createTime({
  start: new Date("2017-01-01"),
  end: new Date("2018-01-01"),
  zoom: 1,
});

function createProps(values: Partial<ComponentPropsWithoutRef<typeof Track>>) {
  const {
    clickElement = createProps.mockClickElement,
    elements = [],
    isOpen = false,
    time = DEFAULT_TIME,
    tracks = [],
  } = values;
  return {
    clickElement,
    elements,
    isOpen,
    time,
    tracks,
  };
}
createProps.mockClickElement = jest.fn();

describe("<Track />", () => {
  it('filters out <Element /> components where "start" is after "end"', () => {
    const props = createProps({
      elements: [
        {
          id: "1",
          start: new Date("2017-01-01"),
          end: new Date("2018-01-01"),
          style: {},
          time: createTime({
            start: new Date("2017-01-01"),
            end: new Date("2018-01-01"),
            zoom: 1,
          }),
          title: "Element 1",
        },
        {
          id: "2",
          start: new Date("2018-01-01"),
          end: new Date("2017-01-01"),
          style: {},
          time: createTime({
            start: new Date("2017-01-01"),
            end: new Date("2018-01-01"),
            zoom: 1,
          }),
          title: "Element 2",
        },
      ],
    });
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find(Element)).toHaveLength(1);
  });

  it("renders <Tracks /> if is open and tracks exist (no clickElement)", () => {
    const props = createProps({
      isOpen: true,
      tracks: [
        {
          elements: [],
          id: "1",
          title: "Test Title",
        },
      ],
    });
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find(Tracks)).toHaveLength(1);
  });

  it("renders <Tracks /> if is open and tracks exist (with clickElement)", () => {
    const props = createProps({
      isOpen: true,
      tracks: [
        {
          elements: [],
          id: "1",
          title: "Test Title",
        },
      ],
      clickElement: jest.fn(),
    });
    const wrapper = shallow(<Track {...props} />);
    const tracks = wrapper.find(Tracks);

    expect(tracks.props().clickElement).toBe(props.clickElement);
  });

  it("does not render <Tracks /> is is not open", () => {
    const props = createProps({
      isOpen: false,
      tracks: [
        {
          elements: [],
          id: "1",
          title: "Test Title",
        },
      ],
    });
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find(Tracks)).toHaveLength(0);
  });

  it("does not render <Tracks /> if there are no tracks", () => {
    const props = createProps({
      isOpen: true,
      tracks: [],
    });
    const wrapper = shallow(<Track {...props} />);
    expect(wrapper.find(Tracks)).toHaveLength(0);
  });
});
