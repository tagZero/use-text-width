# useTextWidth

React hook to calculate text width

## Install

```bash
npm install @imagemarker/use-text-width
# OR
yarn add @imagemarker/use-text-width
```

## Usage

Run `yarn start` to view [example](src/examples/simple.tsx) on http://localhost:5000

There are 2 types of usages:

#### 1. text & font

You can pass object having `text` (mandatory, string) and `font` (optional, CSS font string) properties to calculate width.
 
```jsx
import { useTextWidth } from '@imagemarker/use-text-width';

const App = () => {
  const width = useTextWidth({ text: 'Hello world!', font: '20px Times' });

  return (
    <p>Hello world! text width: {width}px</p>
  );
};
```

#### 2. ref

You can pass object having `ref` (mandatory, HTMLElement) property to calculate width.
 
```jsx
import { useTextWidth } from '@imagemarker/use-text-width';

const App = () => {
  const ref = useRef();
  const width = useTextWidth({ ref });

  return (
    <p ref={ref} style={{ fontSize: '16pt', fontWeight: 'bold' }}>
      lorem ipsum! text width: {width}px
    </p>
  );
};
```

## License

![The MIT License](https://img.shields.io/badge/license-MIT-brightgreen.svg)

Please see [License File](LICENSE.md) for more information.
