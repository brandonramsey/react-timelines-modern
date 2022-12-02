import { shallow, mount } from "enzyme";
import type { ComponentProps } from "react";
import { StickySettings } from "../../types";
import createTime from "../../utils/time";

import Header from "./Header";
import Timebar from "./Timebar";

type HeaderProps = ComponentProps<typeof Header>;

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

function createProps(baseValues: Partial<HeaderProps> = {}): HeaderProps {
  const {
    time = createTime({
      start: new Date(),
      end: new Date(),
      zoom: 1,
    }),
    timebar = [],
    onMove = jest.fn(),
    onEnter = jest.fn(),
    onLeave = jest.fn(),
    sticky = createStickySettings(),
  } = baseValues;

  return {
    time,
    timebar,
    onMove,
    onEnter,
    onLeave,
    sticky,
    width: "1000px",
  };
}

describe("<Header />", () => {
  it("renders <Timebar />", () => {
    const props = createProps();
    const wrapper = shallow(<Header {...props} />);
    expect(wrapper.find(Timebar).exists()).toBe(true);
  });

  it('calls "onMove" on mouse move event', () => {
    const onMove = jest.fn();
    const props = createProps({ onMove });
    const wrapper = shallow(<Header {...props} />);
    wrapper.simulate("mouseMove");
    expect(onMove).toHaveBeenCalled();
  });

  it('calls "onEnter" on mouse enter event', () => {
    const onEnter = jest.fn();
    const props = createProps({ onEnter });
    const wrapper = shallow(<Header {...props} />);
    wrapper.simulate("mouseEnter");
    expect(onEnter).toHaveBeenCalled();
  });

  it('calls "onLeave" on mouse leave event', () => {
    const onLeave = jest.fn();
    const props = createProps({ onLeave });
    const wrapper = shallow(<Header {...props} />);
    wrapper.simulate("mouseLeave");
    expect(onLeave).toHaveBeenCalled();
  });

  describe("sticky", () => {
    /* @todo: fix types in this test, then enable it (remove .todo) */
    it.todo(
      "ensures the scroll left postion gets updated when a new scrollLeft prop is received"
      // () => {
      // const sticky = createStickySettings();
      // const props = createProps({ sticky });
      // const wrapper = mount(<Header {...props} />);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(0);
      // createStickySettings({ scrollLeft: 100 });
      // const nextProps = createProps({ sticky });
      // wrapper.setProps(nextProps);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(100);
      // }
    );

    /* @todo: fix types in this test, then enable it (remove .todo) */
    it.todo(
      "ensures the scroll left position is correct when the header becomes sticky"
      // () => {
      // let sticky = createStickySettings({ isSticky: false });
      // const props = createProps({ sticky });
      // const wrapper = mount(<Header {...props} />);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(0);
      // sticky = createStickySettings({ isSticky: true });
      // const nextProps = createProps({ sticky });
      // wrapper.setProps(nextProps);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(0);
      // }
    );

    /* @todo: fix types in this test, then enable it (remove .todo) */
    it.todo(
      "does not update the scrollLeft position if the component updates and the scrollLeft and isSticky props have not changed"
      // () => {
      // const sticky = createStickySettings();
      // const props = createProps({ sticky });
      // const wrapper = mount(<Header {...props} />);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(0);
      // const nextProps = createProps({ height: 100, sticky });
      // wrapper.setProps(nextProps);
      // expect(
      //   wrapper.find(".rt-timeline__header-scroll").instance().scrollLeft
      // ).toBe(0);
      // }
    );

    it("calls the setHeaderHeight() prop when mounted", () => {
      const setHeaderHeight = jest.fn();
      const sticky = createStickySettings({ setHeaderHeight });
      const props = createProps({ sticky });
      mount(<Header {...props} />);
      expect(setHeaderHeight).toHaveBeenCalled();
    });

    it("makes the header sticky if isSticky is true", () => {
      const sticky = createStickySettings({ isSticky: true });
      const props = createProps({ sticky });
      const wrapper = mount(<Header {...props} />);
      expect(wrapper.find(".rt-timeline__header").prop("className")).toMatch(
        "is-sticky"
      );
    });

    it("makes the header static if isSticky is false", () => {
      const sticky = createStickySettings({ isSticky: false });
      const props = createProps({ sticky });
      const wrapper = mount(<Header {...props} />);
      expect(
        wrapper.find(".rt-timeline__header").prop("className")
      ).not.toMatch("is-sticky");
    });

    /* @todo: fix this test and re-enable */
    it.todo(
      "sets the viewportWidth and height of the header if sticky"
      // () => {
      //   const sticky = createStickySettings({
      //     isSticky: true,
      //     viewportWidth: 100,
      //     headerHeight: 20,
      //   });
      //   const props = createProps({ sticky });
      //   const wrapper = mount(<Header {...props} />);
      //   expect(wrapper.find(".rt-timeline__header").prop("style")).toEqual({
      //     width: 100,
      //     height: 20,
      //   });
      // }
    );

    it("handles scroll events when sticky", () => {
      const handleHeaderScrollY = jest.fn();
      const sticky = createStickySettings({
        isSticky: true,
        handleHeaderScrollY,
      });
      const props = createProps({ sticky });
      const wrapper = mount(<Header {...props} />);
      wrapper.find(".rt-timeline__header-scroll").simulate("scroll");
      expect(handleHeaderScrollY).toHaveBeenCalled();
    });
  });
});
