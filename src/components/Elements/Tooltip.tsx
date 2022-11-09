import { FunctionComponent } from "react";
import { getDayMonth } from "../../utils/formatDate";

interface Props {
  end: Date;
  start: Date;
  title: string;
  tooltip?: string;
}

const Tooltip: FunctionComponent<Props> = (props) => {
  const { end, start, title, tooltip } = props;
  // if a tooltip was set, split it into individual lines and join them with <br />
  if (tooltip) {
    return (
      <div className="rt-element__tooltip">
        <div
          dangerouslySetInnerHTML={{
            __html: tooltip.split("\n").join("<br>"),
          }}
        />
      </div>
    );
  }
  // If no tooltip was set, generate a default tooltip
  return (
    <div className="rt-element__tooltip">
      <div>
        <div>{title}</div>
        <div>
          <strong>Start</strong> {getDayMonth(start)}
        </div>
        <div>
          <strong>End</strong> {getDayMonth(end)}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
