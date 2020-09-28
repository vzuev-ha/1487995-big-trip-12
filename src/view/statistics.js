import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {countPriceByEvents, countUseOfTransport, countTimeSpendByType} from "../utils/statistics.js";

// Рассчитаем высоту канваса в зависимости от того, сколько данных в него будет передаваться
const BAR_HEIGHT = 55;


const renderMoneyChart = (tripEvents, moneyCtx) => {
  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `EAT`, `RIDE`],
      datasets: [{
        data: [
          countPriceByEvents(tripEvents, [`flight`]),
          countPriceByEvents(tripEvents, [`check-in`]),
          countPriceByEvents(tripEvents, [`drive`]),
          countPriceByEvents(tripEvents, [`sightseeing`]),
          countPriceByEvents(tripEvents, [`restaurant`]),
          countPriceByEvents(tripEvents, [`taxi`, `bus`, `train`, `ship`, `transport`])
        ],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const renderTransportChart = (tripEvents, transportCtx) => {
  return new Chart(transportCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [`DRIVE`, `RIDE`, `FLY`, `SAIL`],
      datasets: [{
        data: [
          countUseOfTransport(tripEvents, [`drive`]),
          countUseOfTransport(tripEvents, [`taxi`, `bus`, `train`, `transport`]),
          countUseOfTransport(tripEvents, [`flight`]),
          countUseOfTransport(tripEvents, [`ship`])
        ],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const renderTimeSpendChart = (tripEvents, timeSpendCtx) => {
  return new Chart(timeSpendCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: [
        `TAXI`,
        `BUS`,
        `TRAIN`,
        `SHIP`,
        `TRANSPORT`,
        `DRIVE`,
        `FLIGHT`,
        `HOTEL`,
        `LOOK`,
        `EAT`
      ],
      datasets: [{
        data: [
          countTimeSpendByType(tripEvents, [`taxi`]),
          countTimeSpendByType(tripEvents, [`bus`]),
          countTimeSpendByType(tripEvents, [`train`]),
          countTimeSpendByType(tripEvents, [`ship`]),
          countTimeSpendByType(tripEvents, [`transport`]),
          countTimeSpendByType(tripEvents, [`drive`]),
          countTimeSpendByType(tripEvents, [`flight`]),
          countTimeSpendByType(tripEvents, [`check-in`]),
          countTimeSpendByType(tripEvents, [`sightseeing`]),
          countTimeSpendByType(tripEvents, [`restaurant`])
        ],
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}H`
        }
      },
      title: {
        display: true,
        text: `TRANSPORT`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          minBarLength: 50
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};


const createStatisticsTemplate = () => {
  return `        <section class="statistics">
          <h2 class="visually-hidden">Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class StatisticsView extends SmartView {
  constructor(tripEvents) {
    super();

    this._tripEvents = tripEvents;

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    this._moneyChart = null;
    this._transportChart = null;
    this._timeSpendChart = null;

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    moneyCtx.height = BAR_HEIGHT * 6;

    const transportCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    transportCtx.height = BAR_HEIGHT * 4;

    const timeSpendCtx = this.getElement().querySelector(`.statistics__chart--time`);
    timeSpendCtx.height = BAR_HEIGHT * 10;

    this._moneyChart = renderMoneyChart(this._tripEvents, moneyCtx);
    this._transportChart = renderTransportChart(this._tripEvents, transportCtx);
    this._timeSpendChart = renderTimeSpendChart(this._tripEvents, timeSpendCtx);
  }
}
