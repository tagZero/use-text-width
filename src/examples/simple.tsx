import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useTextWidth from '../useTextWidth';

const App = () => {
  const [text, setText] = useState('Hello World!');
  const [fontType, setFontType] = useState('Times');
  const [fontSize, setFontSize] = useState('16px');

  const font = `${fontSize} ${fontType}`;
  const width = useTextWidth({ text, font });

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setText(event.currentTarget.value);
  };

  const onFontTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setFontType(event.currentTarget.value);
  };

  const onFontSizeChange = (event: React.FormEvent<HTMLInputElement>) => {
    setFontSize(event.currentTarget.value);
  };

  return (
    <div>
      <div>
        <label>
          Your text:&nbsp;
          <input type="text" value={text} onChange={onChange} />
        </label>
      </div>
      <div>
        <label>
          Font type:&nbsp;
          <select onChange={onFontTypeChange}>
            <option value="Times">Times</option>
            <option value="Helvetica">Helvetica</option>
          </select>
        </label>
        &nbsp;
        <label>
          Font size:&nbsp;
          <input type="text" value={fontSize} onChange={onFontSizeChange} />
        </label>
      </div>
      <div>
        <p>
          "{text}" text width is {width}px
        </p>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
