import { Component } from 'react'
import {
  Bar, Doughnut, Line, Pie, PolarArea, Radar
} from 'react-chartjs-2'

import Header from '../../components/Header/Header'
import Chart from '../../components/Chart/Chart'
import ChartDataEditor from '../../components/Chart/ChartDataEditor'
import { getRandomNumberBetweenInterval } from '../../utils/random'
import colors from '../../constants/colors.json'

import './IndexPage.css'

const chartTitle = 'Chart.js Bar Chart'
const ChartTypes = {
  Bar: Bar,
  Line: Line,
  Doughnut: Doughnut,
  Pie: Pie,
  PolarArea: PolarArea,
  Radar: Radar
}

let tempChartData = null;

export class IndexPage extends Component {

  state = {
    isChartFormOpen: false,
    chartData: {
      labels: ['jan', 'feb', 'mar', 'apr', 'may', 'june', 'july'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [100, 20, 88, 77, 22, 44, 87, 33],
        }
      ]
    },
    currentChartIndex: 0
  }

  componentDidMount = () => {
    const { chartData: { datasets }, chartData } = this.state
    chartData.datasets = datasets.map(dataset => ({
      ...dataset,
      backgroundColor: [...new Array(dataset.data.length)].reduce(
        (acc, curr) => {
          let randomNumber = getRandomNumberBetweenInterval(0, dataset.data.length);
          while (acc.indexOf(randomNumber) > -1) {
            randomNumber = getRandomNumberBetweenInterval(0, dataset.data.length);
          }
          acc = [...acc, randomNumber]
          return acc;
        },
        []
      )
        .map(number => colors[number])
    }))
  }

  toggleEditor = () => {
    this.setState(prevState => (
      { isChartFormOpen: !prevState.isChartFormOpen }
    ), () => {
      const { chartData, isChartFormOpen } = this.state
      if (isChartFormOpen) {
        tempChartData = JSON.stringify(chartData)
      }
    })
  }

  proceed = () => {
    this.toggleEditor()
  }

  cancel = () => {
    console.log('object')
    if (JSON.stringify(this.state.chartData) !== tempChartData) {
      this.setState({
        chartData: JSON.parse(tempChartData),
        isChartFormOpen: false
      })
    } else {
      this.toggleEditor()
    }
  }

  addDataHandler = e => {

  }

  editDataHandler = e => {
    const { id, value } = e.target

    if (isNaN(value)) {
      return;
    }

    const { chartData } = this.state
    const newChartData = JSON.parse(JSON.stringify(chartData));
    const itemLabelIndex = newChartData.labels.indexOf(id)
    newChartData.datasets = newChartData.datasets.map(dataset => {
      const data = [...dataset.data];
      data[itemLabelIndex] = value;
      return { ...dataset, data: [...data] }
    })

    this.setState({
      chartData: newChartData
    })
  }

  deleteItemHandler = itemLabel => {
    const { chartData } = this.state
    const newChartData = JSON.parse(JSON.stringify(chartData));
    const itemLabelIndex = newChartData.labels.indexOf(itemLabel)
    newChartData.labels.splice(itemLabelIndex, 1);
    newChartData.datasets = newChartData.datasets.map(dataset => {
      const data = [...dataset.data];
      data.splice(itemLabelIndex, 1)
      return { ...dataset, data: [...data] }
    })

    this.setState({
      chartData: newChartData
    })
  }

  render() {

    const { isChartFormOpen, chartData, currentChartIndex } = this.state

    return (
      <div className="index-page">
        <Header>
          <div className="controls">
            <button onClick={
              () => this.setState({
                currentChartIndex: (currentChartIndex - 1) === -1 ?
                  Object.keys(ChartTypes).length - 1 : (currentChartIndex - 1)
              })
            }>{"<"}</button>
            <span className="btn-success chart-name">
              {Object.keys(ChartTypes)[currentChartIndex]}
            </span>
            <button onClick={
              () => this.setState({
                currentChartIndex: (currentChartIndex + 1) % Object.keys(ChartTypes).length
              })
            }>{">"}</button>
            {/* <button
              className="btn-primary"
              onClick={this.toggleEditor}
            >
              Add Data
            </button> */}
            <button
              className="btn-secondary"
              onClick={this.toggleEditor}
            >
              Edit Data
            </button>
          </div>
        </Header>
        <div className="charts-container container">
          <div
            className="chart-container"
            style={{ width: this.state.isChartFormOpen ? '60%' : '100%' }}
          >
            <Chart
              ChartType={ChartTypes[Object.keys(ChartTypes)[currentChartIndex]]}
              chartData={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: chartTitle
                  }
                }
              }}
            />
          </div>
          {isChartFormOpen && <div
            className="chart-data-editor-container"
            style={{ width: isChartFormOpen ? '40%' : '0%' }}
          >
            <ChartDataEditor
              chartData={chartData}
              addDataHandler={this.addDataHandler}
              editDataHandler={this.editDataHandler}
              deleteItemHandler={this.deleteItemHandler}
              proceed={this.proceed}
              cancel={this.cancel}
            />
          </div>}
        </div>
      </div>
    )
  }
}

export default IndexPage