import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { AutenthicateUserController } from "./controllers/AutenthicateUserController";
import { CreateComplimentController } from "./controllers/CreateComplimentController";
import { ensureAuthenitcated } from "./middlewares/ensureAuthenticated";
import { ListUserSentComplimentsController } from "./controllers/ListUserSentComplimentsController";
import { ListUserReceivedComplimentsController } from "./controllers/ListUserReceivedComplimentsController";
import { ListTagsController } from "./controllers/ListTagsController";
import { ListUsersController } from "./controllers/ListUsersController";

const router = Router();

//Controllers
const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const autenthicateUserController = new AutenthicateUserController();
const createComplimentController = new CreateComplimentController();
const listUserSentComplimentsController = new ListUserSentComplimentsController();
const listUserReceivedComplimentsController = new ListUserReceivedComplimentsController();
const listTagsController = new ListTagsController();
const listUsersController = new ListUsersController();

//Routes
router.post("/users", createUserController.handle);
router.post("/tags", ensureAuthenitcated, ensureAdmin, createTagController.handle);
router.post("/login", autenthicateUserController.handle);
router.post("/compliments", ensureAuthenitcated, createComplimentController.handle);

router.get("/tags", ensureAuthenitcated, listTagsController.handle);
router.get("/users/compliments/sent", ensureAuthenitcated, 
    listUserSentComplimentsController.handle);
router.get("/users/compliments/received", ensureAuthenitcated, 
    listUserReceivedComplimentsController.handle);
router.get("/users", ensureAuthenitcated, listUsersController.handle);



export { router }