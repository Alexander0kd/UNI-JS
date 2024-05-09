const router = (() => {
    const AvaibleRoutes = [
        {
            route: 'home',
            name: 'home-page',
            path: 'app/HomePage'
        },
        {
            route: 'game',
            name: 'game-page',
            path: 'app/GamePage'
        },



        {
            route: 'default',
            name: 'not-found-page',
            path: 'app/NotFoundPage'
        },
        {
            route: 'error',
            name: 'error-page',
            path: 'app/ErrorPage'
        }
    ];

    function findRoute(routeName) {
        const route = AvaibleRoutes.find((val) => val.route === routeName);
        if (route) {
            return route;
        }

        const defaultPage = AvaibleRoutes.find((val) => val.route === 'default');
        if (defaultPage) {
            return defaultPage;
        }

        const errorPage = AvaibleRoutes.find((val) => val.route === 'error');
        if (errorPage) {
            return errorPage;
        }

        return null;
    }

    async function prepareHtmlElement(route) {
        try {
            let htmlFile = await ajax.getFile(`${route.path}/${route.name}.component.html`);
            const cssFile = await ajax.getFile(`${route.path}/${route.name}.component.css`);
            const jsFile = await ajax.getFile(`${route.path}/${route.name}.component.js`);
    
            htmlFile += `<style> ${cssFile} </style>`;
            htmlFile += `<script> ${jsFile} </script>`;
    
            return htmlFile;
        } catch(error) {
            return null;
        }
    } 

    async function loadComponent(name) {
        const routerOutlet = document.querySelector('router-outlet');
        if (!routerOutlet) {
            console.error('Cant find router-outlet');
            return;
        }

        const route = findRoute(name);
        if (!route) {
            console.error(`Cant find route - ${name}`);
            return;
        }

        const html = await prepareHtmlElement(route);
        if (!html) {
            console.error(`Cant prepare html for route - ${route.route}`);
            return;
        }

        routerOutlet.innerHTML = html;
    }

    return {
        loadComponent: loadComponent
    }

})();
