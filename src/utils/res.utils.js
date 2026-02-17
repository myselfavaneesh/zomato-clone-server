export const sendResponse = {
    success: (
        res,
        statusCode = 200,
        message = "Success",
        data = null
    ) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    },
    error: (
        res,
        statusCode = 500,
        message = "Error",
        data = null
    ) => {
        return res.status(statusCode).json({
            success: false,
            message,
            data
        });
    }
};
