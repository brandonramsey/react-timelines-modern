import { CSSProperties, FunctionComponent } from "react";
import { TimeSettings } from "../../../types";

import BasicElement from "../../Elements/Basic";

interface Props {
  time?: TimeSettings;
  style?: CSSProperties;
  title?: string;
  start: Date;
  end: Date;
  classes?: string[];
  dataSet?: Record<string, string>;
  tooltip?: string;
  clickElement?: (props: Props) => void;
}

export type ClickElementHandler = (props: Props) => void;

const Element: FunctionComponent<Props> = (props) => {
  const {
    time,
    style,
    title = "",
    start,
    end,
    classes,
    dataSet = {},
    suffixContent,
    tooltip,
    clickElement,
  } = props;

  const handleClick = () => {
    if (clickElement) {
      clickElement(props);
    }
  };
  const styleLeftAndWidth = time ? time.toStyleLeftAndWidth(start, end) : {};
  const elementStyle = {
    ...styleLeftAndWidth,
    ...(clickElement ? { cursor: "pointer" } : {}),
  };
  return (
    <div
      className="rt-track__element"
      style={elementStyle}
      onClick={clickElement && handleClick}
    >
      <BasicElement
        title={title}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        suffixContent={suffixContent}
        tooltip={tooltip}
      />
    </div>
  );
};

export default Element;
