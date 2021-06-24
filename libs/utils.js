

const packRes = (res, statusCode = 200) => {
    try {
        const headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH,PUT,DELETE,HEAD,TRACE"
        };

        const packed = {
            headers,
            statusCode,
            body: JSON.stringify(res)
        };
        return packed;
    } catch (error) {
        console.log("packRes error", error);
        throw error;
    }
};

const packError = (error, message, statusCode = 500) => {
    try {
        if(error.statusCode) statusCode = error.statusCode;
        // if(process.env.ENV.toUpperCase() == "PROD") return packRes(message, statusCode);

        //BOTH print the error in the console AND return the message in response
        console.error(error);
        return packRes(error.message, statusCode);
    } catch (error) {
        console.log("packError error", error);
        throw error;
    }
};

module.exports = {
    packRes,
    packError
}