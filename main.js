const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");

// randomAnime.addEventListener("click", () => {
//   fetch("https://api.jikan.moe/v4/random/anime")
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       displayAnimeInfo(data);
//     });
// });

// displayAnimeInfo = (data) => {
//   if (data.data.title_english) {
//     title.textContent = data.data.title_english;
//   } else {
//     title.textContent = data.data.title;
//   }

//   image.src = data.data.images.jpg.image_url;
// };

randomAnime.addEventListener("click", () => {
  fetch("/api/v2/users/frankolms/animelist?status=plan_to_watch&limit=1000", {
    headers: {
      "X-MAL-CLIENT-ID": "7293ae0257e63715c16e13f04b73bccd",
    },
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});
