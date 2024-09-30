import PropTypes from 'prop-types'
import { map, times, get } from 'lodash'

import { roundNum } from 'src/utils/number'
import bestFit from 'src/settings/bestFit'
import Select from 'src/components/Select'
import TextInput from 'src/components/TextInput'
import { Text } from 'src/components/Text'

import Wrapper from './Wrapper'

const getCoefficients = (type, data) => bestFit[type].auto(data)

const autoFit = (func, name, type, data) => () => {
  const coefficients = getCoefficients(type, data)
  func(name, 'coefficients', coefficients)
}

function AnalyzingPanel({ name, bestFitType, changeType, data, coefficients }) {
  const labels = get(bestFit, [bestFitType, 'labels'])
  const content = (
    <div className="content">
      <p className="label-math">{get(bestFit, [bestFitType, 'label'])}</p>
      {times(get(bestFit, [bestFitType, 'coefficients']), (index) => (
        <TextInput
          key={index}
          id={`${name}-coefficient-${index}`}
          label={`${labels[index]}:`}
          value={roundNum(coefficients[index])}
          onChange={(e) =>
            changeType(name, 'coefficients', {
              index,
              value: parseFloat(e.target.value),
            })
          }
          step={0.01}
        />
      ))}
      {get(bestFit, [bestFitType, 'auto']) && (
        <Text
          as="button"
          className="auto-btn"
          onClick={autoFit(changeType, name, bestFitType, data)}
          content="auto"
        />
      )}
    </div>
  )

  return (
    <Wrapper className="analyzing-info">
      <Text as="h3" className="title" content="analyze_graph" />
      <Select
        id={`${name}-bestfit`}
        onChange={(e) => changeType(name, 'bestFit', e.target.value)}
        value={bestFitType}
      >
        <Text as="option" value="" content="default" />
        {map(bestFit, (item, key) => (
          <Text as="option" key={key} value={key} content={item.name} />
        ))}
      </Select>
      {bestFitType ? content : <p>Hãy chọn phương trình</p>}
    </Wrapper>
  )
}

AnalyzingPanel.propTypes = {
  name: PropTypes.string.isRequired,
  bestFitType: PropTypes.string.isRequired,
  changeType: PropTypes.func.isRequired,
  coefficients: PropTypes.array,
  data: PropTypes.opbject,
}

export default AnalyzingPanel
