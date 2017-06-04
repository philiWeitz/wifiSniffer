
import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './styles.scss';


const DeviceContainer = ({ device }) => {

  const signalStrengthToProgress = () => {
    return 120 + parseInt(device.signal, 10);
  };

  return (
    <div className={styles.deviceContainer}>
      <div>
        {device.mac}
      </div>
      <div>
        {device.mcuId}
      </div>
      <div>
        {device.signal}
        <progress max="90" value={signalStrengthToProgress()} />
      </div>
      <div>
        {device.lastSeen / 1000} sec
      </div>
    </div>
  );

};

DeviceContainer.propTypes = {
  device: ImmutablePropTypes.record.isRequired,
};

DeviceContainer.defaultProps = {

};

export default DeviceContainer;
