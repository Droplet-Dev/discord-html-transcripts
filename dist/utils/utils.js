"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.downloadImageToDataURL = exports.parseDiscordEmoji = exports.formatBytes = void 0;
const undici_1 = require("undici");
const twemoji_1 = __importDefault(require("twemoji"));
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
function parseDiscordEmoji(emoji) {
    if (emoji.id) {
        return `https://cdn.discordapp.com/emojis/${emoji.id}.${emoji.animated ? 'gif' : 'png'}`;
    }
    const codepoints = twemoji_1.default.convert.toCodePoint(emoji.name);
    return `https://twemoji.maxcdn.com/v/latest/svg/${codepoints}.svg`;
}
exports.parseDiscordEmoji = parseDiscordEmoji;
async function downloadImageToDataURL(url) {
    const response = await (0, undici_1.request)(url);
    const dataURL = await response.body
        .arrayBuffer()
        .then((res) => {
        const data = Buffer.from(res).toString('base64');
        const mime = response.headers['content-type'];
        return `data:${mime};base64,${data}`;
    })
        .catch((err) => {
        if (!process.env.HIDE_TRANSCRIPT_ERRORS) {
            console.error(`[discord-html-transcripts] Failed to download image for transcript: `, err);
        }
        return null;
    });
    return dataURL;
}
exports.downloadImageToDataURL = downloadImageToDataURL;
//# sourceMappingURL=utils.js.map