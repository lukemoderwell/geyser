import data1 from './data1.json';
import data2 from './data2.json';

const weeklyChanges = {
  "crossroads": {
    "averageViewPercentage": (data2.channels.crossroads.rows[0] - data1.channels.crossroads.rows[0]) / (data2.channels.crossroads.rows[0] + data1.channels.crossroads.rows[0]),
    "netSubscribers": ((data2.channels.crossroads.rows[1] + data1.channels.crossroads.rows[1]) - (data2.channels.crossroads.rows[2] + data1.channels.crossroads.rows[2])) / data2.channels.crossroads.rows[3],
    "totalSubscribers": data2.channels.crossroads.rows[3],
    "minutesWatched": (data2.channels.crossroads.rows[4] - data1.channels.crossroads.rows[4]) / (data2.channels.crossroads.rows[4] + data1.channels.crossroads.rows[4])
  },
  "brianBringsABeer": {
    "averageViewPercentage": (data2.channels.brianBringsABeer.rows[0] - data1.channels.brianBringsABeer.rows[0]) / (data2.channels.brianBringsABeer.rows[0] + data1.channels.brianBringsABeer.rows[0]),
    "netSubscribers": ((data2.channels.brianBringsABeer.rows[1] + data1.channels.brianBringsABeer.rows[1]) - (data2.channels.brianBringsABeer.rows[2] + data1.channels.brianBringsABeer.rows[2])) / data2.channels.brianBringsABeer.rows[3],
    "totalSubscribers": data2.channels.brianBringsABeer.rows[3],
    "minutesWatched": (data2.channels.brianBringsABeer.rows[4] - data1.channels.brianBringsABeer.rows[4]) / (data2.channels.brianBringsABeer.rows[4] + data1.channels.brianBringsABeer.rows[4])
  },
  "crossroadsMusic": {
    "averageViewPercentage": (data2.channels.crossroadsMusic.rows[0] - data1.channels.crossroadsMusic.rows[0]) / (data2.channels.crossroadsMusic.rows[0] + data1.channels.crossroadsMusic.rows[0]),
    "netSubscribers": ((data2.channels.crossroadsMusic.rows[1] + data1.channels.crossroadsMusic.rows[1]) - (data2.channels.crossroadsMusic.rows[2] + data1.channels.crossroadsMusic.rows[2])) / data2.channels.crossroadsMusic.rows[3],
    "totalSubscribers": data2.channels.crossroadsMusic.rows[3],
    "minutesWatched": (data2.channels.crossroadsMusic.rows[4] - data1.channels.crossroadsMusic.rows[4]) / (data2.channels.crossroadsMusic.rows[4] + data1.channels.crossroadsMusic.rows[4])
  }
}

console.log(weeklyChanges);

const goal = 50000;
const crdsData = weeklyChanges.crossroads;
const bbabData = weeklyChanges.brianBringsABeer;
const cmData = weeklyChanges.crossroadsMusic;
const totalSubs = (crdsData.totalSubscribers + bbabData.totalSubscribers + cmData.totalSubscribers);
const subCards = document.querySelectorAll('[data-metric="subscribers"]');
const retentionCards = document.querySelectorAll('[data-metric="retention"]');
const watchCards = document.querySelectorAll('[data-metric="watch"]');

function formatNumber(n) {
  if (n > 0) {
    n = `+${n}%`;
  }
  return `${n}%`;
}

function count(dataType) {
  let count = 0;
  for (var key in channels) {
    count = count + channels[key][dataType].amount;
  }
  return count;
}

function createCards(obj, nodes) {
  for (var i = 0; i < arr.length; i += 1) {
    const value = arr[i];
    const parent = nodes[i];
    const el = document.createElement('h2');
    switch (true) {
      case (value >= 20):
        parent.classList.add('bg-blue');
        el.classList.add('white');
        break;
      case (value > 10 && value < 20):
        parent.classList.add('bg-light-blue');
        break;
      case (value < 10 && value > 0):
        parent.classList.add('bg-lightest-blue');
        break;
      case (value === 0):
        parent.classList.add('bg-light-gray');
        break;
      case (value < 0 && value > -10):
        parent.classList.add('bg-washed-red');
        break;
      case (value <= -10 && value > -20):
        parent.classList.add('bg-light-red');
        break;
      case (value <= -20):
        parent.classList.add('bg-red');
        el.classList.add('white');
        break;
      default:
        console.log('error');
    }
    
    var text = isPostive(arr[i]);
    el.classList.add('f2');
    el.innerText = text;
    nodes[i].appendChild(el);
  }
}

function fillProgress(amount) {
  const title = document.querySelector('[data-progress-title]');
  title.innerText = String(amount);
  const percent = (amount/goal) * 100;
  const bar = document.querySelector('[data-progress]');
  bar.dataset.progress = String(percent);
  bar.style.width = `${percent}%`;
}

function init() {
  fillProgress(totalSubs);

  createCards(crds, retentionCards);
  createCards(weeklySubs, subCards);
  createCards(weeklyWatchers, watchCards);
}

init();
