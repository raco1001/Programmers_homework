const { v4: uuidv4 } = require('uuid');
const crypto = require("crypto");

const generateUUID = () => {
    return uuidv4().replace(/-/g, ''); 
};

const generateSalt = () => {
    return crypto.randomBytes(16).toString("hex");
};

const generateBinaryId = (uuid, salt) => {
    if (!uuid || !salt) {
        console.error("❌ [generateBinaryId] uuid 또는 salt 값이 비어 있음:", { uuid, salt });
        return null; 
    }

    console.log(`[generateBinaryId] uuid: ${uuid}, salt: ${salt}`);
    
    const hash = crypto.createHash("sha256").update(uuid + salt).digest("hex");
    console.log(`[generateBinaryId] SHA-256 해시값: ${hash}`);

    try {
        const binaryId = Buffer.from(hash.slice(0, 32), "hex");
        console.log(`[generateBinaryId] 변환된 BINARY(16) ID:`, binaryId);
        return binaryId;
    } catch (error) {
        console.error("[generateBinaryId] Buffer 변환 오류 발생:", error);
        return null;
    }
};

const generatePK = () => {
    const uuid = generateUUID();
    const salt = generateSalt();
    const binaryId = generateBinaryId(uuid, salt);

    return { binaryId };
};

module.exports = { generatePK };
