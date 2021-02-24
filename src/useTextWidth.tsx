import { RefObject, useMemo } from 'react';

export type useTextWidthTextOptions = {
  text: string | string[];
  font?: string;
};

export type useTextWidthRefOptions = {
  ref: RefObject<Element>;
};

export interface useTextWidthType {
  (options: useTextWidthTextOptions | useTextWidthRefOptions): number;
}

const getContext = () => {
  const fragment: DocumentFragment = document.createDocumentFragment();
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d') as CanvasRenderingContext2D;
};

const getTextWidth = (currentText: string | string[], font: string) => {
  const context = getContext();
  context.font = font;

  if (Array.isArray(currentText)) {
    return Math.max(...currentText.map((t) => context.measureText(t).width));
  } else {
    const metrics = context.measureText(currentText);
    return metrics.width;
  }
};

const useTextWidth: useTextWidthType = (options) => {
  const textOptions = useMemo(() => ('text' in options ? options : undefined), [options]);
  const refOptions = useMemo(() => ('ref' in options ? options : undefined), [options]);

  return useMemo(() => {
    if (refOptions?.ref) {
      if (!refOptions.ref.current || refOptions.ref.current.textContent === null) return NaN;

      const context = getContext();
      const computedStyles = window.getComputedStyle(refOptions.ref.current);
      context.font = computedStyles.font;
      const metrics = context.measureText(refOptions.ref.current.textContent);

      return metrics.width;
    } else if (textOptions?.text) {
      return getTextWidth(textOptions.text, textOptions.font ?? '16px times');
    }

    throw new TypeError('useTextWidth - Either `ref` OR `text` must be defined');
  }, [textOptions?.text, textOptions?.font, refOptions?.ref]);
};

export default useTextWidth;
