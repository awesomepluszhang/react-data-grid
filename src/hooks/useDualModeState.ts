import { useState, Dispatch, SetStateAction } from 'react';

export const useDualModeState = <T>(
  defaultValue: T,
  value?: T
): [T, Dispatch<SetStateAction<T>>] => {
  const [internalValue, setInternalValue] = useState<T>(defaultValue);
  const finalValue = value !== undefined ? value : internalValue;
  return [finalValue, setInternalValue];
};
