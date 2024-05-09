const ajax = (() => {
    const BASE_URL = 'https://raw.githubusercontent.com/Alexander0kd/UNI-JS/main/group';

    async function getFile(url) {
        try {
            const response = await fetch(`${BASE_URL}/${url}`);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return await response.text();
        } catch(error) {
            console.error('From [GET] function', error);
        }
    }

    return {
        getFile: getFile
    }

})();
