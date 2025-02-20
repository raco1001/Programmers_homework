const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CHANNELS_FILE = path.join('/usr/src/youtube-demo/', 'channels.json'); 
app.use(express.json());
app.listen(PORT, () => console.log(`http://localhost:3007`));




/** 채널 API*/


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
// 채널 생성(POST /channels)
app
   .route('/chnnels')
   .get('/channels', (req, res) => {
   try {
      let { userId, channelTitle } = req.body;

      const channels = loadChannels();
      
      const channel = channels.find(channel => channel.userId === userId);
      
      if (!channel) {
         return res.status(404).json({ status: 'error', message: '사용자를 찾을 수 없습니다.' });
      }

      if (channel.channelTitle !== channelTitle) {
         return res.status(401).json({ status: 'error', message: '비밀번호가 일치하지 않습니다.' });
      }

      res.json({ status: 'success', message: `${channel.name}님 환영합니다!` });
   } catch (error) {
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }
})
   .post((req, res) => {
   try {
      console.log("요청 데이터:", req.body);

      let { userId, name, channelTitle } = req.body;


      let channels = []; 

      try {
         channels = loadChannels();
         if (!Array.isArray(channels)) {
            throw new Error("채널 데이터가 배열이 아닙니다!");
         }
      } catch (error) {
         console.error("채널 데이터를 불러오는 중 오류 발생:", error);
         return res.status(500).json({ status: 'error', message: '서버 데이터 로드 실패' });
      }
널
      console.log("로드된 채널 데이터:", channels);

      if (channels.some(channel => channel.channelTitle === channelTitle)) {
         return res.status(400).json({ status: 'error', message: '이미 존재하는 채널입니다.' });
      }

      const newchannel = { userId, name, channelTitle };
      channels.push(newchannel);
      try {
         saveChannels(channels);
      } catch (error) {
         console.error("채널 데이터를 저장하는 중 오류 발생:", error);
         return res.status(500).json({ status: 'error', message: '채널 데이터 저장 실패' });
      }

      console.log(`${newchannel.name}님 가입 완료!`);

      res.status(201).json({ status: 'success', message: `${newchannel.name}님의 채널${channelTitle}생성을 축하합니다!` });
   } catch (error) {
      console.error("서버 오류 발생:", error);
      res.status(500).json({ status: 'error', message: '서버 오류 발생' });
   }})
   ;





// 채널 개별 조회 (GET /channels/:id)
// 채널 개별 수정 (PUT /channels/:id)
// 채널 개별 삭제 (DELETE /channels/:id)
app
   .route('/channels/:userId')
   .get( (req, res) => {
      try {
         let { userId } = req.params;
         console.log(req.params);
         console.log(userId);
         const channels = loadChannels();
         console.log(channels);
         const channel = channels.find(channel => channel.userId === userId);

         if (!channel) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
         }

         res.json({ status: 'success', data: channel });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .put( (req, res) => {
      try {
         let { userId } = req.params;
         console.log(req.params);
         console.log(userId);
         const channels = loadChannels();
         console.log(channels);
         const channel = channels.find(channel => channel.userId === userId);

         if (!channel) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
         }

         res.json({ status: 'success', data: channel });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   })
   .delete('/channels/:userId', (req, res) => {
      try {
         let { userId } = req.params;

         let channels = loadChannels();
         console.log(channels);
         console.log(req.params);
         console.log(userId);
         const index = channels.findIndex(channel => channel.userId === userId);

         if (index === -1) {
            return res.status(404).json({ status: 'error', message: '해당 채널이 존재하지 않습니다.' });
         }

         const deletedchannel = channels.splice(index, 1);
         saveChannels(channels);

         res.json({ status: 'success', message: `${deletedchannel[0].id}님 탈퇴 완료.` });
      } catch (error) {
         res.status(500).json({ status: 'error', message: '서버 오류 발생' });
      }
   });


