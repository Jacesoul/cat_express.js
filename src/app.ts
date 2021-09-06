import * as express from "express";
import { Cat, CatType } from "./app.model";
const app: express.Express = express();

// 미들웨어는 use메서드를 사용해서 만든다. 세번째 인자 next는 이 함수가 다음 라우터로 이동할수 있는 함수이다.
app.use((req, res, next) => {
    console.log(req.rawHeaders[0]);
    console.log("this is logging middleware");
    next(); // 프런트에서 들어와서 미들웨어를 한번 걸치고 next()를 통해 라우터로 이동한다.
});
// 만약에 미들웨어가 가장 마지막에 작동한다면 아무런 로깅이 찍히지 않는다. 익스프레스가 위에서 내려오면서 원하는 엔드포인트를 찾으면 통신을 끊어버리기 때문이다. 이렇게 때문에 미들웨어는 순서가 중요하다.

// 이렇게 콜백함수에 next을 넣게 되면 아래쪽 같은 라우터에 넘어가게 된다. (미들웨어처럼 동작을 한다)
app.get("/cats/blue", (req, res, next) => {
    console.log(req.rawHeaders[0]);
    console.log("this is blue middleware");
    next();
});

// app.get은 라우터이다. 라우터에 대한 콜백함수에 res,req의 정보가 담기게 되고 res.send메소드를 통해 클라이언트에 리소스를 보내준다.
app.get("/cats", (req: express.Request, res: express.Response) => {
    console.log(req);
    res.send({ cats: Cat }); // key와 value가 동일하면 하나로 생략할수 있다.
});

app.get("/cats/blue", (req, res) => {
    res.send({ blue: Cat[0] });
});

// 아무 라우터에 해당이 되지 않는다면 마지막에 에러를 잡는 미들웨어를 생성한다.
app.use((req, res, next) => {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});

app.listen(3000, () => {
    console.log("server is on ... ");
});
