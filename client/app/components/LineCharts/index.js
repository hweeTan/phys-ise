import React from 'react';
import PropTypes from 'prop-types';
import { LineChart } from 'rd3';

import formulaSettings from 'settings/formulas';
import colors from 'styles/colors';

import { getChartData, normalizeData } from './utils/helpers';
import Wrapper from './Wrapper';
import AnalyzingPanel from './components/AnalyzingPanel';

const colorChar = {
  domains: 'transparent',
  bestFit: colors.black,
};

function LineCharts(props) {
  const {
    data,
    x,
    y,
    isFullscreen,
    color,
    bestFit,
    changeType,
    name,
    coefficients,
    domains,
  } = props;
  const transformedData = getChartData(data, x, y, bestFit, coefficients, domains);
  const chartWidth = isFullscreen ? 800 : 400;
  const chartHeight = isFullscreen ? 580 : 256;
  if (transformedData) {
    return (
      <Wrapper isFullscreen={isFullscreen}>
        <LineChart
          legend={false}
          data={transformedData}
          width={chartWidth}
          height={chartHeight}
          xAxisLabel={`${formulaSettings[x].label} (${formulaSettings[x].unit})`}
          yAxisLabel={`${formulaSettings[y].label} (${formulaSettings[y].unit})`}
          gridHorizontal
          gridHorizontalStrokeDash="1000"
          gridVertical
          gridVerticalStrokeDash="1000"
          colors={(colorParam) => colorParam}
          colorAccessor={(series, index) => colorChar[transformedData[index].name] || color}
        />
        {isFullscreen &&
          (<AnalyzingPanel
            changeType={changeType}
            bestFitType={bestFit}
            name={name}
            coefficients={coefficients}
            data={normalizeData(data, x, y, domains)}
          />)
        }
      </Wrapper>
    );
  }

  return null;
}

LineCharts.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  isFullscreen: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  bestFit: PropTypes.string.isRequired,
  changeType: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  coefficients: PropTypes.array,
  domains: PropTypes.object,
};

export default LineCharts;
