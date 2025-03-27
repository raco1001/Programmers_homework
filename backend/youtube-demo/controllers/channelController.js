const { createNewChannel, findChannelById, modifyChannel, removeChannel } = require('../services/channelService');

exports.createChannel = async (req, res, next) => {
    try {
        const { user_id, channel_title, description } = req.body;
        const newChannel = await createNewChannel(user_id, channel_title, description);
        res.status(201).json({ status: 'success', message: '채널이 생성되었습니다!', data: newChannel });
    } catch (error) {
        next(error);
    }
};

exports.getChannelById = async (req, res, next) => {
    try {
        const channel = await findChannelById(req.params.id);
        if (!channel) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
        }
        res.json({ status: 'success', data: channel });
    } catch (error) {
        next(error);
    }
};

exports.updateChannel = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedChannel = await modifyChannel(id, req.body);
        if (!updatedChannel) {
            return res.status(404).json({ status: 'error', message: '채널 정보를 찾을 수 없습니다.' });
        }
        res.json({ status: 'success', message: '채널 정보가 업데이트되었습니다.', data: updatedChannel });
    } catch (error) {
        next(error);
    }
};

exports.deleteChannel = async (req, res, next) => {
    try {
        const deleted = await removeChannel(req.params.id);
        if (!deleted) {
            return res.status(404).json({ status: 'error', message: '해당 채널이 존재하지 않습니다.' });
        }
        res.json({ status: 'success', message: '채널이 삭제되었습니다.' });
    } catch (error) {
        next(error);
    }
};
