const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");

randomAnime.addEventListener("click", () => {
  fetch("/api/v2/users/frankolms/animelist?status=plan_to_watch&limit=1000", {
    headers: {
      "X-MAL-CLIENT-ID": "7293ae0257e63715c16e13f04b73bccd",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayAnimeInfo(data);
    });
});

displayAnimeInfo = (data) => {
  let randomNum = Math.floor(Math.random() * data.data.length);
  console.log(data.data.length);
  console.log(randomNum);
  title.textContent = data.data[randomNum].node.title;
  image.src = data.data[randomNum].node.main_picture.medium;
};
