import React, { useEffect, useState } from 'react';

export interface useTextWidthType {
  ({ text, font, ref }: { text?: string; font?: string; ref?: any }): number;
}

const useTextWidth: useTextWidthType = ({ text, ref, font = '16px Times' }) => {
  const [width, setWidth] = useState(-1);

  useEffect(() => {
    const getContext = () => {
      const fragment: DocumentFragment = document.createDocumentFragment();
      const canvas: HTMLCanvasElement = document.createElement('canvas');
      fragment.appendChild(canvas);
      return canvas.getContext('2d');
    };

    if (text) {
      const context = getContext();
      context.font = font;
      const metrics = context.measureText(text);
      setWidth(metrics.width);
    } else if (ref && ref.current) {
      const context = getContext();
      const computedStyles = window.getComputedStyle(ref.current);
      context.font = computedStyles.font;
      const metrics = context.measureText(ref.current.textContent);
      setWidth(metrics.width);
    }
  }, [font, text]);

  return width;
};

export default useTextWidth;
