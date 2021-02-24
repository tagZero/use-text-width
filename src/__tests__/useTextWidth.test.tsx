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

  test('calculates text width of existing dom element', () => {
    const el = document.createElement('span');
    el.textContent = 'Hello World!';
    const { result } = renderHook(() => useTextWidth({ ref: { current: el } }));
    expect(result.current).toBe(54);
  });

  test('calculates text width of empty element', () => {
    // Getting an element that returns `null` for `textContent`
    // isn't easy
    const proxy = new Proxy(document.createElement('img'), {
      get(el, p) {
        if (p === 'textContent') {
          return null;
        }

        return el[p as keyof typeof el];
      }
    });

    const { result } = renderHook(() => useTextWidth({ ref: { current: proxy } }));
    expect(result.current).toBe(NaN);
  });

  test('ref returns NaN when null', () => {
    const { result } = renderHook(() => useTextWidth({ ref: { current: null } }));
    expect(result.current).toBe(NaN);
  });

  test('throws when options are missing', () => {
    // @ts-expect-error
    const { result } = renderHook(() => useTextWidth({}));
    expect(result.error).toBeTruthy();
  });
});
