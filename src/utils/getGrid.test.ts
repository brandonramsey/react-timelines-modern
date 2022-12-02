import { TimebarEntry } from "../types";
import getGrid from "./getGrid";

describe("getGrid", () => {
  it('returns the cells from the first timebar row that has "useAsGrid" set to true', () => {
    const timebar: TimebarEntry[] = [
      {
        id: "1",
        style: {},
        title: "Timebar 1",
        cells: [
          {
            id: "row-1-cell-1",
            end: new Date("2021-01-01"),
            start: new Date("2020-01-01"),
            title: "Cell 1-1",
          },
        ],
      },
      {
        id: "2",
        style: {},
        title: "Timebar 2",
        useAsGrid: true,
        cells: [
          {
            id: "row-2-cell-1",
            end: new Date("2021-01-01"),
            start: new Date("2020-01-01"),
            title: "Cell 2-1",
          },
        ],
      },
      {
        id: "3",
        style: {},
        title: "Timebar 3",
        useAsGrid: true,
        cells: [
          {
            id: "row-3-cell-1",
            end: new Date("2021-01-01"),
            start: new Date("2020-01-01"),
            title: "Cell 3-1",
          },
        ],
      },
    ];
    const actual = getGrid(timebar);
    expect(actual).toEqual([
      {
        id: "row-2-cell-1",
        end: new Date("2021-01-01"),
        start: new Date("2020-01-01"),
        title: "Cell 2-1",
      },
    ]);
  });

  it('returns empty array if none of the rows have "useAsGrid" set to true', () => {
    const timebar = [{ id: "1", style: {}, title: "1", cells: [] }];
    const actual = getGrid(timebar);
    expect(actual).toEqual([]);
  });
});
