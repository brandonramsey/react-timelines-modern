import { CSSProperties, FunctionComponent, ReactNode } from "react";
import { TimeSettings } from "../../../types";

import BasicElement from "../../Elements/Basic";
import { getMaxDate, getMinDate } from "../../../utils/date";
interface Props {
  id?: string;
  time?: TimeSettings;
  style?: CSSProperties;
  title?: string;
  titleStyle?: CSSProperties;
  start: Date;
  end: Date;
  classes?: string[];
  dataSet?: Record<string, string>;
  tooltip?: ReactNode;
  tooltipStyle?: CSSProperties;
  altId?: string;
  clickElement?: (props: Props) => void;
  continuing?: ReactNode;
}

export type ClickElementHandler = (props: Props) => void;

const Element: FunctionComponent<Props> = (props) => {
  const {
    id,
    time,
    style,
    title = "",
    titleStyle = {},
    start,
    end,
    classes,
    dataSet = {},
    tooltip,
    tooltipStyle = {},
    altId,
    clickElement,
    continuing,
  } = props;

  const handleClick = () => {
    if (clickElement) {
      clickElement(props);
    }
  };

  const styleLeftAndWidth = time
  ? time.toStyleLeftAndWidth(
      getMaxDate(start, time.start),
      getMinDate(end, time.end)
    )
  : {};

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
        id={id}
        title={title}
        titleStyle={titleStyle}
        start={start}
        end={end}
        style={style}
        classes={classes}
        dataSet={dataSet}
        tooltip={tooltip}
        tooltipStyle={tooltipStyle}
        altId={altId}
        continuing={continuing}
      />
    </div>
  );
};

export default Element;
