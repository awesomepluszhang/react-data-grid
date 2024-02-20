import { memo, forwardRef, HTMLAttributes, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { useDualModeState } from '../hooks';
import { calcRanges } from '../utils';
import { last } from 'lodash';

export type PaginationBaseProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
  total: number;
  page: number;
  defaultPage?: number;
  onChange?: (page: number) => void;
  disabled?: boolean;
  startBoundaryCount?: number;
  endBoundaryCount?: number;
  siblingCount?: number;
};

const Container = styled.div<{ disabled: boolean }>`
  display: flex;
  align-items: center;
  user-select: none;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
  justify-content: center;
  color: #2f2f2f;
`;

const PageControlSvg = styled.svg<{ disabled: boolean }>`
  width: 1em;
  flex: 0 0 1rem;
  height: 1em;
  stroke: #2f2f2f;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  margin: 14px;
  cursor: pointer;
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};
`;

const StepItem = styled.span<{ $active: boolean }>`
  padding: 0.8rem 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ $active }) => ($active ? '#2F2F2F' : 'transparent')};
  color: ${({ $active }) => ($active ? '#FFF8E7' : 'inherit')};
  cursor: pointer;
`;

const Inline = styled.div`
  display: inline-flex;
  flex-direction: row;
  padding: 0;
  > * {
    flex-grow: 0;
  }
  > * + * {
    margin-left: 0.5rem;
  }
`;

export const Pagination = memo(
  forwardRef<HTMLDivElement, PaginationBaseProps>((props, ref) => {
    const {
      total,
      page,
      defaultPage,
      onChange,
      disabled = false,
      siblingCount = 1,
      startBoundaryCount = 1,
      endBoundaryCount = 1,
      ...others
    } = props;
    const [finalPage, setInternalPage] = useDualModeState(defaultPage ?? 1, page);

    const disablePrev = finalPage <= 1;
    const handlePrev = useCallback(() => {
      if (disablePrev || disabled) return;
      setInternalPage(finalPage - 1);
      onChange?.(finalPage - 1);
    }, [finalPage, onChange, setInternalPage, disablePrev, disabled]);

    const disableNext = finalPage >= total;
    const handleNext = useCallback(() => {
      if (disableNext || disabled) return;
      setInternalPage(finalPage + 1);
      onChange?.(finalPage + 1);
    }, [finalPage, onChange, setInternalPage, disableNext, disabled]);

    const goto = useCallback(
      (target: number) => {
        setInternalPage(target);
        onChange?.(target);
      },
      [setInternalPage, onChange]
    );

    const ranges = useMemo(
      () =>
        calcRanges({
          active: page,
          total,
          startBoundaryCount,
          endBoundaryCount,
          siblingCount
        }),
      [endBoundaryCount, page, siblingCount, startBoundaryCount, total]
    );

    return (
      <Container ref={ref} disabled={disabled} {...others}>
        <PageControlSvg
          data-control-type="prev_page"
          onClick={handlePrev}
          viewBox="0 0 8 14"
          fill="none"
          disabled={disablePrev}
        >
          <path d="M7 1L1 7L7 13" />
        </PageControlSvg>
        <Inline>
          {ranges.slice(0, -1).map((range, index) => (
            <Inline key={index}>
              {range.map(num => (
                <StepItem key={num} onClick={() => goto(num)} $active={num === page}>
                  {num}
                </StepItem>
              ))}
              <StepItem $active={false}>...</StepItem>
            </Inline>
          ))}
          {last(ranges)?.map(num => (
            <StepItem key={num} onClick={() => goto(num)} $active={num === page}>
              {num}
            </StepItem>
          ))}
        </Inline>
        <PageControlSvg
          data-control-type="next_page"
          onClick={handleNext}
          viewBox="0 0 8 14"
          fill="none"
          disabled={disableNext}
        >
          <path d="M1 13L7 7L1 1" />
        </PageControlSvg>
      </Container>
    );
  })
);
