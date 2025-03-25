import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts'

import formulaSettings from 'src/settings/formulas'
import colors from 'src/styles/colors'
import { Text } from 'src/components/Text'
import { i18n } from 'src/i18n'

import { getChartData, normalizeData } from './utils/helpers'
import Wrapper from './Wrapper'
import AnalyzingPanel from './components/AnalyzingPanel'

const CustomTooltip = ({
  active,
  payload,
  label,
  xLabel,
  yLabel,
  xUnit,
  yUnit,
}) => {
  if (active && payload && payload.length) {
    return (
      <>
        <p>
          <Text content={xLabel} />: {label.toFixed(3)} <Text content={xUnit} />
        </p>
        <p>
          <Text content={yLabel} />: {payload[0].value?.toFixed(3)}{' '}
          <Text content={yUnit} />
        </p>
      </>
    )
  }

  return null
}

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
  } = props
  const transformedData = getChartData(data, x, y, bestFit, coefficients)
  const chartWidth = isFullscreen ? 800 : 400
  const chartHeight = isFullscreen ? 580 : 256

  if (transformedData) {
    const showBestFit = !!bestFit && !!coefficients.length
    return (
      <Wrapper $isFullscreen={isFullscreen}>
        <LineChart
          className="line-chart"
          width={chartWidth}
          height={chartHeight}
          data={transformedData}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="x"
            label={{
              value: `${i18n[formulaSettings[x].label]} (${i18n[formulaSettings[x].unit]})`,
              position: 'insideBottom',
              offset: 0,
            }}
            domain={[domains.xfrom || 'dataMin', domains.xto || 'dataMax']}
            tickFormatter={(value) => value.toFixed(3)}
            allowDataOverflow
          />
          <YAxis
            type="number"
            label={{
              value: `${i18n[formulaSettings[y].label]} (${i18n[formulaSettings[y].unit]})`,
              position: 'insideLeft',
              angle: -90,
            }}
            domain={[domains.yfrom || 'dataMin', domains.yto || 'dataMax']}
            tickFormatter={(value) => value.toFixed(3)}
            allowDataOverflow
          />
          <Tooltip
            wrapperStyle={{
              backgroundColor: colors.white,
              border: `${colors.gray1} solid 1px`,
              padding: 10,
            }}
            content={
              <CustomTooltip
                xLabel={formulaSettings[x].label}
                yLabel={formulaSettings[y].label}
                xUnit={formulaSettings[x].unit}
                yUnit={formulaSettings[y].unit}
              />
            }
          />
          <Line type="monotone" dataKey="y" stroke={color} />
          {showBestFit && (
            <Line
              type="monotone"
              dataKey="bestfitY"
              stroke={colors.black}
              dot={false}
              activeDot={false}
            />
          )}
        </LineChart>
        {isFullscreen && (
          <AnalyzingPanel
            changeType={changeType}
            bestFitType={bestFit}
            name={name}
            coefficients={coefficients}
            data={normalizeData(data, x, y, domains)}
          />
        )}
      </Wrapper>
    )
  }

  return null
}

export default LineCharts
