import { last, range, first, sortBy } from 'lodash';

export const isAbleToMerge = (range1: number[], range2: number[]) => {
  const [leftRange, rightRange] = sortBy([range1, range2], range => range[0]);
  const endA = last(leftRange)!;
  const startB = first(rightRange)!;
  return startB - endA <= 2;
};

export const mergeRange = (rangeA: number[], rangeB: number[]) => {
  const startA = first(rangeA)!;
  const endA = last(rangeA)!;
  const startB = first(rangeB)!;
  const endB = last(rangeB)!;
  if (!isAbleToMerge(rangeA, rangeB)) {
    throw new Error(`Not able to merge: ranges: ${startA} --> ${endA} and ${startB} --> ${endB}`);
  }
  return range(Math.min(startA, startB), Math.max(endA, endB) + 1);
};

const mergeRanges = (ranges: number[][]): number[][] => {
  const sortedRanges = sortBy(ranges, range => first(range));
  return sortedRanges.reduce((result, range) => {
    const lastRange = last(result);
    if (lastRange && isAbleToMerge(lastRange, range)) {
      return result.slice(0, -1).concat([mergeRange(lastRange, range)]);
    }
    return result.concat([range]);
  }, [] as number[][]);
};

export const calcRanges = ({
  active,
  total,
  startBoundaryCount,
  endBoundaryCount,
  siblingCount
}: {
  active: number;
  total: number;
  startBoundaryCount: number;
  endBoundaryCount: number;
  siblingCount: number;
}): number[][] => {
  const normalizePageNumber = (page: number) => Math.min(Math.max(1, page), total);
  const range1 = range(normalizePageNumber(1), normalizePageNumber(startBoundaryCount) + 1);
  const range2 = range(
    normalizePageNumber(active - siblingCount),
    normalizePageNumber(active + siblingCount) + 1
  );
  const range3 = range(
    normalizePageNumber(total - endBoundaryCount + 1),
    normalizePageNumber(total) + 1
  );
  return mergeRanges([range1, range2, range3]);
};
