import React from 'react'
import {select} from 'd3-selection';
import {erddapTimeseriesChart} from 'erddap-timeseries-chart';
import {erddapParser} from 'erddap-parser';

class Sensor extends React.Component {
  
  async componentDidMount(){
    try {
        let now = new Date(),
            day = 24*60*60*1000,
            start = new Date(+now - 10*day),
            end = now,
            variable_names = {time:'time'}
        
        variable_names[this.props.parameter.variable_name] = 'value';

        let data = await erddapParser.getTabledapData({
            server:'https://erddap.sensors.axds.co/erddap',
            dataset_id:this.props.parameter.dataset_id,
            variables:[
                'time',
                this.props.parameter.variable_name
            ],
            constraints:{
                'time>=':start,
                'time<=':end
            },
            variable_names:variable_names
        })
  

        select(this.refs.chartWrap).select('*').empty();
        let width = this.props.width || this.refs.chartWrap.offsetWidth,
            height = this.props.height || 200,
            svg = select(this.refs.chartWrap)
                    .append('svg')
                        .attr('width',width)
                        .attr('height',height),

            chart = erddapTimeseriesChart()
                    .data(data)
                    .width(width)
                    .height(height)
                    .x(d=>d.time)
                    .y(d=>d.value)
                    .chartType('line');
            
            svg.call(chart);
        }catch(e){
            throw(e)
        }
  }

  render() {
        
    return <div>
        <h4>{this.props.parameter.long_name}</h4>
        <div className="chartWrap" ref="chartWrap">
        </div>
      </div>
  }
}
export default Sensor