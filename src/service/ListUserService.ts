import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";



class ListUserService {
    async execute() {
        const usersRepositories = getCustomRepository(UsersRepositories);

        const users = await usersRepositories.find({
            where: {
                admin: false //Retorna apenas usuarios que nao sao admin
            }
        });

        return users;
    }

}

export { ListUserService };