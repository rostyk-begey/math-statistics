import React from 'react';
import jStat from 'jstat';
import { DATA_TYPE_CONTINUOUS } from 'app/constants';

// console.log('test', jStat.binomial.pdf);
console.log('binomial pdf => ', jStat.binomial.pdf(0, 4, 0.8)); // TODO
const InputTable = ({
  dataType,
  values,
  repeats,
  result: { probabilities },
}) => (
  <table id="input-table" className="input-table">
    <tbody>
      {dataType === DATA_TYPE_CONTINUOUS && (
        <tr>
          <th />
          {values
            .map(el => {
              const step = (values[1] - values[0]) / 2;
              return `${el - step} - ${el + step}`;
            })
            .map((el, i) => (
              // eslint-disable-next-line react/no-array-index-key
              <td key={`${el}-${i}`}>{el}</td>
            ))}
        </tr>
      )}
      <tr>
        <th>
          X<sub>i</sub>
        </th>
        {values.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <td key={`${el}-${i}`}>{el}</td>
        ))}
      </tr>
      <tr>
        <th>
          N<sub>i</sub>
        </th>
        {repeats.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <td key={`${el}-${i}`}>{el}</td>
        ))}
      </tr>
      <tr>
        <th>
          p<sub>i</sub>
          {/*<sup>l</sup>*/}
        </th>
        {probabilities.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <td key={`${el}-${i}`}>{el}</td>
        ))}
      </tr>
      <tr>
        <th>
          X<sub>i</sub>*N<sub>i</sub>
        </th>
        {values.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <td key={`${el}-${i}`}>{el * repeats[i]}</td>
        ))}
      </tr>
      <tr>
        <th>
          X<sub>i</sub>
          <sup>2</sup>*N<sub>i</sub>
        </th>
        {values.map((el, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <td key={`${el}-${i}`}>{el * el * repeats[i]}</td>
        ))}
      </tr>
    </tbody>
  </table>
);

export default InputTable;
