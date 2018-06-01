import data from './data.json';

const channels = data.channels;
const subs = document.querySelectorAll('[data-metric="subscribers"]');
const retention = document.querySelectorAll('[data-metric="retention"]');

function isPostive(n) {
  if (n > 0) {
    n = `+${n}`;
  }
  return n;
}

function fillProgress() {
  const bar = document.querySelector('[data-progress]');
  const progress = bar.dataset.progress;
  bar.style.width = `${progress}%`;
}

function init() {
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
