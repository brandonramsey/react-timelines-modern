import { shallow } from "enzyme";

import TrackKeys from ".";
import TrackKey from "./TrackKey";

type TrackKeysProps = React.ComponentProps<typeof TrackKeys>;

describe("<TrackKeys />", () => {
  it("renders a <TrackKey /> for each track", () => {
    const props: TrackKeysProps = {
      tracks: [
        {
          elements: [],
          id: "1",
          title: "Track 1",
        },
        {
          elements: [],
          id: "2",
          title: "Track 2",
        },
      ],
      toggleOpen: jest.fn(),
    };
    const wrapper = shallow(<TrackKeys {...props} />);
    expect(wrapper.find(TrackKey)).toHaveLength(2);
  });
});
