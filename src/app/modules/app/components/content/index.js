import React from 'react';
import InputTable from 'app/modules/app/components/input-table';
import ResultTable from 'app/modules/app/components/result-table';

const Content = ({ dataType, values, repeats, result }) => (
  <div className="col s9 h-100 scroll-y">
    <div className="content container">
      <div className="row">
        <div className="col s12" style={{ overflowX: 'auto' }}>
          <InputTable
            dataType={dataType}
            repeats={repeats}
            values={values}
            result={result}
          />
        </div>
      </div>
      <div className="row">
        <div id="chart" />
      </div>
      <div className="row">
        <div className="col s12">
          <ResultTable result={result} />
        </div>
      </div>
    </div>
  </div>
);

export default Content;
