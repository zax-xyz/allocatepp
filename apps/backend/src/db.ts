import * as mongoDB from 'mongodb'

const url = 'mongodb+srv://csesoc:syncs@cluster0.3ih5idr.mongodb.net/?retryWrites=true&w=majority';

export const db: {courses?: mongoDB.Db, coursesList: string[]} = {coursesList: []}

export const connectToDB = async () => {
    const client = new mongoDB.MongoClient(url);
    await client.connect();

    const courses: mongoDB.Db = client.db('courses');
    db.courses = courses;

    const coursesList = await courses.listCollections().toArray();
    db.coursesList = coursesList.map((x: any) => x.name);
    console.log('Connected to database')
}
