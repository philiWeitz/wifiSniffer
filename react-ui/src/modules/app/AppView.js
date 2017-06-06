import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ImmutablePropTypes from 'react-immutable-proptypes';

import styles from './styles.scss';
import AppContainer from './AppContainer';
import intervalUtil from '../../util/intervalUtil';

import SearchBox from '../../components/searchBox';
import DeviceContainer from '../../components/deviceContainer';


const REFRESH_INTERVAL = 2 * 1000;


class AppView extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    };

    this.onSearchBoxInputChange = this.onSearchBoxInputChange.bind(this);
  }


  componentWillMount() {
    // add the device refresh interval
    intervalUtil.addInterval(intervalUtil.FETCH_DEVICES,
      this.props.fetchDevices, REFRESH_INTERVAL);
  }


  componentWillUnmount() {
    // remove the device refresh interval
    intervalUtil.cancelInterval(intervalUtil.FETCH_DEVICES);
  }


  onSearchBoxInputChange(event) {
    this.setState({ searchTerm: event.target.value });
  }


  getFilteredDevices() {
    if (this.state.searchTerm.length <= 0) {
      return this.props.devices;
    }
    return this.props.devices.filter(device => {
      return device.mac.includes(this.state.searchTerm);
    });
  }


  renderDevices() {
    const devices = this.getFilteredDevices();

    if (devices.size > 0) {
      return (
        <div>
          <div className={styles.devicesHeader}>
            <div>Mac Address</div>
            <div>MCU Id</div>
            <div>Signal Strength</div>
            <div>Last Seen</div>
            <div>Timestamp</div>
          </div>
          <div>
            {devices.map((device) =>
              <DeviceContainer key={`${device.mcuId}-${device.mac}`} device={device} />,
            )}
          </div>
        </div>
      );
    }
    return (
      <div className={styles.noDevicesFound}>No devices found</div>
    );
  }


  render() {
    return (
      <div className={styles.page}>
        <div className={styles.appContainerHeader}>
          <h1>Wifi Sniffer UI</h1>
        </div>
        <div>
          <SearchBox onInputChange={this.onSearchBoxInputChange} />
          {this.renderDevices()}
        </div>
      </div>
    );
  }
}


AppView.propTypes = {
  fetchDevices: PropTypes.func.isRequired,
  devices: ImmutablePropTypes.list.isRequired,
};


AppView.defaultProps = {

};


// export unconnected version
export const UnconnectedAppView = AppView;
// export connected version
export default connect(AppContainer.mapProsToAppView, AppContainer.mapDispatchToAppView)(AppView);
