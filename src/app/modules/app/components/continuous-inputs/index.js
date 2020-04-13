import React, { useState, useEffect } from 'react';
import jStat from 'jstat';
import { range, randInt } from 'app/modules/helpers';
import { INPUT_TYPE_FILE, INPUT_TYPE_MANUAL } from 'app/constants';

const ContinuousInputs = ({
  active,
  data: { values, repeats },
  inputType,
  loadFileData,
  setData,
  setInputType,
}) => {
  const [start, setStart] = useState(1);
  const [stop, setStop] = useState(10);
  const [count, setCount] = useState(9);
  useEffect(() => {
    setData('values', jStat(start, stop, count)[0].join(' '));
  }, [start, stop, count]);

  return (
    <div style={{ display: active ? 'block' : 'none' }}>
      <div className="left-align">
        <p>
          <label>
            <input
              type="number"
              placeholder="Start"
              defaultValue={start}
              step="0.25"
              min="0"
              onInput={({ target: { value } }) => setStart(parseFloat(value))}
            />
            <span>Start</span>
          </label>
        </p>
        <p>
          <label>
            <input
              type="number"
              placeholder="Stop"
              defaultValue={stop}
              step="0.25"
              min="0.25"
              onInput={({ target: { value } }) => setStop(parseFloat(value))}
            />
            <span>Stop</span>
          </label>
        </p>
        <p>
          <label>
            <input
              type="number"
              placeholder="Count"
              defaultValue={count}
              step="1"
              min="2"
              onInput={({ target: { value } }) => setCount(+value)}
            />
            <span>Count</span>
          </label>
        </p>
        <p>
          <button
            className="btn waves-effect waves-light"
            type="button"
            onClick={() => {
              setData(
                'repeats',
                Array(count)
                  .fill(0)
                  .map(() => randInt())
                  .join(' '),
              );
            }}
          >
            Random
            <i className="material-icons right">shuffle</i>
          </button>
        </p>
      </div>

      <input
        type="text"
        placeholder="repeats"
        name="repeats"
        // value={repeats.join(' ')}
        onInput={({ target: { name, value } }) => setData(name, value)}
      />
    </div>
  );
};

export default ContinuousInputs;
