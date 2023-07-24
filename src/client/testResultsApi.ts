import { ElementResult } from "../sidebar/interfaces";
import { post } from "./httpClient";

export async function postTestResults(testResults: ElementResult[]) {
    try {
        const response = await post('/storage/save_buttons', testResults).then((res) => res.message)
        return response;
    } catch (error) {
        console.error(`Error posting test results: ${error}`);
        throw error;
    }
}