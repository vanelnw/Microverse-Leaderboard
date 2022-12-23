import Score from './score.js';

export default class Leaderboard {
  constructor() {
    this.Scores = [];
  }

  addScore = async (data) => {
    const score = new Score(data.get('name'), data.get('score'));
    await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores`,
      {
        method: 'POST',
        body: JSON.stringify({
          user: score.user,
          score: score.score,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    this.scores.push(score);
    this.renderScore(score);
  };

  renderScore = (score) => {
    const scoreList = document.querySelector('.score-list');
    scoreList.innerHTML += `<li class="score-item"> ${score.user} : ${score.score}</li>`;
  }

  refreshScores = async () => {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores`,
    );

    const result = await response.json();
    this.scores = result.result;

    const scoreList = document.querySelector('.score-list');
    scoreList.innerHTML = '';
    this.scores.forEach((score) => {
      this.renderScore(score);
    });
  };
}
