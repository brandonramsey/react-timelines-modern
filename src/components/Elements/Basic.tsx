import { CSSProperties, FunctionComponent, ReactNode } from "react";
import { getDayMonth } from "../../utils/formatDate";
import createClasses from "../../utils/classes";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

interface BuildDataAttributesSettings {
  [key: string]: string;
}

const buildDataAttributes = (attributes: BuildDataAttributesSettings = {}) => {
  const value = {};
  Object.keys(attributes).forEach((name) => {
    value[`data-${name.toLowerCase()}`] = attributes[name];
  });
  return value;
};

interface Props {
  id?: string;
  classes?: string[];
  dataSet: BuildDataAttributesSettings;
  end: Date;
  start: Date;
  style?: CSSProperties;
  title: string;
  titleStyle?: CSSProperties;
  tooltip?: ReactNode;
  tooltipStyle?: CSSProperties;
  tooltipFollowCursor?: boolean;
  altId?: string;
  continuing?: ReactNode;
}

const Basic: FunctionComponent<Props> = (props) => {
  const {
    id,
    classes = [],
    dataSet,
    end,
    start,
    style,
    title,
    titleStyle,
    tooltip,
    tooltipStyle = {},
    tooltipFollowCursor,
    altId,
    continuing,
  } = props;
  return (
    <div
      id={id}
      data-altid={altId}
      className={createClasses("rt-element", classes)}
      style={style}
      data-tooltip-id="rt-tooltip"
      {...buildDataAttributes(dataSet)}
    >
      <div className="rt-element__content" aria-hidden="true">
        <span className="rt-element__title" style={titleStyle}>{title}</span>
        {continuing || <></>}
      </div>
      {tooltip || (
        <Tooltip
          className={tooltipStyle ? "" : "rt-element__tooltip"}
          id="rt-tooltip"
          float={tooltipFollowCursor}
          style={tooltipStyle}
          noArrow={true}
          place="top"
          offset={25}
          delayShow={300}
          delayHide={300}
        >
          <div>{title}</div>
          <div>
            <strong>Start</strong> {getDayMonth(start)}
          </div>
          <div>
            <strong>End</strong> {getDayMonth(end)}
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default Basic;
