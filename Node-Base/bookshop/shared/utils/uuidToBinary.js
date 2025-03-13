
exports.uuidToBinary = (uuid) => {
    return Buffer.from(uuid.replace(/-/g, ""), "hex");
};


exports.binaryToUUID = (binary) => {
    const hex = binary.toString("hex"); 
    return [
        hex.substring(0, 8),
        hex.substring(8, 12),
        hex.substring(12, 16),
        hex.substring(16, 20),
        hex.substring(20, 32),
    ].join("-"); 
};
