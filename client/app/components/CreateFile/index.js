import React from 'react';
import PropTypes from 'prop-types';

import CloseButton from 'components/CloseButton';

import CreateFileWrapper from './CreateFileWrapper';

class CreateFile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      errMssv: false,
      errEx: false,
    };
  }

  submit = (e) => {
    e.preventDefault();
    const mssv = this.mssv.value;
    const ex = this.ex.value;
    if (!mssv) {
      this.setState({ errMssv: true });
    }

    if (!ex) {
      this.setState({ errEx: true });
    }

    if (mssv && ex) {
      this.setState({ errMssv: false, errEx: false });
      this.props.submit(e);
    }
  }

  render() {
    const { errMssv, errEx } = this.state;
    const { title } = this.props;

    return (
      <CreateFileWrapper>
        <form className="login-form" onSubmit={this.submit}>
          <span className="form-title">{title}</span>
          <div className="form-group">
            <div className="form-input">
              <input
                className="mssv"
                type="text"
                id="mssv"
                name="mssv"
                placeholder="Mssv"
                ref={(node) => { this.mssv = node; }}
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
                ref={(node) => { this.ex = node; }}
              />
              {errEx && <span className="notice-err">Vui lòng nhập tên bài tập!</span>}
            </div>
          </div>
          <button
            type="submit"
            className="btn-submit"
          >
            {title}
          </button>
          <CloseButton onClick={this.props.close} />
        </form>
      </CreateFileWrapper>
    );
  }
}

CreateFile.propTypes = {
  submit: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default CreateFile;
