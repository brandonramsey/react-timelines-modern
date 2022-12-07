import { shallow, ShallowWrapper } from "enzyme";

import TrackKey from "./TrackKey";
import TrackKeys from ".";
import { Track } from "../../../types";
type TrackKeyProps = React.ComponentProps<typeof TrackKey>;

function getSideComponent(node: ShallowWrapper) {
  return node.find(".side-component");
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
      const wrapper = shallow(<TrackKey track={track} />);
      const component = getSideComponent(wrapper);
      expect(component.exists()).toBe(true);
      expect(component.text()).toEqual("Component");
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
