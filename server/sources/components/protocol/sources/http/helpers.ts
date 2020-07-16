import { Response } from "./response";

export function serverNotFound(): Response {
    const response = new Response();

    response.code = 504;

    return response;
}
