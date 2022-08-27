import * as mongoDB from 'mongodb';
import dotenv from 'dotenv';

const url = dotenv.config().parsed?.MONGO_URL;

export const db: { courses?: mongoDB.Db; coursesList: string[] } = { coursesList: [] };

export const connectToDB = async () => {
  if (url) {
    const client = new mongoDB.MongoClient(url);
    await client.connect();

    const courses: mongoDB.Db = client.db('courses');
    db.courses = courses;

    const coursesList = await courses.listCollections().toArray();
    db.coursesList = coursesList.map((x: any) => x.name);
    console.log('Connected to database');
  } else {
    throw new Error('No url provided');
  }
};
