document.addEventListener("DOMContentLoaded", () => {
    const AvailableRoutes = [
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
    
    function onInit() {
        window.AvailableRoutes = AvailableRoutes;
        router.loadComponent('home');
    }
    
    onInit();    

});
