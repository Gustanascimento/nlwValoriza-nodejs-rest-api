import {Request, Response} from "express";
import { ListRecievedComplimentsService } from "../service/ListRecievedComplimentsService";

class ListUserReceivedComplimentsController {
    async handle(request: Request, response: Response) {

        //Usuario logado = pega id da request
        const { user_id } = request;

        const listUserReceivedComplimentsService = new ListRecievedComplimentsService();

        const compliments = await listUserReceivedComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserReceivedComplimentsController }