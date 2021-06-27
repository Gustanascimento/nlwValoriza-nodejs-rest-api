import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../entities/Tag";


@EntityRepository(Tag)
class TagsRepositories extends Repository<Tag> {
     //por enquanto, nenuhm metodo eh criado  
}

export {TagsRepositories}