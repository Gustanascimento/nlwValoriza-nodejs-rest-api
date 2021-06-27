import {Request, Response} from "express";
import { ListSentComplimentsService } from "../service/ListSentComplimentsService";

class ListUserSentComplimentsController {
    async handle(request: Request, response: Response) {

        //Usuario logado = pega id da request
        const { user_id } = request;

        const listUserSentComplimentsService = new ListSentComplimentsService();

        const compliments = await listUserSentComplimentsService.execute(user_id);

        return response.json(compliments);
    }
}

export { ListUserSentComplimentsController }