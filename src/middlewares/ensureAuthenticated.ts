import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayLoad {
    sub: string;
}


export function ensureAuthenitcated(request: Request, response: Response, next: NextFunction) {
    
    //Recebe o auth token
    const authToken = request.headers.authorization;

    //Verificar se token esta preenchido
    if(!authToken){
        return response.status(401).json({
            error: "401 Unauthorized. Token is required!"
        })
    }
    
    //Validar se token eh valido
    const token = authToken.split(" ");   

    try {
        const { sub } = verify(token[1], "56ef35eb2a4b2367460ebb9514c347fd") as IPayLoad;

        //Recupera informacoes do usuario
        request.user_id = sub;

        return next();
        
    } catch(err) {
        return response.status(401).json({
            error: "401 Unauthorized. Token is invalid or expired!"
        })
    }

}