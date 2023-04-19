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

  const defaultTooltipStyle: CSSProperties = {
    color: "white",
    lineHeight: "1.3",
    textAlign: "left",
    padding: "10px",
    background: "#4c4c4c",
  };

  const tooltipId = `rt-tooltip-${altId ?? Math.floor(Math.random())}`;

  return (
    <div
      id={id}
      data-altid={altId}
      className={createClasses("rt-element", classes)}
      style={style}
      data-tooltip-id={tooltipId}
      {...buildDataAttributes(dataSet)}
    >
      <div className="rt-element__content" aria-hidden="true">
        <span className="rt-element__title" style={titleStyle}>{title}</span>
        {continuing || <></>}
      </div>
      {tooltip ? (
        <div className="rt-element__tooltip" style={tooltipStyle}>
          {tooltip}
        </div>
      ) : (
        <Tooltip
          id={tooltipId}
          float={tooltipFollowCursor}
          style={{ ...defaultTooltipStyle, ...tooltipStyle }}
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
