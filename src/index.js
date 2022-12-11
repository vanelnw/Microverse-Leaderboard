import Leaderboard from '../modules/Leaderboard.js';
import './style.css';

const leaderboard = new Leaderboard();

const scoreContent = document.querySelector('.score-content');
const form = document.getElementById('form');
const nameInput = document.getElementById('name');
const scoreInput = document.getElementById('score');
const refreshBtn = document.getElementById('refresh');

document.addEventListener('DOMContentLoaded', leaderboard.refreshScores());

form.addEventListener('submit', (event) => {
  event.preventDefault();
  leaderboard.addScore(new FormData(form));
  nameInput.value = '';
  scoreInput.value = '';
});

refreshBtn.addEventListener('click', () => {
  scoreContent.innerHTML = '';
  leaderboard.refreshScores();
});