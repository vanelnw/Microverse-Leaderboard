import Leaderboard from '../modules/Leaderboard.js';
import './style.css';

const leaderboard = new Leaderboard();

const scoreContent = document.querySelector('.score-list');
const form = document.getElementById('add-score-form');
const nameInput = document.getElementById('name-input');
const scoreInput = document.getElementById('score-input');
const refreshBtn = document.getElementById('refresh-button');

const refreshScores = () => {
  scoreContent.innerHTML = '';
  leaderboard.refreshScores();
};

const handleFormSubmit = (event) => {
  event.preventDefault();
  leaderboard.addScore(new FormData(form));
  nameInput.value = '';
  scoreInput.value = '';
};

document.addEventListener('DOMContentLoaded', refreshScores);

form.addEventListener('submit', handleFormSubmit);

refreshBtn.addEventListener('click', refreshScores);