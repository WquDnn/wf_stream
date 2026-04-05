import express from "express"
import db from "./db.js"
import path from "path"
import fs from "fs"
import { fileURLToPath } from "url"


const __dirname  = path.dirname(fileURLToPath(import.meta.url))

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))

app.get("/", (req, res)=>{
    res.end("Hello from express!")
})

function getMovie(req,res){
    const videoPath = path.resolve(__dirname, "public", req.filename)

    const stat = fs.statSync(videoPath)
    const fileSize = stat.size

    const range = req.headers.range;
    if(range){
        const parts = range.replace(/bytes=/, "").split("-")
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : filename - 1
        if(start >= fileSize) {
            res.status(416).send("Запит за межами діапазону")
            return
        }
        const chunksize = end - start + 1
        const file = fs.createReadStream(videoPath, {start, end})
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

app.get("/movies/:id", (req, res, next)=>{
    const id = req.params.id;
    db.query("SELECT * FROM movie WHERE id = ?", [id], (err, result)=>{
        if (err){
            res.status(500)
            res.send("Server error")
        }else {
            if (result.length === 0){
                res.status(404)
                res.send("Movie not found.")
            }else {
                req.filename = result[0].filename
                next()
            }
        }
    })
}, getMovie)

app.listen(3000, ()=> console.log("Server started!"))