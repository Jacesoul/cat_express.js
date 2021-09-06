import * as express from "express";
import { Cat, CatType } from "./app.model";
const app: express.Express = express();

// * logging middleware
// 미들웨어는 use메서드를 사용해서 만든다. 세번째 인자 next는 이 함수가 다음 라우터로 이동할수 있는 함수이다.
app.use((req, res, next) => {
    console.log(req.rawHeaders[0]);
    console.log("this is logging middleware");
    next(); // 프런트에서 들어와서 미들웨어를 한번 걸치고 next()를 통해 라우터로 이동한다.
});
// 만약에 미들웨어가 가장 마지막에 작동한다면 아무런 로깅이 찍히지 않는다. 익스프레스가 위에서 내려오면서 원하는 엔드포인트를 찾으면 통신을 끊어버리기 때문이다. 이렇게 때문에 미들웨어는 순서가 중요하다.

// * json middleware
//express에서 body(json)를 읽을수 있도록 미들웨어를 추가해줘야한다.
app.use(express.json());

// * READ 고양이 전체 데이터 다 조회
app.get("/cats", (req, res) => {
    try {
        const cats = Cat;
        // throw new Error("db connect error");
        res.status(200).send({
            success: true,
            data: {
                cats,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

// * READ 특정 고양이 데이터 조회
// :id는 파라미터가 되어서 동적라우팅이 된다.
app.get("/cats/:id", (req, res) => {
    try {
        const params = req.params;
        console.log(params);
        const cat = Cat.find((cat) => {
            return cat.id === params.id;
        });
        // throw new Error("db connect error");
        res.status(200).send({
            success: true,
            data: {
                cat,
            },
        });
    } catch (error) {
        res.status(400).send({
            success: false,
            error: error.message,
        });
    }
});

// * CREATE 새로운 고양이 추가 api
app.post("/cats", (req, res) => {
    try {
        const data = req.body;
        Cat.push(data); // CREATE
        res.status(200).send({
            success: true,
            data: { data },
        });
    } catch (error) {}
});

// * 404 middleware
// 아무 라우터에 해당이 되지 않는다면 마지막에 에러를 잡는 미들웨어를 생성한다.
app.use((req, res, next) => {
    console.log("this is error middleware");
    res.send({ error: "404 not found error" });
});

app.listen(3000, () => {
    console.log("server is on ... ");
});
