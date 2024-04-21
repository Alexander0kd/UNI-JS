document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementById("main");
    const BASE_URL = 'https://raw.githubusercontent.com/Alexander0kd/UNI-JS/main/lab7';

    const bindHeaderButtons = () => {
        const home = document.getElementById('btn-home');
        if (home) {
            home.addEventListener('click', () => {
                loadHome();
            });
        }

        const catalog = document.getElementById('btn-catalog');
        if (catalog) {
            catalog.addEventListener('click', () => {
                loadCatalog();
            });
        }
    };


    // Header
    const loadHome = async () => {
        const page = await ajax.GET(`${BASE_URL}/components/home.html`, true);
        if (main) {
            main.innerHTML = page;
        }
    };

    const loadCatalog = async () => {
        const page = await ajax.GET(`${BASE_URL}/components/catalog.html`, true);
        const catalog = await ajax.GET(`${BASE_URL}/data/categories/response.json`, false);

        const pageData = ajax.ngFor(page, catalog.length, catalog);

        if (main) {
            main.innerHTML = pageData;
        }
    };

    // Home
    const loadRandom = async () => {
        const data = await ajax.GET(`${BASE_URL}/data/categories/response.json`, false);

        console.log(data);
    };

    // Catalog
    const loadCatalogGroup = async (catalogId) => {
        const page = await ajax.GET(`${BASE_URL}/components/group.html`, true);
        const catalog = await ajax.GET(`${BASE_URL}/data/categories/response.json`, false);

        console.log(page);
        console.log(catalog);
    };

    // Group
    const loadItem = async (catalogId, itemId) => {
        const page = await ajax.GET(`${BASE_URL}/components/item.html`, true);
        const catalog = await ajax.GET(`${BASE_URL}/data/categories/response.json`, false);
        
        console.log(page);
        console.log(catalog);
    };

    bindHeaderButtons();
    loadHome();
});
