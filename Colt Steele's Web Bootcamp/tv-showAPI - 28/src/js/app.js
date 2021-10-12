const form = document.querySelector('#searchForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    console.log(searchTerm);
    const res = await fetch(`http://api.tvmaze.com/search/shows?q=${searchTerm}`);
    const data = await res.json();
    console.log(data);
    addImages(data);
    
})  

const addImages = (shows) => {
    for (result of shows) {
        if (result.show.image) {
            const img = document.createElement('img');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}