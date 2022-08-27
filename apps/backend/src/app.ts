import express, {Request, Response} from 'express';
import mongoose from 'mongoose';


const app = express();

mongoose.connect('mongodb+srv://csesoc:syncs@cluster0.3ih5idr.mongodb.net/?retryWrites=true&w=majority'
  ).then(() => {
    app.listen(3001);
    console.log("sussy things happening at port 3000");
  }).catch(err => console.log('err', err))


/**
 * Routes
 */

app.get("/course/:id", (req: Request, res: Response) => { 
  const courseId = req.params.id;
  return res.send("amongus code for " + courseId);
})

app.get("/courses/", (req: Request, res: Response) => { 
  const courses = mongoose.connection.db.listCollections().toArray((_, names) => names)
  return res.send(courses);
})