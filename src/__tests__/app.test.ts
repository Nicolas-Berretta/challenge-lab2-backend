import supertest from "supertest";
import createServer from "../utils/server";
import AuthMiddleware from "../middleware/authMiddleware.ts";
import UserRepository from "../repositories/userRepository.ts";
import UserService from "../services/userService.ts";
import {UserType} from "../utils/types.ts";
import {adAdmin, prisma} from "../utils/const.ts";

const userRepository = new UserRepository()
const userService = new UserService(userRepository);

const app = createServer()

const testUser = {
    name:"test-user",
    email: "test@mail.com",
    password:process.env.TEST_USER_PASSWORD
}

describe( 'user', () => {

    beforeAll(async () =>{
        adAdmin()
            .catch((e: any) => {
                console.error(e);
                process.exit(1);
            })
            .finally(async () => {
                await prisma.$disconnect();
            });
    })

    describe('register new user', () => {
        let newUser: UserType | null;

        describe('given the email is not in use', () =>{
            it('should return 200 and return a token', async () => {
                const {body, statusCode} = await supertest(app).post('/api/users/register')
                    .send(testUser)

                expect(statusCode).toBe(200)
                expect(body).toHaveProperty('token')
                newUser = await userService.getUserByEmail(testUser.email)
            });

            it('should login the user created previously', async () => {
                await supertest(app).post('/api/users/register').send(testUser)

                const {body, statusCode} = await supertest(app).post('/api/users/login')
                    .send({email: testUser.email, password: testUser.password})

                expect(statusCode).toBe(200)
                expect(body).toHaveProperty('token')
                newUser = await userService.getUserByEmail(testUser.email)
            });

            afterEach(async ()=>{
                if (newUser){
                    await userRepository.delete(newUser)
                }
            })
        })
    })
})



