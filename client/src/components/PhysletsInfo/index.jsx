import PropTypes from 'prop-types'
import { map } from 'lodash'

import Table from 'src/components/Table'
import LineCharts from 'src/components/LineCharts'
import Select from 'src/components/Select'

import iconExpand from 'src/images/icon-expand.png'
import iconSettings from 'src/images/icon-settings.png'
import iconGraph from 'src/images/icon-graph.png'
import iconTable from 'src/images/icon-table.png'

import Settings from './components/Settings'
import Wrapper from './Wrapper'

function PhysletsInfo({ settings, changeType, name, pointSettings, points }) {
  const {
    type,
    currentPoint,
    x,
    y,
    domainXfrom,
    domainXto,
    domainYfrom,
    domainYto,
    tableCol,
    isSettings,
    isFullscreen,
    bestFit,
    coefficients,
  } = settings

  const isTable = type === 'table'
  const renderContent = isTable ? (
    <Table tbody={points[currentPoint]} thead={tableCol} />
  ) : (
    <LineCharts
      data={points[currentPoint]}
      x={x}
      y={y}
      isFullscreen={isFullscreen}
      color={pointSettings.data[currentPoint].color}
      name={name}
      changeType={changeType}
      bestFit={bestFit}
      coefficients={coefficients}
      domains={{
        xfrom: parseFloat(domainXfrom),
        xto: parseFloat(domainXto),
        yfrom: parseFloat(domainYfrom),
        yto: parseFloat(domainYto),
      }}
    />
  )
  return (
    <Wrapper $isFullscreen={isFullscreen} className="physlet-item">
      <div className="infor-header">
        <button
          type="button"
          onClick={() => changeType(name, 'type', isTable ? 'graph' : 'table')}
        >
          <img
            alt={`icon-${isTable ? 'table' : 'graph'}`}
            src={isTable ? iconTable : iconGraph}
          />
          <span className="label">{isTable ? 'Bảng' : 'Đồ Thị'}</span>
        </button>
        <Select
          id={`${name}-point`}
          value={currentPoint}
          onChange={(e) => changeType(name, 'currentPoint', e.target.value)}
        >
          {map(pointSettings.data, (singlePoint, key) => (
            <option key={key} value={key}>
              {singlePoint.name}
            </option>
          ))}
        </Select>
        <button
          className="infor-expand"
          onClick={() => changeType(name, 'isFullscreen', !isFullscreen)}
        >
          <img className="infor-full" alt="icon expand" src={iconExpand} />
        </button>

        <button
          className="infor-expand"
          onClick={() => changeType(name, 'isSettings', !isSettings)}
        >
          <img className="infor-full" alt="icon settings" src={iconSettings} />
        </button>
      </div>
      <div className="infor-body">
        {isSettings ? (
          <Settings
            name={name}
            type={type}
            tableCol={tableCol}
            x={x}
            y={y}
            changeType={changeType}
            domains={{
              xfrom: domainXfrom,
              xto: domainXto,
              yfrom: domainYfrom,
              yto: domainYto,
            }}
          />
        ) : (
          renderContent
        )}
      </div>
    </Wrapper>
  )
}

PhysletsInfo.propTypes = {
  settings: PropTypes.object.isRequired,
  pointSettings: PropTypes.object.isRequired,
  changeType: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  points: PropTypes.object.isRequired,
}

export default PhysletsInfo
