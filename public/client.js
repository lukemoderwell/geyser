import data from './data.json';

const goal = 50000;
const channels = data.channels;
const subCards = document.querySelectorAll('[data-metric="subscribers"]');
const retentionCards = document.querySelectorAll('[data-metric="retention"]');
const watchCards = document.querySelectorAll('[data-metric="watch"]');

function isPostive(n) {
  if (n > 0) {
    n = `+${n}`;
  }
  return n;
}

function count(dataType) {
  let count = 0;
  for (var key in channels) {
    count = count + channels[key][dataType].amount;
  }
  return count;
}

function getWeeklyData(dataType) {
  let amount = [];
  for (var key in channels) {
    amount.push(channels[key][dataType].weeklyChange);
  }
  return amount;
}

function createCards(arr, nodes) {
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
  const totalSubs = count('subscribers');
  fillProgress(totalSubs);

  const weeklyRetention = getWeeklyData('audienceRetention');
  const weeklyWatchers = getWeeklyData('watchTime');
  const weeklySubs = getWeeklyData('subscribers');

  createCards(weeklySubs, subCards);
  createCards(weeklyRetention, retentionCards);
  createCards(weeklyWatchers, watchCards);

}

init();
