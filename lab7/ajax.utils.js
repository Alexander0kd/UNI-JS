const ajax = (() => {

    async function GET(url, isFile) {
        try {
            const response = await fetch(url, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            if (isFile) {
                return await response.text();
            }

            return await response.json();
        } catch(error) {
            handleError(error, 'From [GET] function:')
        }
    }

    function handleError(error, mesage) {
        console.error(mesage, error);
    }

    return {
        GET: GET
    }
})();
