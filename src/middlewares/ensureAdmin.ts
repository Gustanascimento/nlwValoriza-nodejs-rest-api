import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";


export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
    
    const { user_id } = request;
    //console.log(user_id);

    //Busca informacoes do usuario
    const usersRepositories = getCustomRepository(UsersRepositories);

    //Verifica se usuario eh admin ({ var } = desestruturacao)
    const { admin } = await usersRepositories.findOne(user_id);
    

    if(admin) {
        return next();
    }

    return response.status(401).json({
        error: "Unauthorized. User not an admin! :("
    })

}