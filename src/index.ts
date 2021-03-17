import express, {Express} from 'express'
import cors from 'cors'
import { AddressInfo } from "net";
import { UserController } from "./controller/UserController";
import { CardController } from "./controller/CardController";


const userController = new UserController();
const cardController = new CardController();

const app: Express = express();

app.use(express.json());
app.use(cors());

app.post("/signup", userController.signup);
app.post("/login", userController.login);

app.get("/cards", cardController.getCard)
app.post("/cards", cardController.createCard);
app.put("/cards/:id", cardController.updateCard);
app.delete("/cards/:id", cardController.deleteCard);


const server = app.listen(process.env.PORT || 5000, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});