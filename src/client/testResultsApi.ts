import { ElementResult } from "../sidebar/interfaces";
import { post } from "./httpClient";

export async function postTestResults(testResults: ElementResult[]) {
    try {
        const response = await post('/storage/save_butgtons', testResults);
        return response.message;
    } catch (error) {
        console.error(`Error posting test results: ${error}`);
        throw error;
    }
}