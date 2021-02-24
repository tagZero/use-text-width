import { RefObject, useMemo } from 'react';

export interface useTextWidthOptions {
  text?: string | string[];
  font?: string;
  ref?: RefObject<Element>;
}

export interface useTextWidthType {
  ({ text, font, ref }: useTextWidthOptions): number;
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

const useTextWidth: useTextWidthType = ({ text, ref, font = '16px Times' }) => {
  return useMemo(() => {
    if (ref && ref.current) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(ref.current);
      context.font = computedStyles.font;
      const metrics = context.measureText(ref.current.textContent ?? '');
      return metrics.width;
    } else if (text) {
      return getTextWidth(text, font);
    }

    throw new TypeError('useTextWidth - Either `ref` OR `text` must be defined');
  }, [font, ref, text]);
};

export default useTextWidth;
