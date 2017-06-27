
import React from 'react';
import { Chart } from 'react-google-charts';


class SignalChart extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      devicesMap: '',
    };
  }


  renderChart() {
    return (
      <Chart
        chartType="LineChart"
        data={[
          ['Year', 'Sales', 'Expenses'],
          ['2004', 0, 400],
          ['2005', 0, 460],
          ['2006', 660, 1120],
          ['2007', 1030, 540],
        ]}
        options={{}}
        graph_id="ScatterChart"
        width="100%"
        height="400px"
        legend_toggle
      />
    );
  }


  render() {
    return (
      <div>
        {this.renderChart()}
      </div>
    );
  }
}


SignalChart.propTypes = {

};


SignalChart.defaultProps = {

};


export default SignalChart;
