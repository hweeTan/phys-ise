import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import CloseButton from 'src/components/CloseButton'
import { Text } from 'src/components/Text'

import CreateFileWrapper from './CreateFileWrapper'

const CreateFile = ({ title, submit, close }) => {
  const [errMssv, setErrMssv] = useState(false)
  const [errEx, setErrEx] = useState(false)

  const mssvRef = useRef(null)
  const exRef = useRef(null)

  const onSubmit = (e) => {
    e.preventDefault()
    const mssv = mssvRef.current.value
    const ex = exRef.current.value
    if (!mssv) {
      setErrMssv(true)
    }

    if (!ex) {
      setErrEx(true)
    }

    if (mssv && ex) {
      setErrMssv(false)
      setErrEx(false)
      submit(e)
    }
  }

  return (
    <CreateFileWrapper>
      <form className="login-form" onSubmit={onSubmit}>
        <Text className="form-title" content={title} />
        <div className="form-group">
          <div className="form-input">
            <Text as="label" content="student_number" htmlFor="mssv" />
            <input
              className="mssv"
              type="text"
              id="mssv"
              name="mssv"
              ref={mssvRef}
            />
            {errMssv && (
              <Text content="required_error" className="notice-err" />
            )}
          </div>
          <div className="form-input">
            <Text as="label" content="file_name" htmlFor="filename" />
            <input
              className="filename"
              type="text"
              id="filename"
              name="filename"
              ref={exRef}
            />
            {errEx && <Text content="required_error" className="notice-err" />}
          </div>
        </div>
        <Text
          as="button"
          content={title}
          type="submit"
          className="btn-submit"
        />
        <CloseButton onClick={close} />
      </form>
    </CreateFileWrapper>
  )
}

CreateFile.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
}

export default CreateFile
