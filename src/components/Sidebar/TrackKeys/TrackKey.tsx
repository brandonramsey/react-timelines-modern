import { cloneElement } from "react";
import { Track } from "../../../types";

import TrackKeys from "./TrackKeys";
import setDefaultProperties, {
  DefaultProperties,
} from "../../../utils/setDefaultProperties";
import noop from "../../../utils/noop";

export type ClickTrackHandler = (track: Track) => void;
export type ToggleOpenHandler = (track: Track) => void;
interface Props {
  toggleOpen?: ToggleOpenHandler;
  track: Track;
}

const DEFAULT_PROPS: DefaultProperties<Props> = {
  toggleOpen: noop,
};

export default function TrackKey(props: Props): JSX.Element {
  const { track, toggleOpen } = setDefaultProperties(props, DEFAULT_PROPS);
  const { title, tracks, isOpen, sideComponent } = track;

  return (
    <li className="rt-track-key">
      <div className="rt-track-key__entry">
        <span className="rt-track-key__title">{title}</span>
        {sideComponent ? cloneElement(sideComponent) : null}
      </div>
      {isOpen && tracks && tracks.length > 0 && (
        <TrackKeys tracks={tracks} toggleOpen={toggleOpen} />
      )}
    </li>
  );
}
