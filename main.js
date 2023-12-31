const randomAnime = document.getElementById("randomAnime");
const title = document.getElementById("animeTitle");
const image = document.getElementById("animeImg");
const username = document.getElementById("username");
const animeStatus = document.getElementById("animeStatus");
const animeScore = document.getElementById("animeScore");
const numEpisodes = document.getElementById("numEpisodes");
const genres = document.getElementById("genres");
const synopsis = document.getElementById("synopsis");
const loader = document.getElementById('loader');
const animeInfo = document.getElementById('animeInfo');
const lightDarkMode = document.getElementById('lightDarkMode');
let getTheme = localStorage.getItem('theme')

if(getTheme != null && getTheme === "darkMode") {
  document.body.classList.add('darkMode')
  lightDarkMode.checked = true;
} else {
  document.body.classList.remove('darkMode')
  lightDarkMode.checked = false;
}

// document.body.classList.add(getTheme);

randomAnime.addEventListener("click", () => {
  if (!username.value) {
    alert("Please Enter Your MAL Username");
  } else {
    loader.style.display="flex";
    animeInfo.style.display="none";
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
        loader.style.display="none";
        animeInfo.style.display="block";
        displayAnimeInfo(data);
      });
  }
});

fetchRandomAnime = () => {
    animeInfo.style.display="none";
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
      loader.style.display="none";
        animeInfo.style.display="block";
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
  animeScore.textContent = `${data.data[randomNum].node.mean}`;
  numEpisodes.textContent = `${data.data[randomNum].node.num_episodes}`;
  genres.innerHTML = 
    data.data[randomNum].node.genres.map((genre) => {
      return `<h4>${genre.name}<h4>`;
    }).join('');
  synopsis.textContent = data.data[randomNum].node.synopsis;
};

toggleLightDark = () => {
  if (lightDarkMode.checked) {
    localStorage.setItem('theme', 'darkMode')
    document.body.classList.add("darkMode");
  } else {
    localStorage.setItem('theme', "");
    document.body.classList.remove("darkMode");
  }
}


