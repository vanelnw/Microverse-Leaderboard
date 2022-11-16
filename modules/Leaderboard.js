import Score from './score.js';

function displayScore(score) {
  const scoreContent = document.querySelector('.score-content');
  scoreContent.innerHTML += `<li class="score-item"> ${score.user} : ${score.score}</li>`;
}

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
    )
      .then((response) => response.json())
      .then(() => {
        displayScore(score);
        this.Scores.push(score);
      });
  };

  renderScores = () => {
    this.Scores.forEach((score) => {
      displayScore(score);
    });
  };

  refreshScores = async () => {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores`,
    ).then((response) => response.json());

    this.Scores = response.result;
    const scoreContent = document.querySelector('.score-content');
    scoreContent.innerHTML = '';
    this.renderScores();
  };;
}
