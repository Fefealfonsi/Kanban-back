import { UserInputDTO, LoginInputDTO } from "./entities/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { TokenManager } from "../services/TokenManager";
import { CustomError } from "./error/CustomError";

export class UserBusiness {
  constructor(
    private idGenerator: IdGenerator,
    private hashManager: HashManager,
    private tokenManager: TokenManager,
    private userDatabase: UserDatabase
  ) {}

  async createUser(user: UserInputDTO) {
    if (!user.email || !user.name || !user.nickname || !user.password) {
      throw new CustomError(417, "Invalid input to signUp");
    }

    if (user.email.indexOf("@") === -1) {
      throw new CustomError(417, "Invalid email format");
    }

    if (user.password.length < 6) {
      throw new CustomError(417, "Password should have more than 6 digits");
    }

    const id = this.idGenerator.generate();

    const hashPassword = await this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
      id,
      user.name,
      user.nickname,
      user.email,
      hashPassword
    );

    const accessToken = this.tokenManager.generateToken({
      id,
    });

    if (!accessToken) {
      throw new CustomError(417, "No token found");
    }

    return accessToken;
  }

  async getUserByNickname(user: LoginInputDTO) {
    if (!user.nickname || !user.password) {
      throw new CustomError(417, "Invalid input to login ll");
    }

    const userFromDB = await this.userDatabase.getUserByNickname(user.nickname);

    const passwordIsCorrect = await this.hashManager.compare(
      user.password,
      userFromDB.password
    );

    if (!passwordIsCorrect) {
      throw new CustomError(417, "Invalid password");
    }

    const accessToken = this.tokenManager.generateToken({
      id: userFromDB.id,
    });

    return accessToken;
  }
}
