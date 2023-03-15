import { getMaxDate, getMinDate } from './date';

describe("date", () => {
  const d1 = new Date('2000')
  const d2 = new Date('2022')
  describe("getMaxDate", () => {
    it("should return d2", () => {
      expect(getMaxDate(d1, d2)).toBe(d2);
    });
  });
  describe("getMinDate", () => {
    it("should return d1", () => {
      expect(getMinDate(d1, d2)).toBe(d1);
    });
  });
});
