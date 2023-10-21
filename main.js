const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");

randomAnime.addEventListener("click", () => {
  fetch("https://api.jikan.moe/v4/random/anime")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayAnimeInfo(data);
    });
});

displayAnimeInfo = (data) => {
  if (data.data.title_english) {
    title.textContent = data.data.title_english;
  } else {
    title.textContent = data.data.title;
  }

  image.src = data.data.images.jpg.image_url;
};
