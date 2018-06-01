import data from './data.json';

const subGoal = 50000;
const channels = data.channels;
const subs = document.querySelectorAll('[data-metric="subscribers"]');

let totalSubs;

function isPostive(n) {
  if (n > 0) {
    n = `+${n}`;
  }
  return n;
}

function countSubs() {
  let count = 0;
  for (var key in channels) {
    count = count + channels[key].subscribers.amount;
  }
  totalSubs = count;
  fillProgress(totalSubs);
}

function fillProgress(subs) {
  const percent = (subs/subGoal) * 100;
  const bar = document.querySelector('[data-progress]');
  bar.dataset.progress = String(percent);
  bar.style.width = `${percent}%`;
}

function init() {
  countSubs();
  let subsChange = [];
  for (var key in channels) {
    if (channels.hasOwnProperty(key)) {
      subsChange.push(channels[key].subscribers.weeklyChange);
    } 
  }
  for (var i = 0; i < subs.length; i += 1) {
    var text = isPostive(subsChange[i]);
    let el = document.createElement('h2');
    el.classList.add('f2');
    el.innerText = text;
    subs[i].appendChild(el);
  }
  fillProgress();
}

init();
