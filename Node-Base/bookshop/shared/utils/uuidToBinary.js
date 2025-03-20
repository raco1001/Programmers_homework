


const uuidToBinary = (uuid) => {
    if (!uuid || typeof uuid !== 'string') {
        throw new TypeError(`Invalid UUID: ${uuid}`);
    }
    return Buffer.from(uuid.replace(/-/g, ""), "hex");
};



const binaryToUUID = (binary) => {
    const hex = binary.toString("hex"); 
    return [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20, 32),
    ].join("-"); 
};


module.exports = {uuidToBinary, binaryToUUID}