import React, { useState, useEffect, useCallback, useRef } from 'react';
import c3 from 'c3';
import jStat from 'jstat';
import { calcFunctionInv } from 'app/modules/helpers';
import Papa from 'papaparse';
import Sidebar from 'app/modules/app/components/sidebar';
import {
  DEFAULT_CHART_TYPE,
  DATA_TYPE_DISCRETE,
  DATA_TYPE_CONTINUOUS,
} from 'app/constants';
import Nav from '../nav';
import Content from '../content';

const useData = dataType => {
  const [values, setValues] = useState([]);
  const [repeats, setRepeats] = useState([]);

  const setData = useCallback(
    (key, val) => {
      let value = val.split(' ').reduce((acc, el) => {
        const parsed = parseFloat(el);
        if (parsed) acc.push(parsed);
        return acc;
      }, []);
      if (key === 'values' && dataType === DATA_TYPE_CONTINUOUS) {
        const step = value[1] - value[0];
        value = value.map(el => el + step / 2);
      }

      if (key === 'repeats') setRepeats(value);
      else if (key === 'values') setValues(value);
    },
    [dataType],
  );

  return { values, repeats, setData };
};

const useDataCalculator = (values, repeats) => {
  const data = jStat(
    values.reduce((acc, el, i) => [...acc, ...Array(repeats[i]).fill(el)], []),
  );

  const xnTotal = data.sum();

  const x2nTotal = jStat(repeats)[0].reduce(
    (acc, el, i) => acc + el * values[i] ** 2,
    0,
  );

  const result = {
    TOTAL_N: jStat(repeats).sum(),
    TOTAL_X_N: xnTotal,
    TOTAL_X_2_N: x2nTotal,
    MEAN: data.mean(),
    MEDIAN: data.median(),
    VARIANCE: data.variance(),
    SMPL_VARIANCE: data.variance(true),
    STD_DEVIATION: data.stdev(),
    SMPL_STD_DEVIATION: data.stdev(true),
    MEAN_DEVIATION: data.meandev(),
    MEDIAN_DEVIATION: data.meddev(),
    QUARTILES: data.quartiles(),
  };

  const { TOTAL_X_N, TOTAL_N } = result;

  const avgProbability = (TOTAL_N * repeats.length) / TOTAL_X_N;

  const probabilities = values.map((el, i) =>
    jStat.binomial.pdf(i, repeats.length, avgProbability),
  );

  const OBSERVED_VALUE = probabilities
    .map(el => el * TOTAL_N)
    .reduce((acc, el, i) => acc + (repeats[i] - el) ** 2 / el, 0);

  const CRITICAL_VALUE = calcFunctionInv(values.length - 2, 0.05);

  return {
    output: { ...result, OBSERVED_VALUE, criticalValue: CRITICAL_VALUE },
    probabilities,
    OBSERVED_VALUE,
  };
};

const useChart = (
  element,
  { values, repeats },
  chartType = DEFAULT_CHART_TYPE,
) => {
  const chart = useRef(null);

  useEffect(() => {
    chart.current = c3.generate({
      bindto: element,
      data: {
        x: 'x',
        columns: [['x'], ['values']],
        types: {
          values: chartType,
        },
      },
      grid: {
        x: {
          show: true,
        },
        y: {
          show: true,
        },
      },
      zoom: {
        enabled: true,
      },
    });
  }, []);

  useEffect(() => {
    chart.current.transform(chartType);
  }, [chartType]);

  useEffect(() => {
    chart.current.load({
      columns: [['x', ...values], ['values', ...repeats]],
    });
  }, [values, repeats]);

  return { chart };
};

const App = () => {
  const [chartType, setChartType] = useState(DEFAULT_CHART_TYPE);
  const [dataType, setDataType] = useState(DATA_TYPE_DISCRETE);
  const { values, repeats, setData } = useData(dataType);
  useChart('#chart', { values, repeats }, chartType);

  const result = useDataCalculator(values, repeats);

  const loadFileData = useCallback(({ target: { files: [file] } }) => {
    Papa.parse(file, {
      delimiter: ', ',
      complete: ({ data: [values, repeats] }) => {
        setData('values', values.join(', '));
        setData('repeats', repeats.join(', '));
      },
    });
  }, []);

  return (
    <>
      <Nav />

      <div className="row wrapper full-height">
        <Sidebar
          data={{ values, repeats }}
          loadFileData={loadFileData}
          setData={setData}
          setChartType={setChartType}
          setDataType={setDataType}
          dataType={dataType}
          chartType={chartType}
        />

        <Content
          dataType={dataType}
          values={values}
          repeats={repeats}
          result={result}
        />
      </div>
    </>
  );
};

export default App;
