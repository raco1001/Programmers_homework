const express = require('express');
const conn = require('../mariadb');
const router = express.Router();
const {param, validationResult} = require('express-validator');

router.use(express.json());


const validate = (req, res)=>{
    const err = validationResult(req);

    if(!err.isEmpty()){
        return res.status(400).json(err.array());
    }
}



// 채널 생성 (POST /channels)
router
    .route('/:id')
    .post( 
        [
            param('id').notEmpty().isUUID().withMessage('유효한 UUID 형식의 ID가 필요합니다.'),
            validate

        ]
        , (req, res) => {
            try {
                const { user_id, channel_title, description} = req.body;

                if (!user_id || !channel_title) {
                    return res.status(400).json({ status: 'error', message: 'user_id와 channel_title은 필수입니다.' });
                }


                const existing = conn.query(
                    'SELECT id FROM channels WHERE channel_title = ?',
                    [channel_title]
                );

                if (existing.length > 0) {
                    return res.status(400).json({ status: 'error', message: '이미 존재하는 채널명입니다.' });
                }

                let sql = `INSERT INTO channels (user_id, channel_title, description) VALUES (?, ?, ?)`;
                let values = [user_id, channel_title, description];
                conn.query(
                    sql,
                    values,
                    (err,result)=>{
                        if(err){
                            return res.status(500).json({ message: '채널정보를 생성할 수 없습니다.'});
                        }

                        res.status(201).json({ status: 'success', message: '채널이 생성되었습니다!', channel_id: result.insertId });

                    }

                );

            } catch (error) {
                console.error("채널 생성 중 오류 발생:", error);
                res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            } 
        }
    );



// 채널 개별 조회 (GET /channels/:id)
// 채널 개별 수정 (PUT /channels/:id)
// 채널 개별 삭제 (DELETE /channels/:id)

router
    .route('/:id')
    .get(async (req, res) => {
        try {
            let { id } = req.params;

            id = parseInt(id);
            
            let sql = 'SELECT * FROM channels WHERE id = ?';
            let values = [id];

            conn.query(sql, values,
                (err, results)=>{

                    if (err) {
                        return res.status(500).json({ status: 'error', message: '서버오류 발생' });
                    }

                    if (results.length === 0) {
                        return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
                    }

                    if (results.length > 1) {
                        return res.status(404).json({ status: 'error', message: '채널 정보가 다수 존재합니다.' });
                    }

                    res.json({ status: 'success', data: results[0] });
                }
            );
            
        } catch (error) {
            console.error("채널 조회 중 오류 발생:", error);
            res.status(500).json({ status: 'error', message: '서버 오류 발생' });
        } 
    })
    .put(async (req, res) => {
            try {
                let { id } = req.params;
                id = parseInt(id);
                const { channel_title, description, sub_num, video_num, is_active } = req.body;

                const existing = conn.query('SELECT * FROM channels WHERE id = ?', [id]);
                if (existing.length === 0) {
                    return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
                }

                let sql = `UPDATE channels SET 
                            channel_title = COALESCE(?, channel_title),
                            description = COALESCE(?, description),
                            sub_num = COALESCE(?, sub_num),
                            video_num = COALESCE(?, video_num),
                            is_active = COALESCE(?, is_active),
                            updated_at = NOW()
                            WHERE id = ?`;
                let values = [channel_title, description, sub_num, video_num, is_active, id];

                conn.query(
                    sql,
                    values,
                    (err,results)=>{
                        if(err){
                            return res.status(500).json({ message: '채널정보를 업데이트 할 수 없습니다.'});
                        }
                        res.json({ status: 'success', message: '채널 정보가 업데이트되었습니다.', affectedRows: results.affectedRows });
                    }
                );

                

            } catch (error) {
                console.error("채널 수정 중 오류 발생:", error);
                res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            }
    })
    .delete(async (req, res) => {
            try {
                const { id } = req.params;
                id = parseInt(id);

                const existing = await conn.query('SELECT * FROM channels WHERE id = ?', [id]);
                if (existing.length === 0) {
                    return res.status(404).json({ status: 'error', message: '해당 채널이 존재하지 않습니다.' });
                }

                const result = await conn.query('DELETE FROM channels WHERE id = ?', [id]);

                res.json({ status: 'success', message: `채널이 삭제되었습니다.`, affectedRows: result.affectedRows });

            } catch (error) {
                console.error("채널 삭제 중 오류 발생:", error);
                res.status(500).json({ status: 'error', message: '서버 오류 발생' });
            } 
    });






module.exports = router;
