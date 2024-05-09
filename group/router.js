const router = (() => {
    /**
     * Finds a route extended data based on the given route name.
     * If the route is not found, it returns the default route or error route.
     *
     * @param {string} routeName The name of the route to find.
     * @returns {Object|null} The found route object or null if no route is found.
     */
    function findRoute(routeName) {
        // Search for the route with the given name
        const route = window.AvailableRoutes.find((val) => val.route === routeName);
        if (route) {
            return route;
        }

        // If the route is not found, search for the default route
        const defaultPage = window.AvailableRoutes.find((val) => val.route === 'default');
        if (defaultPage) {
            return defaultPage;
        }

        // If the default route is not found, search for the error route
        const errorPage = window.AvailableRoutes.find((val) => val.route === 'error');
        if (errorPage) {
            return errorPage;
        }

        // If no route is found, return null
        return null;
    }

    /**
     * Prepares a component by fetching its HTML, CSS, and JavaScript files.
     * The CSS file is modified to include a 'router-outlet' class at the beginning of each rule.
     * The HTML file is updated to include the modified CSS within a <style> tag.
     *
     * @param {Object} route The route object containing the path and name of the component.
     * @param {string} route.path The path to the directory containing the component files.
     * @param {string} route.name The name of the component.
     * @returns {Promise<Object|null>} A Promise that resolves to an object containing the prepared HTML and JavaScript files,
     * or null if any file fetching or modification fails.
     */
    async function prepareComponent(route) {
        try {
            // Fetch the HTML file
            let htmlFile = await ajax.getFile(`${route.path}/${route.name}.component.html`);

            // Fetch the CSS file
            let cssFile = await ajax.getFile(`${route.path}/${route.name}.component.css`);

            // Fetch the JavaScript file
            const jsFile = await ajax.getFile(`${route.path}/${route.name}.component.js`);

            // Modify the CSS file to include a 'router-outlet' class at the beginning of each rule
            cssFile = cssFile.replace(/^(.*?)(?=\s*{)/gm, 'router-outlet $1');

            // Update the HTML file to include the modified CSS within a <style> tag
            htmlFile += `<style> ${cssFile} </style>`;

            // Return the prepared HTML and JavaScript files
            return {
                htmlFile,
                jsFile
            };
        } catch(error) {
            // If any file fetching or modification fails, return null
            return null;
        }
    } 

    /**
     * Loads a component based on the given route name.
     * It finds the route, prepares the component, and updates the router-outlet with the component's HTML and JavaScript.
     *
     * @param {string} name The name of the route to load.
     * @returns {Promise<void>} A Promise that resolves when the component is loaded, or rejects if any error occurs.
     */
    async function loadComponent(name) {
        // Check if AvailableRoutes is defined in the global scope
        if (!window.AvailableRoutes) {
            console.error('Cant find AvailableRoutes');
            return;
        }

        // Find the router-outlet element
        const routerOutlet = document.querySelector('router-outlet');
        if (!routerOutlet) {
            console.error('Cant find router-outlet');
            return;
        }

        // Find the route based on the given name
        const route = findRoute(name);
        if (!route) {
            console.error(`Cant find route - ${name}`);
            return;
        }

        // Prepare the component by fetching its HTML and JavaScript files
        const page = await prepareComponent(route);
        if (!page) {
            console.error(`Cant prepare html for route - ${route.route}`);
            return;
        }

        // Update the router-outlet with the component's HTML
        routerOutlet.innerHTML = page.htmlFile;

        // Create a new script element and set its innerHTML to the component's JavaScript
        const scriptElement = document.createElement('script');
        scriptElement.innerHTML = page.jsFile;

        // Prepend the script element to the router-outlet to ensure the JavaScript is executed before other scripts
        setTimeout(() => {
            routerOutlet.prepend(scriptElement);
        }, 20);
    }

    return {
        loadComponent: loadComponent
    }

})();
