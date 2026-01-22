// fetchApi.js
const fetchApi = async (url, fetchConfig) => {
    try {
        // Fetch request
        const response = await fetch(url, fetchConfig);

        // Response Interceptor: Logging incoming response
        // console.log('Incoming response:', response);

        // Check if the response status is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse response as JSON
        const responseData = await response.json();
        return responseData; // Return the response data
    } catch (error) {
        console.error('Response error:', error);
        throw error; // Rethrow the error
    }
};

export default fetchApi;
