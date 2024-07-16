const customFetch = async (url, options) => {
    const accessToken = localStorage.getItem("access_token");
    const headers = options.headers;
    return await fetch(url, {
        ...options,
        headers: {
            ...headers,
            Authorization: headers?.Authorization || `Bearer ${accessToken}`,
            "Content-Type": "application/json",
            "Apollo-Require-Preflight": "true",
        },
    });
};
export const fetchWrapper = async (url, options) => {
    const response = await customFetch(url, options);
    const responseClone = response.clone();
    const body = await responseClone.json();
    const error = getGraphQLErrors(body);
    if (error) {
        throw error;
    }
    return response;
};
const getGraphQLErrors = (body) => {
    if (!body) {
        return {
            message: "Unknown error",
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }
    if ("errors" in body) {
        const errors = body?.errors;
        const messages = errors?.map((error) => error?.message)?.join("");
        const code = errors?.[0]?.extensions?.code;
        return {
            message: messages || JSON.stringify(errors),
            statusCode: "INTERNAL_SERVER_ERROR",
        };
    }
    return null;
};
