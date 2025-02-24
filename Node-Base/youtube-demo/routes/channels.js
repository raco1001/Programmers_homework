const express = require('express');
const fs = require('fs');
const path = require('path');
const CHANNELS_FILE = path.join('/usr/src/youtube-demo/', 'channels.json'); 
const router = express.Router();

router.use(express.json());

/** 채널 API */
const loadChannels = () => {
    try {
        if (!fs.existsSync(CHANNELS_FILE)) {
            console.log("channels.json 파일이 없어서 새로 생성합니다.");
            fs.writeFileSync(CHANNELS_FILE, JSON.stringify([])); 
        }

        const fileData = fs.readFileSync(CHANNELS_FILE, 'utf-8');

        if (!fileData.trim()) { 
            console.log("channels.json 파일이 비어 있어 초기화합니다.");
            fs.writeFileSync(CHANNELS_FILE, JSON.stringify([]));
            return [];
        }

        const channels = JSON.parse(fileData);

        if (!Array.isArray(channels)) { 
            console.error("채널 데이터가 배열이 아님. 파일을 초기화합니다.");
            fs.writeFileSync(CHANNELS_FILE, JSON.stringify([]));
            return [];
        }

        return channels;
    } catch (error) {
        console.error("channels.json을 불러오는 중 오류 발생:", error);
        return [];
    }
};

const saveChannels = (channels) => {
    if (!Array.isArray(channels)) {
        console.error("저장할 데이터가 배열이 아닙니다. 저장하지 않습니다.");
        return;
    }
    try {
        fs.writeFileSync(CHANNELS_FILE, JSON.stringify(channels, null, 2));
    } catch (error) {
        console.error("channels.json 저장 중 오류 발생:", error);
    }
};

// 채널 전체 조회 (GET /channels)
// 채널 생성 (POST /channels)
router
   .route('/')
   .get((req, res) => {
      try {
         const channels = loadChannels();
         res.json({ status: 'success', data: channels });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .post((req, res) => {
      try {
         console.log("요청 데이터:", req.body);
         let { user_id, channel_title, description, sub_num, video_num, is_active } = req.body;

         let channels = loadChannels();
         if (!Array.isArray(channels)) {
            throw new Error("채널 데이터가 배열이 아닙니다!");
         }

         console.log("로드된 채널 데이터:", channels);

         if (channels.some(channel => channel.channel_title === channel_title)) {
            return res.status(400).json({ status: 'error', message: '이미 존재하는 채널입니다.' });
         }

         const newChannel = {
            id: channels.length > 0 ? Math.max(...channels.map(c => c.id)) + 1 : 1,
            user_id,
            channel_title,
            description,
            sub_num: sub_num || 0,
            video_num: video_num || 0,
            created_at: new Date().toISOString().split('T')[0],
            updated_at: new Date().toISOString().split('T')[0],
            is_active: is_active !== undefined ? is_active : true
         };

         channels.push(newChannel);
         saveChannels(channels);

         console.log(`${newChannel.channel_title} 채널 생성 완료!`);
         res.status(201).json({ status: 'success', message: `${newChannel.channel_title} 채널이 생성되었습니다!`, data: newChannel });
      } catch (error) {
         console.error("서버 오류 발생:", error);
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   });

// 채널 개별 조회 (GET /channels/:id)
// 채널 개별 수정 (PUT /channels/:id)
// 채널 개별 삭제 (DELETE /channels/:id)
router
   .route('/:id')
   .get((req, res) => {
      try {
         let { id } = req.params;
         id = parseInt(id);

         const channels = loadChannels();
         const channel = channels.find(channel => channel.id === id);

         if (!channel) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
         }

         res.json({ status: 'success', data: channel });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .put((req, res) => {
      try {
         let { id } = req.params;
         id = parseInt(id);

         let channels = loadChannels();
         const index = channels.findIndex(channel => channel.id === id);

         if (index === -1) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
         }

         let { channel_title, description, sub_num, video_num, is_active } = req.body;
         let updatedChannel = channels[index];

         if (channel_title) updatedChannel.channel_title = channel_title;
         if (description) updatedChannel.description = description;
         if (sub_num !== undefined) updatedChannel.sub_num = sub_num;
         if (video_num !== undefined) updatedChannel.video_num = video_num;
         if (is_active !== undefined) updatedChannel.is_active = is_active;

         updatedChannel.updated_at = new Date().toISOString().split('T')[0];

         channels[index] = updatedChannel;
         saveChannels(channels);

         res.json({ status: 'success', message: '채널 정보가 업데이트되었습니다.', data: updatedChannel });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .delete((req, res) => {
      try {
         let { id } = req.params;
         id = parseInt(id);

         let channels = loadChannels();
         const index = channels.findIndex(channel => channel.id === id);

         if (index === -1) {
            return res.status(404).json({ status: 'error', message: '해당 채널이 존재하지 않습니다.' });
         }

         const deletedChannel = channels.splice(index, 1);
         saveChannels(channels);

         res.json({ status: 'success', message: `채널 '${deletedChannel[0].channel_title}'이 삭제되었습니다.` });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   });

module.exports = router;
