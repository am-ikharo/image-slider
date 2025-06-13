const slider = document.querySelector(".slider");
const dotsContainer = document.querySelector(".dots-container");

async function fetchListOfImages() {
  try {
    const response = await fetch(
      "https://picsum.photos/v2/list?page=1&limit=10",
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
        <div class='slider'>
        <img src=${item.download_url} alt=${item.id}/>
        </div>
        `
    )
    .join(" ");

  dotsContainer.innerHTML = getImagesList
    .map(
      (item, index) => `
        <span class='dot' data-slide=${index}></span>
        `
    )
    .join(" ");
}
fetchListOfImages();
