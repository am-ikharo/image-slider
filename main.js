const slider = document.querySelector('.slider');


async function fetchListOfImages() {
    try {
        const response = await fetch('https://picsum.photos/v2/list?page=1&limit=5', {method: 'GET'});
    } catch (error) {
        console.log(error);
        
    }
}


fetchListOfImages();
