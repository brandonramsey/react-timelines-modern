import React from 'react'
import PropTypes from 'prop-types'
import { getDayMonth } from '../../utils/formatDate'
import createClasses from '../../utils/classes'
import styled from 'styled-components';
import { ELEMENT_BACKGROUND_COLOR, ELEMENT_HEIGHT, SPACING, ELEMENT_TEXT_COLOR } from '../style-constants';

const TOOLTIP_BORDER_WIDTH = 6;
const TOOLTIP_DELAY = 0.3;

const onClick = p => {
  alert('The three dot menu will pop-up when interacted with this button.')
  console.log(p)
}
const buildDataAttributes = (attributes = {}) => {
  const value = {}
  Object.keys(attributes).forEach(name => {
    value[`data-${name}`] = attributes[name]
  })
  return value
}

const RtElement = styled.div`
  height: ${ELEMENT_HEIGHT}px;
  position: relative;
  line-height: ${ELEMENT_HEIGHT}px;
  background-color: ${ELEMENT_BACKGROUND_COLOR};
  color: #ffffff;
  text-align: center;
`;

const RtTopPanelElementWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0;
  padding: 0;
`;

const RtTopPanelElement = styled.span`
  width: ${props => (props.progress || 0) * 100}%;
`;

const RtElementContent = styled.div`
  padding: 0 ${SPACING}px;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  text-overflow: ellipsis;
`;

const RtElementContentInner = styled.div`
  overflow: hidden;
  white-space: nowrap;
`;

const RtElementTitle = styled.span``;

const RtThreeDotMenu = styled.button``;

const RtElementTooltipWrapper = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  z-index: 2;
  padding: ${SPACING}px;
  line-height: 1.3;
  white-space: nowrap;
  text-align: left;
  background: ${ELEMENT_TEXT_COLOR};
  color: #fff;
  transform: translateX(-50%) scale(0);
  pointer-events: none;

  &::before {
    position: absolute;
    top: 100%;
    left: 50%;
    border-top: ${TOOLTIP_BORDER_WIDTH}px solid ${ELEMENT_TEXT_COLOR};
    border-right: ${TOOLTIP_BORDER_WIDTH}px solid transparent;
    border-left: ${TOOLTIP_BORDER_WIDTH}px solid transparent;
    transform: translateX(-50%);
    content: '';
  }

  ${RtElement}:hover &,
  ${RtElement}:focus & {
    transform: translateX(-50%) scale(1);
    transition: transform 0s ${TOOLTIP_DELAY}s;
  }
`;

const Basic = ({ title, start, end, style, classes, dataSet, tooltip, progress = 0 }) => (
  <RtElement className={createClasses('rt-element', classes)} style={style} {...buildDataAttributes(dataSet)}>
    {progress > 0 ? (
      <RtTopPanelElementWrapper>
        <RtTopPanelElement className="rt-top-panel-element" />
      </RtTopPanelElementWrapper>
    ) : (
      <></>
    )}

    <RtElementContent className="rt-element__content rt-three-dot-menu-container" aria-hidden="true">
      <RtElementContentInner>
        <RtElementTitle className="rt-element__title rt-three-dot-title">{title}</RtElementTitle>
      </RtElementContentInner>
      <RtThreeDotMenu className="rt-three-dot-menu" onClick={() => onClick(progress)}>
        ⋯
      </RtThreeDotMenu>
    </RtElementContent>
    <RtElementTooltipWrapper className="rt-element__tooltip">
      {tooltip ? (
        // eslint-disable-next-line react/no-danger
        <div dangerouslySetInnerHTML={{ __html: tooltip.split('\n').join('<br>') }} />
      ) : (
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
    </RtElementTooltipWrapper>
  </RtElement>
)

Basic.propTypes = {
  title: PropTypes.string.isRequired,
  start: PropTypes.instanceOf(Date).isRequired,
  end: PropTypes.instanceOf(Date).isRequired,
  style: PropTypes.shape({}),
  classes: PropTypes.arrayOf(PropTypes.string.isRequired),
  dataSet: PropTypes.shape({}),
  tooltip: PropTypes.string,
}

export default Basic
