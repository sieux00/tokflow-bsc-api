require('dotenv').config({ path: '../.env' });

module.exports = {
    stripHexPrefix(string) {
        if (string[0] === "0" && string[1] === "x") {
            return string.substr(2, string.length)
        }
        return string
    },

    getAddressType(address) {
        if (address[0] === "0" && address[1] === "x") {
            return "ETH"
        } else {
            return "TRX"
        }
    },

    randomInt(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    },

    randomFloat(min, max, fixed = 2) {
        return (Math.random() * (min - max) + max).toFixed(fixed)
    },

    parseLogsData(data) {
        return data.match(new RegExp('.{1,' + 66 + '}', 'g'));
    },

    hexToAddress(hex) {
        return `0x${hex.substr(26)}`
    },

    randomStr(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }
}