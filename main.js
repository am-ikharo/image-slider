const slider = document.querySelector('.slider');


async function fetchListOfImages() {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5', {method: 'GET'});
        
        const imagesList = await response.json();
        if(imagesList && imagesList.length > 0) displayImages()

        console.log(imagesList);
        
    } catch (error) {
        console.log(error);
        
    }
}

function displayImages(getImagesList){
    slider.innerHTML = getImagesList.map(
        (item) => `
        <div class='slider'>
        <img src='${item.download_url} alt=${item.id}'/>
        </div>
        `).join(' ');
}
fetchListOfImages();
