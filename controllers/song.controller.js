import db from '../config/db.config.js'

class SongController {
    constructor() {
        console.log('Class Songcontroller instantiated')
    }

    list = (req,res) => {
        console.log('hent alle sange');
        const sql = `SELECT s.id, s.title, a.name
                        FROM song s
                        JOIN artist a
                        ON s.artist_id = a.id`
        db.query(sql, (error, result) => {
            if(error) {
                console.error(error);
                return res.status(500).jston({error: 'Internal Server Error'})
            } else {
                return res.json(result);
            }
        })
    }
    
    details = (req,res) => {
        console.log('Hent detaljer');
        const { id } = req.params
        const sql = `SELECT s.id, s.title, s.content,
                                s.artist_id, a.name
                        FROM song s
                        JOIN artist a
                        ON s.artist_id = a.id
                        WHERE s.id = ${id}`
        db.query(sql,(error,result) => {
            if(error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error'})
            } else { 
                if (result.length === 0) {
                    return res.status(404).json({ error: 'Song details not found' });
                  }
                return res.json(result[0])
            }
        })
    }
    
    create = (req, res) => {
        const { title, content, artist_id } = req.body
        const sql = `INSERT INTO song (title, content, artist_id)
                        VALUES (?,?,?)`
        db.query(sql, [title,content, artist_id],(error, result) =>{
            if(error) {
                console.error(error)
            } else {
                return res.json({
                    message: 'New song created',
                    newID: result.insertId
                })
            }
        })
    }
}

export default SongController