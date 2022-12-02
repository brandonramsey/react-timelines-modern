import { shallow } from "enzyme";

import Timeline from ".";
import Header from "./Header";
import Body from "./Body";
import NowMarker from "./Marker/NowMarker";
import PointerMarker from "./Marker/PointerMarker";
import createTime from "../../utils/time";

import { StickySettings, TimebarEntry } from "../../types";

jest.mock("../../utils/getMouseX");

type TimelineProps = React.ComponentProps<typeof Timeline>;

const time = createTime({
  start: new Date("2018-01-01"),
  end: new Date("2019-01-01"),
  zoom: 1,
});

function createStickySettings(
  baseValues: Partial<StickySettings> = {}
): StickySettings {
  const {
    isSticky = false,
    setHeaderHeight = jest.fn(),
    handleHeaderScrollY = jest.fn(),
    headerHeight = 0,
    viewportWidth = 0,
    scrollLeft = 0,
  } = baseValues;
  return {
    isSticky,
    setHeaderHeight,
    handleHeaderScrollY,
    headerHeight,
    viewportWidth,
    scrollLeft,
  };
}

const defaultTimebar: TimebarEntry[] = [
  {
    useAsGrid: true,
    id: "1",
    cells: [
      {
        id: "cell-1",
        end: new Date("2022-01-01"),
        start: new Date("2021-01-01"),
        title: "Cell 1",
      },
    ],
    style: {},
    title: "Default Timebar",
  },
];

function createTimelineProps(
  baseValues: Partial<TimelineProps> = {}
): TimelineProps {
  const {
    now = new Date(),
    timebar = defaultTimebar,
    tracks = [],
    sticky = createStickySettings(),
  } = baseValues;

  return {
    now,
    time,
    timebar,
    tracks,
    sticky,
  };
}

describe("<Timeline />", () => {
  it("renders <NowMarker />, <Header /> and <Body />", () => {
    const props = createTimelineProps();
    const wrapper = shallow(<Timeline {...props} />);
    expect(wrapper.find(NowMarker).exists()).toBe(true);
    expect(wrapper.find(Header).exists()).toBe(true);
    expect(wrapper.find(Body).exists()).toBe(true);
  });

  it("renders <Body /> passing in appropriate grid cells", () => {
    const props = createTimelineProps();
    const wrapper = shallow(<Timeline {...props} />);
    const expected = defaultTimebar[0].cells;
    expect(wrapper.find(Body).prop("grid")).toEqual(expected);
  });

  describe("markers", () => {
    it("does not render <PointerMarker /> when component mounts", () => {
      const props = createTimelineProps();
      const wrapper = shallow(<Timeline {...props} />);
      expect(wrapper.find(PointerMarker).exists()).not.toBe(true);
    });

    it("renders <PointerMarker /> when component mounts", () => {
      const props = createTimelineProps();
      const wrapper = shallow(<Timeline {...props} />);
      wrapper.setState({ pointerDate: new Date() });
      expect(wrapper.find(PointerMarker).exists()).toBe(true);
    });

    /* @todo: Resolve issues with test (or functionality) and re-enable test */
    it.todo(
      'does not render <NowMarker /> if "now" is "null"'
      // () => {
      //   const props = createTimelineProps({ now: undefined });
      //   const wrapper = shallow(<Timeline {...props} />);
      //   expect(wrapper.find(NowMarker).exists()).toBe(false);
      // }
    );

    /* @todo: Fix types in here, and re-enable test */
    it.todo(
      "updates pointerDate when the mouse moves"
      //  () => {
      //   const event = 10;
      //   const props = createTimelineProps();
      //   const wrapper = shallow(<Timeline {...props} />);
      //   expect(wrapper.state("pointerDate")).toBe(null);

      //   getMouseX.mockImplementation((e) => e);
      //   wrapper.find(Header).prop("onMove")(event);
      //   expect(wrapper.state("pointerDate")).toEqual(new Date("2018-01-11"));
      // }
    );

    /* @todo: Fix types in here, and re-enable test */
    it.todo(
      "makes the pointer visible and highlighted when the mouse enters"
      // () => {
      //   const props = createTimelineProps();
      //   const wrapper = shallow(<Timeline {...props} />);
      //   expect(wrapper.state("pointerVisible")).toBe(false);
      //   expect(wrapper.state("pointerHighlighted")).toBe(false);

      //   wrapper.find(Header).prop("onEnter")();
      //   expect(wrapper.state("pointerVisible")).toBe(true);
      //   expect(wrapper.state("pointerHighlighted")).toBe(true);
      // }
    );

    /* @todo: Fix types in here, and re-enable test */
    it.todo(
      "removes the pointer highlight when the mouse leaves"
      // () => {
      //   const props = createTimelineProps();
      //   const wrapper = shallow(<Timeline {...props} />);
      //   expect(wrapper.state("pointerHighlighted")).toBe(false);

      //   wrapper.find(Header).prop("onEnter")();
      //   expect(wrapper.state("pointerHighlighted")).toBe(true);

      //   wrapper.find(Header).prop("onLeave")();
      //   expect(wrapper.state("pointerHighlighted")).toBe(false);
      // }
    );
  });
});
