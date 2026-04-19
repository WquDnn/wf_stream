import express from "express"
import db from "./db.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"
import cors from "cors"


const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use(cors({
    origin: "*",
    headers: "*",
    methods: "*"
}))

app.get("/", (req, res) => {
    res.end("Hello from express!")
})

function getMovie(req, res) {
    const videoPath = path.resolve(__dirname, "public", req.filename)
    console.log(req.filename)
    const stat = fs.statSync(videoPath)
    const fileSize = stat.size

    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
        if (start >= fileSize) {
            res.status(416).send("Запит за межами діапазону")
            return
        }
        const chunksize = end - start + 1
        const file = fs.createReadStream(videoPath, { start, end })
        const head = {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Content-Length": chunksize,
            "Accept-Ranges": "bytes",
            "Content-Type": "video/mp4"
        }
        res.writeHead(206, head)
        file.pipe(res)
    } else {
        const head = {
            "Content-Type": "video/mp4",
            "Content-Length": fileSize,

        }
        res.writeHead(200, head)
        fs.createReadStream(videoPath).pipe(res)
    }
}

app.get("/movies/:id", (req, res, next) => {
    const id = req.params.id;
    db.query("SELECT * FROM movie WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500)
            res.send("Server error")
        } else {
            if (result.length === 0) {
                res.status(404)
                res.send("Movie not found.")
            } else {
                req.filename = result[0].filename
                next()
            }
        }
    })
}, getMovie)

app.get("/movies", (req, res) => {
    let query = "SELECT * FROM movie"

    if (req.query.sort) {
        if (["id", "title", "genre"].includes(req.query.sort)) {
            query += " ORDER BY " + req.query.sort
        } else {
            return res.status(400).send("Invalid sort field")
        }
    }

    if (req.query.sortType) {
        const sortType = req.query.sortType.toUpperCase()
        if (["ASC", "DESC"].includes(sortType)) {
            query += " " + sortType
        } else {
            return res.status(400).send("Invalid USER!!!!!!")
        }


    }

    let queryParams = []

    if (req.query.limit){
        const limit = parseInt(req.query.limit, 10)
        if(!isNaN(limit) && limit > 0){
            query += " LIMIT ?"
            queryParams.push(limit)
        }else{
            return res.status(400).send("Invalid limit!")
        }
    }
    if (req.query.offset){
        const offset = parseInt(req.query.offset, 10)
        if(!isNaN(offset) && offset > 0){
            query += " OFFSET ?"
            queryParams.push(offset)
        }else{
            return res.status(400).send("Invalid limit!")
        }
    }

        db.query(query, queryParams, (err, result) => {
            if (err) {
                console.error("SQL error", err)
                res.status(500).send("Internal Server error")
            } else {
                res.json(result)
            }
        })
})

app.get("/search", (req, res)=>{
    if(!req.query.title){
        return res.status(400).send("Title parametr is required")
    }
    const title = `%${req.query.title}%`

    const query = "SELECT * FROM movie WHERE title LIKE ? LIMIT 10"

    db.query(query, [title], (err, result)=>{
        if(err){
            console.error("SQL error: ", err)
            return res.status(500).send("INTERNAL SERVER ERROR!")

    }
res.json(result)
})
})

app.listen(3000, () => console.log("Server started!"))