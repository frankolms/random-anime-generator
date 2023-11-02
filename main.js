const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");
const username = document.getElementById("username");
const animeStatus = document.getElementById("animeStatus");
const animeScore = document.getElementById("animeScore");
const numEpisodes = document.getElementById("numEpisodes");
const genres = document.getElementById("genres");
const synopsis = document.getElementById("synopsis");

randomAnime.addEventListener("click", () => {
  if (!username.value) {
    alert("Please Enter Your MAL Username");
  } else {
    fetch(
      `/api/v2/users/${username.value}/animelist?fields=mean,num_episodes,genres,synopsis&status=${animeStatus.value}&limit=1000`,
      {
        headers: {
          "X-MAL-CLIENT-ID": "7293ae0257e63715c16e13f04b73bccd",
        },
      }
    )
      .then((response) => {
        if (response.status === 404) {
          alert("Please Enter a Valid Username");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        displayAnimeInfo(data);
      });
  }
});

fetchRandomAnime = () => {
  fetch(
    `/api/v2/anime/ranking?ranking_type=all&limit=500&fields=mean,num_episodes,genres,synopsis`,
    {
      headers: {
        "X-MAL-CLIENT-ID": "7293ae0257e63715c16e13f04b73bccd",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayAnimeInfo(data);
    });
};

displayAnimeInfo = (data) => {
  let randomNum = Math.floor(Math.random() * data.data.length);
  console.log(data.data.length);
  console.log(randomNum);
  console.log(data.data[randomNum]);
  title.textContent = data.data[randomNum].node.title;
  image.src = data.data[randomNum].node.main_picture.medium;
  animeScore.textContent = data.data[randomNum].node.mean;
  numEpisodes.textContent = data.data[randomNum].node.num_episodes;
  genres.innerHTML =
    `<h2>` +
    data.data[randomNum].node.genres.map((genre) => {
      return `<h2>${genre.name}</h2>`;
    }) +
    `</h2>`;
  synopsis.textContent = data.data[randomNum].node.synopsis;
};
