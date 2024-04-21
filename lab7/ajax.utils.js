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
                const data = interpolateData[i];
                if (data) {                    
                    pageClone = interpolateData(pageClone, data);
                }
            }

            response += `${pageClone}\n`;
        }
        
        console.log(response);
        return response;
    }

    function handleError(error, mesage) {
        console.error(mesage, error);
    }

    function interpolateData(template, data) {
        return template.replace(/{{\s*(.*?)\s*}}/g, (match, key) => {
            return data[key.trim()] || '';
        });
    }

    return {
        GET: GET,
        ngFor: ngFor
    }
})();
