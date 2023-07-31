import { JsonDataFormat } from "../interfaces/resultInterfaces";
import { APIError } from "./apiError";

// src/api/httpClient.ts
const baseUrl = "http://localhost:8080";

const headers = {
    'Content-Type': 'application/json'
};

async function fetchResource(path: string, config: RequestInit) {
    try {
        const response = await fetch(`${baseUrl}${path}`, config);
        const data = await response.json();

        if (!response.ok) {
            throw new APIError("Request failed", data, response.status);
        }

        return data;
    } catch (error) {
        if (error instanceof Error) {
            const customError = error.message === "Failed to fetch"
                ? new APIError("There was a problem connecting to the server", null, 0)
                : new APIError(error.message, null, 0);
            throw customError;
        }

        throw error;
    }
}

export async function post(path: string, body: JsonDataFormat[]) {
    const config: RequestInit = {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
    };
    return fetchResource(path, config);
}
export default {
};