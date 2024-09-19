import { useState, useRef } from 'react'
import PropTypes from 'prop-types'

import CloseButton from 'src/components/CloseButton'

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
        <span className="form-title">{title}</span>
        <div className="form-group">
          <div className="form-input">
            <input
              className="mssv"
              type="text"
              id="mssv"
              name="mssv"
              placeholder="Mssv"
              ref={mssvRef}
            />
            {errMssv && <span className="notice-err">Vui lòng nhập MSSV!</span>}
          </div>
          <div className="form-input">
            <input
              className="filename"
              type="text"
              id="filename"
              name="filename"
              placeholder="Tên bài"
              ref={exRef}
            />
            {errEx && (
              <span className="notice-err">Vui lòng nhập tên bài tập!</span>
            )}
          </div>
        </div>
        <button type="submit" className="btn-submit">
          {title}
        </button>
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
