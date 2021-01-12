import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import post from './modules/post';
import modals from './modules/modal';
import menu from './modules/menu';
import calc from './modules/calc';

window.addEventListener('DOMContentLoaded', () => {
  tabs();
  timer();
  slider();
  post('[data-modal]');
  modals('[data-modal]');
  menu();
  calc();
});
