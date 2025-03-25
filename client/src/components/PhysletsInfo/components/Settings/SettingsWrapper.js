import styled from 'styled-components'

const SettingsWrapper = styled.div`
  .title-setting {
    margin-bottom: 1.5rem;
  }

  .list-checkbox {
    margin: 0 -1rem;

    .custom-checkbox {
      display: inline-block;
      width: 13.5rem;
      padding: 0 1rem;
      margin-bottom: 1.5rem;
    }
  }

  .row {
    margin: 0 -1rem;

    .col {
      width: 50%;
      float: left;
      padding: 0 1rem;
      margin: 0 0 1.5rem;
    }
  }

  .custom-select {
    width: 100%;
  }

  .custom-input {
    width: 100%;
    margin-top: 1.5rem;

    label,
    input {
      display: inline-block;
      vertical-align: middle;
    }

    label {
      font-size: 1.5rem;
      width: 20%;
    }

    input {
      width: 80%;
    }
  }
`

export default SettingsWrapper
