import Score from './score.js';

function displayScore(score) {
  const scoreContent = document.querySelector('.score-content');
  scoreContent.innerHTML += `<li class="score-item"> ${score.name} : ${score.score}</li>`;
}

export default class Leaderboard {
  constructor() {
    this.Scores = JSON.parse(localStorage.getItem('leaderboard')) || [];
  }

  addScore = (data) => {
    const score = new Score(data.get('name'), data.get('score'));
    this.Scores.push(score);
    displayScore(score);
    localStorage.setItem('leaderboard', JSON.stringify(this.Scores));
  };

    renderScores = () => {
      this.Scores.forEach((score) => {
        displayScore(score);
      });
    };

  refreshScores = () => {
    this.Scores = [];
    localStorage.setItem('leaderboard', JSON.stringify(this.Scores));
    const scoreContent = document.querySelector('.score-content');
    scoreContent.innerHTML = '';
  };
}
