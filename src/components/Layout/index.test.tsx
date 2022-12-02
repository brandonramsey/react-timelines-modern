import { mount } from "enzyme";

import Layout from ".";
import Sidebar from "../Sidebar/Sidebar";
import Timeline from "../Timeline";
import createTime from "../../utils/time";

import computedStyle from "../../utils/computedStyle";
// import { addListener, removeListener } from "../../utils/events";
import raf from "../../utils/raf";

type LayoutProps = React.ComponentProps<typeof Layout>;

jest.mock("../Sidebar/Sidebar", () => () => null);
jest.mock("../Timeline", () => () => null);
jest.mock("../../utils/computedStyle");
jest.mock("../../utils/events");
jest.mock("../../utils/raf");

function createProps(baseValues: Partial<LayoutProps> = {}): LayoutProps {
  const fallbackTime = createTime({
    start: new Date(),
    end: new Date(),
    zoom: 1,
  });
  fallbackTime.fromX = jest.fn(() => new Date());
  fallbackTime.toX = jest.fn(() => 0);
  const {
    timebar = [],
    tracks = [],
    now = new Date(),
    isOpen = false,
    toggleTrackOpen = jest.fn(),
    enableSticky = true,
    onLayoutChange = jest.fn(),
    timelineViewportWidth = 1000,
    sidebarWidth = 200,
  } = baseValues;
  const time = baseValues.time || fallbackTime;

  return {
    timebar,
    time,
    tracks,
    now,
    isOpen,
    toggleTrackOpen,
    enableSticky,
    onLayoutChange,
    timelineViewportWidth,
    sidebarWidth,
  };
}

describe("<Layout />", () => {
  beforeEach(() => {
    (computedStyle as jest.Mock).mockImplementation((node) => ({
      getPropertyValue(prop: string) {
        return node.style[prop];
      },
    }));
    (raf as jest.Mock).mockImplementation((fn) => fn());
  });

  it("renders <Sidebar /> and <Timeline />", () => {
    const props = createProps();
    const wrapper = mount(<Layout {...props} />);
    expect(wrapper.find(Sidebar).exists()).toBe(true);
    expect(wrapper.find(Timeline).exists()).toBe(true);
  });

  it("renders <Sidebar /> in an open state", () => {
    const props = createProps({ isOpen: true });
    const wrapper = mount(<Layout {...props} />);
    expect(wrapper.find(".rt-layout").prop("className")).toMatch("is-open");
  });

  it("renders <Sidebar /> in a closed state", () => {
    const props = createProps({ isOpen: false });
    const wrapper = mount(<Layout {...props} />);
    expect(wrapper.find(".rt-layout").prop("className")).not.toMatch("is-open");
  });

  describe("sticky header", () => {
    /* @todo: fix type errors and re-enable this test */
    it.todo(
      "becomes sticky when the window is within the timeline"
      // () => {
      // const listeners = {};
      // (addListener as jest.Mock).mockImplementation((evt, fun) => {
      //   listeners[evt] = fun;
      // });
      // (removeListener as jest.Mock).mockImplementation(jest.fn());
      // const props = createProps();
      // const wrapper = mount(<Layout {...props} />);
      // expect(typeof listeners.scroll).toEqual("function");
      // wrapper.instance().setHeaderHeight(50);
      // wrapper.instance().timeline.current.getBoundingClientRect = () => ({
      //   top: -50,
      //   bottom: 100,
      // });
      // listeners.scroll();
      // expect(wrapper.state()).toMatchObject({
      //   isSticky: true,
      // });
      // wrapper.instance().timeline.current.getBoundingClientRect = () => ({
      //   top: 10,
      //   bottom: 100,
      // });
      // listeners.scroll();
      // expect(wrapper.state()).toMatchObject({
      //   isSticky: false,
      // });
      // wrapper.instance().timeline.current.getBoundingClientRect = () => ({
      //   top: -60,
      //   bottom: 20,
      // });
      // listeners.scroll();
      // expect(wrapper.state()).toMatchObject({
      //   isSticky: false,
      // });
      // wrapper.unmount();
      // expect(removeListener).toHaveBeenCalled();
      // }
    );

    it.todo(
      "syncs the timeline scroll position when the header is scrolled and is sticky"
      // () => {
      //   const props = createProps();
      //   const wrapper = mount(<Layout {...props} />);
      //   wrapper.setState({ isSticky: true });

      // @todo: fix this type error and uncomment
      // wrapper.find(Timeline).prop("sticky").handleHeaderScrollY("100");

      // @todo: fix this type error and uncomment
      // expect(wrapper.find(".rt-layout__timeline").instance().scrollLeft).toBe(
      //   100
      // );
      // }
    );
  });
});
