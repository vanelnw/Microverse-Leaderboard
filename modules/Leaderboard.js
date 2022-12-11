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
    )
      .then((response) => response.json())
      .then(() => {
        document.querySelector('.score-content').innerHTML += `<li class="score-item"> ${score.user} : ${score.score}</li>`;
        this.Scores.push(score);
      });
  };

  renderScores = () => {
    this.Scores.forEach((score) => {
      document.querySelector(
        '.score-content',
      ).innerHTML += `<li class="score-item"> ${score.user} : ${score.score}</li>`;
    });
  };

  refreshScores = async () => {
    const response = await fetch(
      `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${process.env.GAME_ID}/scores`,
    ).then((response) => response.json());

    this.Scores = response.result;
    document.querySelector('.score-content').innerHTML = '';
    this.renderScores();
  };
}
