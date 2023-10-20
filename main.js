const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");

randomAnime.addEventListener("click", () => {
  fetch("https://api.jikan.moe/v4/random/anime")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayAnimeTitle(data);
    });

  //   const title = document.getElementById("animeTitle");
  //   title.textContent = "Requested Anime";
});

displayAnimeTitle = (data) => {
  if (data.data.title_english) {
    title.textContent = data.data.title_english;
  } else {
    title.textContent = data.data.title;
  }
};
