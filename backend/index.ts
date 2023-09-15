// import express, { Express, Request, Response } from 'express';
// const mongoose = require('mongoose')
// const multer = require('multer')
// const { Schema } = mongoose;
// const cors = require('cors');
// const { stringify } = require('querystring');

// const server: Express = express();

// type File = {
//     fieldname: String,
//     originalname: String,
//     encoding: String,
//     mimetype: String,
//     size: String,
//     destination: String,
//     filename: String,
//     path: String,
//     buffer: String
// }


// main().catch(err=> console.log(err))
// async function main() {
//     await mongoose.connect('mongodb+srv://srishti:O0yGuoL4mvUfa8o3@cluster0.oowp1mh.mongodb.net/multistepForm').then(() => console.log('db')).catch((err: any) => console.log(err));
//     console.log('database connected')
// }

// const dataSchema = new Schema({
//     firstName: String,
//     lastName: String,
//     age: Number,
//     email: String,
//     password: String,
//     image: String

// })

// server.use(cors());
// server.use(express.json());

// const Data = mongoose.model('Data', dataSchema)

// const storage = multer.diskStorage({
//     destination: function (req: any, file: File, cb: (arg0: null, arg1: string) => void) {
//         cb(null, 'images');
//     },
//     filename: function (req: any, file: File, cb: (arg0: null, arg1: any) => void) {
//         console.log(file + "+++++")
//         cb(null, file.originalname)
//     }
// });



// let upload = multer({ storage })
// console.log(upload+"******")

// server.post('/submit', upload.single('image'), (req:Request, res: Response) => {
//     console.log(req.files,"-----")
//     const newData = {
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         age: req.body.age,
//         email: req.body.email,
//         password: req.body.password,
//         image: req.file?.filename
//     }
//     console.log(newData)

//     const data = new Data(newData)

//     data.save()
//         .then((doc: any) => {
//             res.status(201).json(doc);
        
//         })
//         .catch((err: any) => res.status(400).json(err))

// })

// server.listen(8080, () => {
//     console.log('server2')
// })

import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import { Schema } from 'mongoose';
import cors from 'cors';

const app: Express = express();

// type File = {
//     fieldname: string;
//     originalname: string;
//     encoding: string;
//     mimetype: string;
//     size: number;
//     destination: string;
//     filename: string;
//     path: string;
//     buffer: Buffer;
// }

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb+srv://srishti:O0yGuoL4mvUfa8o3@cluster0.oowp1mh.mongodb.net/multistepForm');
    console.log('Database connected');
}

const dataSchema = new Schema({
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    password: String,
    image: Array<String>
});

app.use(cors());
app.use(express.json());

const Data = mongoose.model('Data', dataSchema);

const storage = multer.diskStorage({
    destination: function (
        req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, destination: string) => void
    ){
        callback(null, 'images');
    },
    filename: function (req: Request,
        file: Express.Multer.File,
        callback: (error: Error | null, filename: string) => void
    ) {
        callback(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/submit', upload.array('images', 5), (req: Request, res: Response) => {
    // if (!req.file) {
    //     return res.status(400).json({ error: 'No image provided' });
    // }

    console.log(req.body)
    console.log("-----abc "+ req.files+ "-----")

    const filenames: string[] = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => {console.log(file);return file.filename});
      console.log(filenames)

    const newData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
        password: req.body.password,
        image: filenames
    };
    console.log(newData)
    const data = new Data(newData);

    data.save()
        .then((doc: any) => {
            res.status(201).json(doc);
        })
        .catch((err: any) => res.status(400).json(err));
});

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});
