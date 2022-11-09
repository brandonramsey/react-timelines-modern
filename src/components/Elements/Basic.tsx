import { CSSProperties, FunctionComponent, ReactNode } from "react";
import createClasses from "../../utils/classes";
import Tooltip from "./Tooltip";

interface BuildDataAttributesSettings {
  [key: string]: string;
}

const buildDataAttributes = (attributes: BuildDataAttributesSettings = {}) => {
  const value = {};
  Object.keys(attributes).forEach((name) => {
    value[`data-${name}`] = attributes[name];
  });
  return value;
};

interface Props {
  classes?: string[];
  dataSet: BuildDataAttributesSettings;
  end: Date;
  start: Date;
  style?: CSSProperties;
  title: string;
  tooltip?: string;
  suffixContent?: ReactNode;
}

const Basic: FunctionComponent<Props> = (props) => {
  const {
    classes = [],
    dataSet,
    end,
    start,
    style,
    suffixContent = null,
    title,
    tooltip,
  } = props;
  return (
    <div
      className={createClasses("rt-element", classes)}
      style={style}
      {...buildDataAttributes(dataSet)}
    >
      <div className="rt-element__content" aria-hidden="true">
        <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
          <span className="rt-element__title">{title}</span>
          {suffixContent}
        </div>
      </div>
      <Tooltip end={end} start={start} title={title} tooltip={tooltip} />
    </div>
  );
};

export default Basic;
