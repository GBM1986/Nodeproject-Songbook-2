import { resolve } from 'path';
import db from '../config/db.config.js'

class SongModel {
    
    constructor() { }

    list = (req,res) => {
		// SQL Query med json return
        return new Promise((resolve, reject) => {
            const orderBy = req.query.orderBy || 's.id'
            const dir = req.query.dir || 'ASC'
            const limit = req.query.limit ? ` LIMIT ${req.query.limit}` : ''
            const sql = `SELECT s.id, s.title, a.name 
                            FROM song s 
                            JOIN artist a 
                            ON s.artist_id = a.id
                            ORDER BY ${orderBy} ${dir}
                            ${limit}`
            db.query(sql, (error,result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result)
                }
            })
        })

            
	}

    // get = (req,res) => {
    //     return new Promise((resolve, reject) => {
    //         const sql = `SELECT s.id, s.title, s.content, s.artist_id 
    //                         a.name AS artist, s.created
    //                         FROM song s 
    //                         JOIN artist a 
    //                         ON s.artist_id = a.id
    //                         WHERE s.id = ?`
    //         db.query(sql, [req.params.id], (error,result) => {
    //             if(error) {
    //                 reject(error);
    //             } else {
    //                 resolve(result)
    //             }
    //         })
    //     })

            
	// }
}

export default SongModel;