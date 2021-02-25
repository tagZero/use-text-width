import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import useTextWidth from '../useTextWidth';

const App = () => {
  const ref = useRef(null);
  const width = useTextWidth({ ref });

  console.log(width);

  return (
    <p ref={ref} style={{ fontSize: '16pt', fontWeight: 'bold' }}>
      lorem ipsum!
    </p>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
