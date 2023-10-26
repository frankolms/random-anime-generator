const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");
const username = document.getElementById("username");
const animeStatus = document.getElementById("animeStatus");
const animeScore = document.getElementById("animeScore");

randomAnime.addEventListener("click", () => {
  if (!username.value) {
    alert("Please Enter Your MAL Username");
  } else {
    fetch(
      `/api/v2/users/${username.value}/animelist?fields=mean&status=${animeStatus.value}&limit=1000`,
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
  }
});

displayAnimeInfo = (data) => {
  let randomNum = Math.floor(Math.random() * data.data.length);
  console.log(data.data.length);
  console.log(randomNum);
  console.log(data.data[randomNum]);
  title.textContent = data.data[randomNum].node.title;
  image.src = data.data[randomNum].node.main_picture.medium;
  animeScore.textContent = data.data[randomNum].node.mean;
};
