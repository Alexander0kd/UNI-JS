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

    function ngFor(page, count, interpolationData) {
        let response = '';

        for (let i = 0; i < count; i++) {
            let pageClone = page;

            if (interpolationData != null) {
                const data = interpolationData[i];
                if (data) {                    
                    pageClone = interpolate(pageClone, data);
                }
            }

            response += `${pageClone}\n`;
        }
        
        return response;
    }

    function interpolate(template, data) {
        return template.replace(/{{\s*(.*?)\s*}}/g, (match, key) => {
            return data[key.trim()] || '';
        });
    }

    function handleError(error, mesage) {
        console.error(mesage, error);
    }

    return {
        GET: GET,
        ngFor: ngFor,
        interpolate: interpolate
    }
})();
