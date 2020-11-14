import React, { useEffect, useState } from 'react';

export interface useTextWidthType {
  ({ text, font }: { text: string; font?: string }): number;
}

const useTextWidth: useTextWidthType = ({ text, font = '16px Times' }) => {
  const [width, setWidth] = useState(-1);

  useEffect(() => {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const canvas: HTMLCanvasElement = document.createElement('canvas');
    fragment.appendChild(canvas);
    const context = canvas.getContext('2d');
    context.font = font;
    const metrics = context.measureText(text);
    setWidth(metrics.width);
  }, [font, text]);

  return width;
};

export default useTextWidth;
