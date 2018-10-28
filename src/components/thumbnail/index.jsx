import React from 'react';
import classNames from 'classnames';

import './style.css';

export default props => {
  const handleClickProxy = e => {
    props.handleClick(props);
  };

  return (
    <button
      id={`thumbnail-${props.id}`}
      type="button"
      className={classNames('thumbnail', { 'is-active': props.isActive })}
      onClick={handleClickProxy}
    >
      <img src={props.image} />
    </button>
  );
};
