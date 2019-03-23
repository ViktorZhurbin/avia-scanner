module.exports = {
    handleError: (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('Response data', error.response.data);
            console.log('Response status', error.response.status);
            // console.log(error.response.headers);
            throw error;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            throw new Error("No response was received");
        } else if (error.message) {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            throw new Error(error.message);
        } else {
            throw new Error('Something went wrong')
        }
    },
};
