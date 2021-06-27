import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";


interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService {
    async execute( { tag_id, user_sender, user_receiver, message }: IComplimentRequest) {
        
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);


        //Verifica se o receptor não é o mesmo usuário que o criador
        if(user_sender === user_receiver) {
            throw new Error("Error! Sender can't be the same as reciever :(")
        }


        //Verifica se existe usuario de destino
        const userReceiverExists = await usersRepositories.findOne({  
            id: user_receiver 
        })

        if(!userReceiverExists) {
            throw new Error("The Receiver user does not exists!")
        }

        //Cria o elogio
        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;

    }
}

export { CreateComplimentService }