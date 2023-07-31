import { JsonDataFormat } from "../interfaces/resultInterfaces";
import { post } from "./httpClient";

export async function postTestResults(testResults: JsonDataFormat[]) {
    try {
        const response = await post('/storage/save_butgtons', testResults);
        return response.message;
    } catch (error) {
        console.error(`Error posting test results: ${error}`);
        throw error;
    }
}