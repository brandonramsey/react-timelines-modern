import { FunctionComponent } from "react";
import Tracks from ".";
import {
  TimeSettings,
  Element as ElementInterface,
  Track as TrackInterface,
} from "../../../types";
import Element, { ClickElementHandler } from "./Element";

interface Props {
  time: TimeSettings;
  isOpen?: boolean;
  elements: ElementInterface[];
  tracks: TrackInterface[];
  clickElement?: ClickElementHandler;
}

const Track: FunctionComponent<Props> = (props) => {
  const { time, elements, isOpen, tracks, clickElement } = props;
  return (
    <div className="tr-track">
      <div className="rt-track__elements">
        {elements
          .filter(({ start, end }) => end > start)
          .map((element) => {
            const {
              classes,
              clickElement: elementClickElement,
              dataSet,
              end,
              id,
              start,
              style,
              suffixContent,
              time: elementTime,
              title,
              tooltip,
            } = element;
            const selectedTime = elementTime || time;
            const selectedClickElement = elementClickElement || clickElement;
            return (
              <Element
                key={id}
                classes={classes}
                clickElement={selectedClickElement}
                dataSet={dataSet}
                end={end}
                start={start}
                style={style}
                suffixContent={suffixContent}
                time={selectedTime}
                title={title}
                tooltip={tooltip}
              />
            );
          })}
      </div>
      {isOpen && tracks && tracks.length > 0 && (
        <Tracks time={time} tracks={tracks} clickElement={clickElement} />
      )}
    </div>
  );
};

export default Track;
