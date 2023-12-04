import express from 'express'
import dotenv from 'dotenv'
import { SongRouter } from './routes/song.router.js'

dotenv.config()

const app = express()

app.use(express.urlencoded({ extended: true }))

app.use(SongRouter);

app.listen(process.env.PORT, () => {
	console.log(`Server kører på port http://localhost:${process.env.PORT}`);
})