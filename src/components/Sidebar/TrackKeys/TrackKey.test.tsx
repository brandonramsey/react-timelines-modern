import { shallow, ShallowWrapper } from "enzyme";

import TrackKey from "./TrackKey";
import TrackKeys from ".";
import { Track } from "../../../types";
type TrackKeyProps = React.ComponentProps<typeof TrackKey>;

function getSideComponent(node: ShallowWrapper) {
  return node.find(".side-component");
}

function getButton(node: ShallowWrapper) {
  return node.find(".rt-track-key__side-button");
}

function getToggleButton(node: ShallowWrapper) {
  return node.find(".rt-track-key__toggle");
}

describe("<TrackKey />", () => {
  describe("side component", () => {
    const sideComponent = <span className="side-component">Component</span>;

    it('renders the side component if "sideComponent" exists', () => {
      const track: Track = {
        elements: [],
        id: "1",
        isOpen: true,
        sideComponent,
        title: "test",
      };
      const wrapper = shallow(
        <TrackKey track={track} clickTrackButton={jest.fn()} />
      );
      const component = getSideComponent(wrapper);
      expect(component.exists()).toBe(true);
      expect(component.text()).toEqual("Component");
    });
  });

  describe("link button", () => {
    it('renders a button if "hasButton" is true and "clickTrackButton" exists', () => {
      const track: Track = {
        elements: [],
        hasButton: true,
        id: "1",
        isOpen: true,
        title: "test",
      };
      const wrapper = shallow(
        <TrackKey track={track} clickTrackButton={jest.fn()} />
      );
      expect(getButton(wrapper).exists()).toBe(true);
    });

    it('does not render when "hasButton" is false', () => {
      const track: Track = {
        elements: [],
        id: "1",
        isOpen: true,
        title: "test",
      };
      const wrapper = shallow(
        <TrackKey track={track} clickTrackButton={jest.fn()} />
      );
      expect(getButton(wrapper).exists()).toBe(false);
    });

    it('does not render when "sideComponent" is present', () => {
      const track = {
        elements: [],
        hasButton: true,
        id: "1",
        isOpen: true,
        sideComponent: <span>Component</span>,
        title: "test",
      };
      const wrapper = shallow(
        <TrackKey track={track} clickTrackButton={jest.fn()} />
      );
      expect(getButton(wrapper).exists()).toBe(false);
    });

    /* @todo: Fix this test or functionality -- it's not working as expected */
    it.todo(
      'does not render when "clickTrackButton" does not exist'
      // () => {
      //   const track: Track = {
      //     elements: [],
      //     hasButton: true,
      //     id: "1",
      //     isOpen: true,
      //     title: "test",
      //   };
      //   const wrapper = shallow(<TrackKey track={track} />);
      //   expect(getButton(wrapper).exists()).toBe(false);
      // }
    );

    it('calls "clickTrackButton" with the track when clicked', () => {
      const track: Track = {
        elements: [],
        hasButton: true,
        id: "1",
        isOpen: true,
        title: "test",
      };
      const clickTrackButton = jest.fn();
      const wrapper = shallow(
        <TrackKey track={track} clickTrackButton={clickTrackButton} />
      );
      const button = getButton(wrapper);

      expect(clickTrackButton).not.toHaveBeenCalled();
      button.simulate("click");
      expect(clickTrackButton).toHaveBeenCalledWith(track);
    });
  });

  describe("toggle button", () => {
    it('renders when "track.isOpen" is defined', () => {
      const props: TrackKeyProps = {
        track: { title: "test", isOpen: true, elements: [], id: "1" },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(getToggleButton(wrapper).exists()).toBe(true);
    });

    it('does not render when "track.isOpen" is undefined', () => {
      const props: TrackKeyProps = {
        track: { title: "test", isOpen: undefined, elements: [], id: "1" },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(getToggleButton(wrapper).exists()).toBe(false);
    });

    it('renders with the text "Close" when "track.isOpen" is "true"', () => {
      const props: TrackKeyProps = {
        track: { title: "test", isOpen: true, elements: [], id: "1" },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(getToggleButton(wrapper).text()).toBe("Close");
    });

    it('renders with the text "Open" when "track.isOpen" is "false"', () => {
      const props: TrackKeyProps = {
        track: { title: "test", isOpen: false, elements: [], id: "1" },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(getToggleButton(wrapper).text()).toBe("Open");
    });

    it('calls "toggleOpen()" when clicked passing "track" as a single argument', () => {
      const toggleOpen = jest.fn();
      const props: TrackKeyProps = {
        toggleOpen,
        track: {
          elements: [],
          id: "1",
          isOpen: false,
          title: "test",
        },
      };
      const wrapper = shallow(<TrackKey {...props} />);
      getToggleButton(wrapper).simulate("click");
      expect(toggleOpen).toHaveBeenCalledWith(props.track);
    });
  });

  describe("<TrackKeys />", () => {
    it('renders when "isOpen" is truthy and "tracks" is not empty', () => {
      const props: TrackKeyProps = {
        track: {
          title: "test",
          elements: [],
          id: "1",
          tracks: [
            {
              elements: [],
              id: "2",
              title: "inner test",
            },
          ],
          isOpen: true,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(wrapper.find(TrackKeys).exists()).toBe(true);
    });

    it('does not render when "isOpen" is falsy', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          title: "test",
          tracks: [
            {
              elements: [],
              id: "2",
              title: "inner test",
            },
          ],
          isOpen: false,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(wrapper.find(TrackKeys).exists()).toBe(false);
    });

    it('does not render when "tracks" is falsy', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          isOpen: true,
          title: "test",
          tracks: undefined,
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(wrapper.find(TrackKeys).exists()).toBe(false);
    });

    it('does not render when "tracks" is an empty array', () => {
      const props: TrackKeyProps = {
        track: {
          elements: [],
          id: "1",
          isOpen: true,
          title: "test",
          tracks: [],
        },
        toggleOpen: jest.fn(),
      };
      const wrapper = shallow(<TrackKey {...props} />);
      expect(wrapper.find(TrackKeys).exists()).toBe(false);
    });
  });
});
