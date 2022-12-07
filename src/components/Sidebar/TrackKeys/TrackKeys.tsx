import { Track } from "../../../types";
import TrackKey from "./TrackKey";

interface Props {
  tracks: Track[];
  toggleOpen?: (track: Track) => void;
  clickTrackButton?: (track: Track) => void;
}

export default function TrackKeys(props: Props): JSX.Element {
  const { tracks, toggleOpen } = props;
  return (
    <ul className="rt-track-keys">
      {tracks.map((track) => (
        <TrackKey key={track.id} track={track} toggleOpen={toggleOpen} />
      ))}
    </ul>
  );
}
