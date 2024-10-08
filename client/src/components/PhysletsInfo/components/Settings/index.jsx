import PropTypes from 'prop-types'

import { Text } from 'src/components/Text'

import SettingsWrapper from './SettingsWrapper'
import TableSettings from './TableSettings'
import GraphSettings from './GraphSettings'

function Settings({ type, tableCol, x, y, changeType, name, domains }) {
  const content =
    type === 'table' ? (
      <TableSettings tableCol={tableCol} changeType={changeType} name={name} />
    ) : (
      <GraphSettings
        changeType={changeType}
        name={name}
        x={x}
        y={y}
        domains={domains}
      />
    )
  return (
    <SettingsWrapper className="setting-wrapper">
      <Text as="p" className="title-setting" content="settings" />
      {content}
    </SettingsWrapper>
  )
}

Settings.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tableCol: PropTypes.array.isRequired,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  changeType: PropTypes.func.isRequired,
  domains: PropTypes.object.isRequired,
}

export default Settings
