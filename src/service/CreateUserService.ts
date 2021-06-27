import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
    name: string;
    email: string;
    admin?: boolean; //? - deixa o elemento opcional
    password: string;
}

class CreateUserService {
    async execute({name, email, admin, password}: IUserRequest) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        
        if(!admin) {
            admin = false;
        }

        if(!email) {
            throw new Error("Email is required!");
        }

        //SELECT * FROM users WHERE email = 'email'
        const userAlreadyExists = await usersRepositories.findOne({
            email,
        });

        if(userAlreadyExists) {
            throw new Error("User already exists!");
        }

        const passHash = await hash(password, 8);

        const user = usersRepositories.create({
            name,
            email,
            admin,
            password: passHash,
        });

        await usersRepositories.save(user);

        return user;
    }
}

export {CreateUserService}