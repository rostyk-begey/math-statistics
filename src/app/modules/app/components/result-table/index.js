import React from 'react';
import { DATA_LABELS } from 'app/constants';

const ResultTable = ({ result: { output } }) => (
  <table id="result-table" className="striped">
    <tbody>
      {Object.entries(output).map(([key, val]) => (
        <tr key={key}>
          <th>{DATA_LABELS[key] || key}</th>
          <td>{val}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default ResultTable;
