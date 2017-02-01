import React, {PropTypes} from 'react';

const FunctionalComponent = (props) => {
  return(
    <div>
      <p>This comes from the Functional Component.</p>
      <p>This comes from prop defined in the parent component: {props.name}</p>
    </div>
  );
};

FunctionalComponent.propTypes = {
  name: PropTypes.string
};

export default FunctionalComponent;
