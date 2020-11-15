import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import useTextWidth from '../useTextWidth';

describe('useTextWidth', () => {
  const setup = ({ text, font }: { text: string | string[]; font?: string }) =>
    renderHook(() => useTextWidth({ text, font }));

  test('calculate text width with default font', () => {
    const { result } = setup({ text: 'Hello world!' });
    expect(result.current).toBe(81);
  });

  test('calculate text width with different font', () => {
    const { result } = setup({ text: 'Hello world!', font: '18pt Helvetica' });
    expect(result.current).toBe(123);
  });

  test('calculate max width in text array', () => {
    const { result } = setup({ text: ['foo', 'Hello world!', 'bar'] });
    expect(result.current).toBe(81);
  });
});
