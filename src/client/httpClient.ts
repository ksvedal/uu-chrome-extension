import { JsonDataFormat } from "../interfaces/resultInterfaces";
import { APIError } from "./apiError";

const baseUrl = "http://localhost:8080";
const headers = {
    'Content-Type': 'application/json'
};

export async function fetchResource(path: string, config: RequestInit): Promise<any> {
    try {
        const response = await fetch(`${baseUrl}${path}`, config);

        let data: any;
        try {
            data = await response.json();
        } catch (error) {
            console.error("Could not parse response body as JSON");
        }

        if (!response.ok) {
            //evt. data.error, usikker på hvem som gir best svar, og hvor data.error kommer fra
            throw new APIError(response.statusText, data, response.status);
        }
        return data;
    } catch (error) {
        if (error instanceof Error) {
            console.log("An error occurred during the fetch operation");
            const customError = error instanceof APIError ? error : new APIError(error.message, null, 0);
            if (customError.message == "Failed to fetch") {
                customError.message = "There was a problem connecting to the server";
            }
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