import React from 'react';
import PropTypes from 'prop-types';

import Button from './PurchaseButton';
import FlightInfo from './FlightInfo';
import Stops from './Stops';

import genericLogo from '../../assets/generic-logo.png';

import styles from './TicketCard.module.css';

const TicketCard = (props) => {
  const {
    price = 10000,
    time = 10000,
    city = 10000,
    date = 10000,
    stops = 1,
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
              <Stops stops={stops} />
              <FlightInfo
                time={time}
                city={city}
                date={date}
              />
          </div>
      </div>
  );
};

TicketCard.propTypes = {
  price: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.string.isRequired,
};

export default TicketCard;
