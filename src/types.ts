import type { CSSProperties, ReactElement, ReactNode } from "react";
import { ClickElementHandler } from "./components/Timeline/Tracks/Element";

export interface Cell {
  end: Date;
  id: string;
  start: Date;
  time?: TimeSettings;
  title: string;
}

export interface Element {
  classes?: string[];
  clickElement?: ClickElementHandler;
  dataSet?: Record<string, string>;
  end: Date;
  id: string;
  start: Date;
  style: CSSProperties;
  time: TimeSettings;
  title: string;
  tooltip?: string;
  continuing: ReactNode;
}

export interface ScaleSettings {
  end: Date;
  start: Date;
  zoom: number;
  zoomMax?: number;
  zoomMin?: number;
}

export interface StickySettings {
  handleHeaderScrollY: (scrollY: number) => void;
  headerHeight?: number;
  isSticky: boolean;
  scrollLeft: number;
  setHeaderHeight: (height: number) => void;
  sidebarWidth?: number;
  viewportWidth?: number;
}

export interface TimebarEntry {
  cells: Cell[];
  id: string;
  style: CSSProperties;
  title: string;
  useAsGrid?: boolean;
}

export interface TimeSettings {
  end: Date;
  fromX: (x: number) => Date;
  start: Date;
  timelineWidth: number;
  timelineWidthStyle: string;
  toStyleLeft: (from: Date) => CSSProperties;
  toStyleLeftAndWidth: (from: Date, to: Date) => CSSProperties;
  toX: (from: Date) => number;
  zoom: number;
}

export interface Track {
  elements: Element[];
  hasButton?: boolean;
  id: string;
  isOpen?: boolean;
  sideComponent?: ReactElement;
  title: string;
  tracks?: Track[];
}
