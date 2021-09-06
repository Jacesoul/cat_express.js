import * as express from "express";
import catsRouter from "./cats/cats.route";

class Server {
    public app: express.Application;

    constructor() {
        const app: express.Application = express();
        this.app = app;
    }

    private setRoute() {
        this.app.use(catsRouter);
    }

    private setMiddleware() {
        // * logging middleware
        // 미들웨어는 use메서드를 사용해서 만든다. 세번째 인자 next는 이 함수가 다음 라우터로 이동할수 있는 함수이다.
        this.app.use((req, res, next) => {
            console.log(req.rawHeaders[0]);
            console.log("this is logging middleware");
            next(); // 프런트에서 들어와서 미들웨어를 한번 걸치고 next()를 통해 라우터로 이동한다.
        });
        // 만약에 미들웨어가 가장 마지막에 작동한다면 아무런 로깅이 찍히지 않는다. 익스프레스가 위에서 내려오면서 원하는 엔드포인트를 찾으면 통신을 끊어버리기 때문이다. 이렇게 때문에 미들웨어는 순서가 중요하다.

        // * json middleware
        //express에서 body(json)를 읽을수 있도록 미들웨어를 추가해줘야한다.
        this.app.use(express.json());

        this.setRoute();

        // * 404 middleware
        // 아무 라우터에 해당이 되지 않는다면 마지막에 에러를 잡는 미들웨어를 생성한다.
        this.app.use((req, res, next) => {
            console.log("this is error middleware");
            res.send({ error: "404 not found error" });
        });
    }

    public listen() {
        this.setMiddleware();
        this.app.listen(3000, () => {
            console.log("server is on ... ");
        });
    }
}

function init() {
    const server = new Server();
    server.listen();
}

init();
