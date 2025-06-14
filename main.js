const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

async function fetchListOfImages() {
  try {
    const response = await fetch(
      `https://picsum.photos/v2/list?page=1&limit=5`,
      { method: "GET" }
    );
    const imagesList = await response.json();
    if (imagesList && imagesList.length > 0) {
      displayImages(imagesList);
    }
  } catch (error) {
    console.log(error);
  }
}

function displayImages(getImagesList) {
  slider.innerHTML = getImagesList
    .map(
      (item) => `
        <div class='slide'>
        <img src=${item.download_url} alt=${item.id}/>
        </div>
        `
    )
    .join(" ");

  dotsContainer.innerHTML = getImagesList
    .map(
      (item, index) => `
        <span class='dot ${
          index === 0 ? "active" : ""
        }' data-slide=${index}></span>
        `
    )
    .join(" ");
}
fetchListOfImages();

// slider functionality

setTimeout(() => {
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentslide = 0;

  function activeDot(slide) {
    document
      .querySelectorAll(".dot")
      .forEach((dotItem) => dotItem.classList.remove("active"));
    document
      .querySelector(`.dot[data-slide="${slide}"]`)
      .classList.add("active");
  }

  function changeCurrentSlide(currentslide) {
    slides.forEach(
      (slideItem, index) =>
        (slideItem.style.transform = `translateX(${
          100 * (index - currentslide)
        }%)`)
    );
  }

  changeCurrentSlide(currentslide);

  nextBtn.addEventListener("click", () => {
    currentslide++;
    if (slides.length - 1 < currentslide) {
      currentslide = 0;
    }
    changeCurrentSlide(currentslide);
    activeDot(currentslide);
  });
  prevBtn.addEventListener("click", () => {
    currentslide--;
    if (0 > currentslide) {
      currentslide = slides.length -1;
    }
    changeCurrentSlide(currentslide);
    activeDot(currentslide);
  });

  dotsContainer.addEventListener("click", (event) => {
    if(event.target.classList.contains('dot')){
        const currentslide = event.target.dataset.slide
        changeCurrentSlide(currentslide)
        activeDot(currentslide)
    }
  });
}, 1000);
