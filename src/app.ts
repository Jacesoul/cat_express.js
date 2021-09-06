import * as express from "express";
const app: express.Express = express();
// 여기서 app은 express의 인스턴스라고 생각하면된다. app이 곧 서버역할을 한다.
const port: number = 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    console.log(req);
    res.send("Hello World!"); // send라는 메서드를 통해 response를 보내준다.
});

app.post("/test", (req, res) => {
    res.send({ person: "seol" });
});

app.listen(port, () => {
    // listen은 서버를 연다라고 생각하면 된다.
    console.log(`Example app listening at http://localhost:${port}`);
});
