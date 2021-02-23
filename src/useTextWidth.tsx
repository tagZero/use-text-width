import { useMemo } from 'react';

export interface useTextWidthType {
  ({ text, font, ref }: { text?: string | string[]; font?: string; ref?: any }): number;
}

const getContext = () => {
  const fragment: DocumentFragment = document.createDocumentFragment();
  const canvas: HTMLCanvasElement = document.createElement('canvas');
  fragment.appendChild(canvas);
  return canvas.getContext('2d');
}

const getTextWidth = (currentText: string | string[], font: string) => {
  const context = getContext();
  context.font = font;

  if (Array.isArray(currentText)) {
    return Math.max(...currentText.map((t) => context.measureText(t).width));
  } else {
    const metrics = context.measureText(currentText);
    return metrics.width;
  }
}

const useTextWidth: useTextWidthType = ({ text, ref, font = '16px Times' }) => {
  return useMemo(() => {
    if (ref && ref.current) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(ref.current);
      context.font = computedStyles.font;
      const metrics = context.measureText(ref.current.textContent);
      return metrics.width;
    } else if (text) {
      return getTextWidth(text, font);
    }
  }, [font, ref, text]);
};

export default useTextWidth;
