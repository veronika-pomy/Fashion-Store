import React from 'react';

const DeleteBtn = (props) => {
  return (
    // tabindex="0" focusable in sequential keyboard navigation after any positive tabindex values - accessibility 
    <span {...props} role="button" tabIndex='0'>x</span>
  )
}

export default DeleteBtn;