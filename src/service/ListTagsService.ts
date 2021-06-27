import { getCustomRepository } from "typeorm"
import { TagsRepositories } from "../repositories/TagsRepositories"


class ListTagsService {
    async execute() {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        let tags = await tagsRepositories.find();

        //Inserir # antes de todas as tags na hora de listar
        tags = tags.map((tag) => ({...tag, nameCustom: `#${tag.name}`}));

        return tags;
    }
}

export { ListTagsService }