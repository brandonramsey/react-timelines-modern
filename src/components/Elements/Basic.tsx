import { CSSProperties, FunctionComponent, ReactNode } from "react";
import { getDayMonth } from "../../utils/formatDate";
import createClasses from "../../utils/classes";

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
  id?: string;
  classes?: string[];
  dataSet: BuildDataAttributesSettings;
  end: Date;
  start: Date;
  style?: CSSProperties;
  title: string;
  tooltip?: ReactNode;
  altId?: string;
}

const Basic: FunctionComponent<Props> = (props) => {
  const { classes = [], dataSet, end, start, style, title, tooltip, altId, id } = props;
  return (
    <div
      id={id}
      data-altId={altId}
      className={createClasses("rt-element", classes)}
      style={style}
      {...buildDataAttributes(dataSet)}
    >
      <div className="rt-element__content" aria-hidden="true">
        <span className="rt-element__title">{title}</span>
      </div>
      <div className="rt-element__tooltip">
        {tooltip || (
          <div>
            <div>{title}</div>
            <div>
              <strong>Start</strong> {getDayMonth(start)}
            </div>
            <div>
              <strong>End</strong> {getDayMonth(end)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Basic;
