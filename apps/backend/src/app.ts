
import express, {Request, Response} from 'express';

const app = express();

app.listen(3000, () => {
  console.log("sussy things happening at port 3000");
});

app.get("/course/", (req: Request, res: Response) => { 
  return res.send("amongus");
})