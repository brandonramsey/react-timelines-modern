import { shallow } from "enzyme";

import Body from "./Body";
import TrackKeys from ".";
type BodyProps = React.ComponentProps<typeof Body>;

describe("<Body />", () => {
  it("renders <TrackKeys />", () => {
    const props: BodyProps = {
      tracks: [
        {
          id: "1",
          title: "Track 1",
          elements: [],
        },
      ],
      toggleTrackOpen: jest.fn(),
    };
    const wrapper = shallow(<Body {...props} />);
    expect(wrapper.find(TrackKeys).exists()).toBe(true);
  });
});
