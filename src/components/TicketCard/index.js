import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import FlightInfo from '../FlightInfo';
import genericLogo from '../../assets/generic-logo.png';

import styles from './TicketCard.module.css';

const Card = (props) => {
  const {
    price = 10000,
    time = 10000,
    city = 10000,
    date = 10000,
  } = props;

  return (
      <div className={styles.card}>
          <div className={styles.left}>
              <img
                src={genericLogo}
                alt="Airline Logo"
                className={styles.companyLogo}
              />
              <Button price={price} />
          </div>
          <div className={styles.right}>
              <FlightInfo
                time={time}
                city={city}
                date={date}
              />
              <FlightInfo
                time={time}
                city={city}
                date={date}
              />
          </div>
      </div>
  );
};

Card.propTypes = {
  price: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default Card;
