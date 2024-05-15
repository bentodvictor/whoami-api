import express, {Request, Response, Express} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';

const app: Express = express();

// Enabel CORS
app.use(cors({ optionsSuccessStatus: 200 }));

// URL-encoded data will be parsed with the querystring library.
// Parses the JSON string in the request body and exposes it in the req.body property
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set homepage
app.get("/", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/api/whoami", (req: Request, res: Response) => {
    res.json({
        ipaddress: req.headers['host'] || "",
        language: req.headers['accept-language'] || "",
        software: req.headers['user-agent'] || ""
    });
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Your app is listening on port ${process?.env?.PORT || 3000}`);
});