"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTranscript = exports.generateFromMessages = void 0;
const discord_js_1 = require("discord.js");
const generator_1 = __importDefault(require("./generator"));
const types_1 = require("./types");
// version check
if (discord_js_1.version.split('.')[0] !== '14') {
    console.error(`[discord-html-transcripts] Versions v3.x.x of discord-html-transcripts are only compatible with js v14.x.x, and you are using v${discord_js_1.version}.` +
        `    Please install discord-html-transcripts v2.x.x using "npm install discord-html-transcripts@^2".`);
    process.exit(1);
}
/**
 *
 * @param messages The messages to generate a transcript from
 * @param channel  The channel the messages are from (used for header and guild name)
 * @param options  The options to use when generating the transcript
 * @returns        The generated transcript
 */
async function generateFromMessages(messages, channel, options = {}) {
    var _a, _b, _c, _d, _e;
    // turn messages into an array
    const transformedMessages = messages instanceof discord_js_1.Collection ? Array.from(messages.values()) : messages;
    // const startTime = process.hrtime();
    // render the messages
    const html = await (0, generator_1.default)({
        messages: transformedMessages,
        channel,
        saveImages: (_a = options.saveImages) !== null && _a !== void 0 ? _a : false,
        callbacks: Object.assign({ resolveChannel: async (id) => channel.client.channels.fetch(id).catch(() => null), resolveUser: async (id) => channel.client.users.fetch(id).catch(() => null), resolveRole: channel.isDMBased() ? () => null : async (id) => { var _a; return (_a = channel.guild) === null || _a === void 0 ? void 0 : _a.roles.fetch(id).catch(() => null); } }, ((_b = options.callbacks) !== null && _b !== void 0 ? _b : {})),
        poweredBy: (_c = options.poweredBy) !== null && _c !== void 0 ? _c : true,
        favicon: (_d = options.favicon) !== null && _d !== void 0 ? _d : 'guild',
    });
    // get the time it took to render the messages
    // const renderTime = process.hrtime(startTime);
    // console.log(`[discord-html-transcripts] Rendered ${transformedMessages.length} messages in ${renderTime[0]}s ${renderTime[1] / 1000000}ms`);
    // return the html in the specified format
    if (options.returnType === types_1.ExportReturnType.Buffer) {
        return Buffer.from(html);
    }
    if (options.returnType === types_1.ExportReturnType.String) {
        return html;
    }
    return new discord_js_1.AttachmentBuilder(Buffer.from(html), {
        name: (_e = options.filename) !== null && _e !== void 0 ? _e : `transcript-${channel.id}.html`,
    });
}
exports.generateFromMessages = generateFromMessages;
/**
 *
 * @param channel The channel to create a transcript from
 * @param options The options to use when creating the transcript
 * @returns       The generated transcript
 */
async function createTranscript(channel, options = {}) {
    // validate type
    if (!channel.isTextBased()) {
        // @ts-expect-error(2339): run-time check
        throw new TypeError(`Provided channel must be text-based, received ${channel.type}`);
    }
    // fetch messages
    let allMessages = [];
    let lastMessageId;
    const { limit } = options;
    const resolvedLimit = typeof limit === "undefined" || limit === -1 ? Infinity : limit;
    // until there are no more messages, keep fetching
    // eslint-disable-next-line no-constant-condition
    while (true) {
        // create fetch options
        const fetchLimitOptions = { limit: 100, before: lastMessageId };
        if (!lastMessageId)
            delete fetchLimitOptions.before;
        // fetch messages
        const messages = await channel.messages.fetch(fetchLimitOptions);
        // add the messages to the array
        allMessages.push(...messages.values());
        lastMessageId = messages.lastKey();
        // if there are no more messages, break
        if (messages.size < 100)
            break;
        // if the limit has been reached, break
        if (allMessages.length >= resolvedLimit)
            break;
    }
    if (resolvedLimit < allMessages.length)
        allMessages = allMessages.slice(0, limit);
    // generate the transcript
    return generateFromMessages(allMessages.reverse(), channel, options);
}
exports.createTranscript = createTranscript;
exports.default = {
    createTranscript,
    generateFromMessages,
};
__exportStar(require("./types"), exports);
//# sourceMappingURL=index.js.map