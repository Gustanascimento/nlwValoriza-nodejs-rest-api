import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"



interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService {
    async execute({email, password}: IAuthenticateRequest) {
        
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verifiy if email exists
        const user = await usersRepositories.findOne({
            email
        });

        if (!user) {
            throw new Error("Email/Password is incorrect")
        }

        //Verify if password is correct
        const passMatch = await compare(password, user.password)

        if (!passMatch) {
            throw new Error("Email/Password is incorrect")
        }

        //Info ok! Now, generate auth token
        const token = sign({
            email: user.email
        }, "56ef35eb2a4b2367460ebb9514c347fd", {  //MD5 for "gustavonlw6"
            subject: user.id,
            expiresIn: "1d", //time for token to expire
        });

        return token;

    }
}

export { AuthenticateUserService }