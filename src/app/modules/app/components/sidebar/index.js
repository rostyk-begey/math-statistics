import React from 'react';
import {
  CHART_TYPES,
  DATA_TYPE_CONTINUOUS,
  DATA_TYPE_DISCRETE,
} from 'app/constants';
import classNames from 'classnames';
import DiscreteInputs from 'app/modules/app/components/discrete-inputs';
import ContinuousInputs from 'app/modules/app/components/continuous-inputs';

const INPUTS = {
  [DATA_TYPE_CONTINUOUS]: ContinuousInputs,
  [DATA_TYPE_DISCRETE]: DiscreteInputs,
};

const Sidebar = ({
  data,
  chartType,
  setChartType,
  dataType,
  setDataType,
  setInputType,
  setData,
  loadFileData,
}) => (
  <div className="col s3 grey lighten-1 h-100 center-align controls scroll-y">
    <div id="chart-types" className="collection">
      {CHART_TYPES.map(el => (
        <a
          key={el}
          href="#!"
          className={classNames(`collection-item`, {
            active: chartType === el,
          })}
          onClick={() => setChartType(el)}
        >
          {el}
        </a>
      ))}
    </div>

    <ul className="tabs tabs-fixed-width">
      <li className="tab col s3">
        <a
          href="#"
          className={classNames({
            active: dataType === DATA_TYPE_DISCRETE,
          })}
          onClick={() => setDataType(DATA_TYPE_DISCRETE)}
        >
          Discrete
        </a>
      </li>
      <li className="tab col s3">
        <a
          href="#"
          className={classNames({
            active: dataType === DATA_TYPE_CONTINUOUS,
          })}
          onClick={() => setDataType(DATA_TYPE_CONTINUOUS)}
        >
          Continuous
        </a>
      </li>
    </ul>

    {Object.entries(INPUTS).map(([type, Input]) => (
      <Input
        data={data}
        key={type}
        active={type === dataType}
        setData={setData}
        loadFileData={loadFileData}
        setInputType={setInputType}
      />
    ))}
  </div>
);

export default Sidebar;
