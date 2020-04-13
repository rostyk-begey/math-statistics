import React from 'react';
import { INPUT_TYPE_FILE, INPUT_TYPE_MANUAL } from 'app/constants';
import { randInt } from 'app/modules/helpers';

const DiscreteInputs = ({
  active,
  data: { values, repeats },
  loadFileData,
  setData,
  setInputType,
}) => {
  const onInput = ({ target: { name, value } }) => setData(name, value);

  return (
    <div style={{ display: active ? 'block' : 'none' }}>
      <div className="left-align teal-text">
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
          onClick={() => {
            setData('repeats', values.map(() => randInt()).join(' '));
          }}
        >
          Random
          <i className="material-icons right">shuffle</i>
        </button>
      </div>

      <input
        className="teal-text text-lighten-1"
        type="text"
        name="values"
        placeholder="values"
        // value={values.join(' ')}
        onInput={onInput}
      />
      <input
        className="teal-text text-lighten-1"
        type="text"
        name="repeats"
        placeholder="repeats"
        // value={repeats.join(' ')}
        onInput={onInput}
      />
      <input type="file" id="csv" placeholder="CSV" onChange={loadFileData} />
    </div>
  );
};

export default DiscreteInputs;
