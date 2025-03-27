const { insertChannel, getChannel, updateChannel, deleteChannel } = require('../repositories/channelRepository');

exports.createNewChannel = async (userId, title, description) => {
    return await insertChannel(userId, title, description);
};

exports.findChannelById = async (channelId) => {
    return await getChannel(channelId);
};

exports.modifyChannel = async (channelId, channelData) => {
    return await updateChannel(channelId, channelData);
};

exports.removeChannel = async (channelId) => {
    return await deleteChannel(channelId);
};
