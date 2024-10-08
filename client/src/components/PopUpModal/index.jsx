import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

import colors from 'src/styles/colors'

const defaultStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '44rem',
    backgroundColor: colors.blue,
    borderRadius: 0,
  },
}

function PopUpModal({
  isOpen = false,
  contentLabel = 'Modal',
  modalStyle = defaultStyle,
  children,
}) {
  return (
    <Modal isOpen={isOpen} style={modalStyle} contentLabel={contentLabel}>
      {React.Children.toArray(children)}
    </Modal>
  )
}

PopUpModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  contentLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  modalStyle: PropTypes.object,
}

export default PopUpModal
