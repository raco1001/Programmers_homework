const pool = require('../database/mariadb');

exports.insertChannel = async (userId, title, description) => {
    const [result] = await pool.query(
        'INSERT INTO channels (user_id, channel_title, description, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())',
        [userId, title, description]
    );
    return { id: result.insertId, user_id: userId, channel_title: title, description };
};

exports.getChannel = async (channelId) => {
    const [rows] = await pool.query('SELECT * FROM channels WHERE id = ?', [channelId]);
    return rows.length ? rows[0] : null;
};

exports.updateChannel = async (channelId, channelData) => {
    const { channel_title, description, sub_num, video_num, is_active } = channelData;
    const [result] = await pool.query(
        `UPDATE channels SET 
            channel_title = COALESCE(?, channel_title),
            description = COALESCE(?, description),
            sub_num = COALESCE(?, sub_num),
            video_num = COALESCE(?, video_num),
            is_active = COALESCE(?, is_active),
            updated_at = NOW()
         WHERE id = ?`,
        [channel_title, description, sub_num, video_num, is_active, channelId]
    );
    return result.affectedRows > 0;
};

exports.deleteChannel = async (channelId) => {
    const [result] = await pool.query('DELETE FROM channels WHERE id = ?', [channelId]);
    return result.affectedRows > 0;
};
