import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ price }) => (
    <div className="buyButton">
        <div>Купить</div>
        <div>{`за ${price}`}</div>
    </div>
);

Button.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Button;
