export class APIError extends Error {
    public response: any;
    public status: number;
  
    constructor(message: string, response: any, status: number) {
      super(message);
      this.name = "APIError";
      this.response = response;
      this.status = status;
    }
  }

  export default {
};