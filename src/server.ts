import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

type Article = {
    id: number,
    title: string,
    content: string
}

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

const corsOptions = {
    origin: 'http://someotherdomain.com',
    optionSuccessStatus: 200 //some legacy browsers (IE11, various)
}


app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

app.get('/test-cors', cors(corsOptions), function (req, res, next) {
    res.json({msg: 'This is CORS-enabled with a middle ware'})
})

app.get('/articles', (_req: Request, res: Response) => {
    try {
        res.send('this is the INDEX route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.get('/articles/:id', (_req: Request, res: Response) => {
    try {
        res.send('this is the SHOW route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/articles', (req: Request, res: Response) => {
    const article: Article = {
        title: req.body.title,
        content: req.body.content
      }
    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.post('/articles', (req: Request, res: Response) => {
    const article: Article = {
        id: req.params.id as unknown as number,
        title: req.body.title,
        content: req.body.content
      }

    try {
        res.send('this is the CREATE route')
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

app.put('/articles/:id', (req: Request, res: Response) => {
    const article: Article = {
      id: req.params.id as unknown as number, 
      title: req.body.title,
      content: req.body.content
    }
    try {
       res.send('this is the EDIT route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})

app.delete('/articles/:id', (_req: Request, res: Response) => {
    try {
       res.send('this is the DELETE route')
    } catch (err) {
       res.status(400)
       res.json(err)
    }
})


app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})
