const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';
const apiKey = '0bcf0fa4e36242efadfc393fa76b0ae0';
window.addEventListener('load', async function () {
    updateNews();
    await updateSources();
    sourceSelector.value = defaultSource;
    sourceSelector.addEventListener('change', e => {
        updateNews(e.target.value);
    });
});

async function updateSources() {
    const res = await fetch('https://newsapi.org/v2/sources?apiKey=0bcf0fa4e36242efadfc393fa76b0ae0');
    const json = await res.json();
    console.log(json);
    sourceSelector.innerHTML =
        json.sources
            .map(source => `<option value="${source.id}">${source.name}</option>`)
            .join('\n');
}

async function updateNews(source = defaultSource) {
    const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await res.json();

    main.innerHTML = json.articles.map(createArticle).join('\n');
}

function createArticle(article) {
    return `
        <div class="article">
        <a href="${article.url}">
        <h2>${article.title}</h2>
        <img src="${article.urlToImage}" alt="${article.title}">
        <p>${article.description}</p>
        </a>
    </div>
    `
}