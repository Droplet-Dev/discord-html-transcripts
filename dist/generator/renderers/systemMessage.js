"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoinMessage = exports.Highlight = void 0;
const discord_components_react_1 = require("@derockdev/discord-components-react");
const discord_js_1 = require("discord.js");
const react_1 = __importDefault(require("react"));
const utils_1 = require("../../utils/utils");
async function renderSystemMessage(message) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    switch (message.type) {
        case discord_js_1.MessageType.RecipientAdd:
        case discord_js_1.MessageType.UserJoin:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "join" }, JoinMessage(message.member, message.author)));
        case discord_js_1.MessageType.ChannelPinnedMessage:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "edit" },
                react_1.default.createElement(Highlight, { color: (_b = (_a = message.member) === null || _a === void 0 ? void 0 : _a.roles.color) === null || _b === void 0 ? void 0 : _b.hexColor }, message.author.username),
                " pinned",
                ' ',
                react_1.default.createElement("i", { "data-goto": (_c = message.reference) === null || _c === void 0 ? void 0 : _c.messageId }, "a message"),
                " to this channel.",
                message.reactions.cache.size > 0 && (react_1.default.createElement(discord_components_react_1.DiscordReactions, { slot: "reactions" }, message.reactions.cache.map((reaction, id) => (react_1.default.createElement(discord_components_react_1.DiscordReaction, { key: `${message.id}r${id}`, name: reaction.emoji.name, emoji: (0, utils_1.parseDiscordEmoji)(reaction.emoji), count: reaction.count })))))));
        case discord_js_1.MessageType.GuildBoost:
        case discord_js_1.MessageType.GuildBoostTier1:
        case discord_js_1.MessageType.GuildBoostTier2:
        case discord_js_1.MessageType.GuildBoostTier3:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `m-${message.id}`, key: message.id, type: "boost" },
                react_1.default.createElement(Highlight, { color: (_e = (_d = message.member) === null || _d === void 0 ? void 0 : _d.roles.color) === null || _e === void 0 ? void 0 : _e.hexColor }, message.author.username),
                " boosted the server!"));
        case discord_js_1.MessageType.ThreadStarterMessage:
            return (react_1.default.createElement(discord_components_react_1.DiscordSystemMessage, { id: `ms-${message.id}`, key: message.id, type: "thread" },
                react_1.default.createElement(Highlight, { color: (_g = (_f = message.member) === null || _f === void 0 ? void 0 : _f.roles.color) === null || _g === void 0 ? void 0 : _g.hexColor }, message.author.username),
                " started a thread: ",
                react_1.default.createElement("i", { "data-goto": (_h = message.reference) === null || _h === void 0 ? void 0 : _h.messageId }, message.content)));
        default:
            return undefined;
    }
}
exports.default = renderSystemMessage;
function Highlight({ children, color }) {
    return react_1.default.createElement("i", { style: { color: color !== null && color !== void 0 ? color : 'white' } }, children);
}
exports.Highlight = Highlight;
const allJoinMessages = [
    '{user} just joined the server - glhf!',
    '{user} just joined. Everyone, look busy!',
    '{user} just joined. Can I get a heal?',
    '{user} joined your party.',
    '{user} joined. You must construct additional pylons.',
    'Ermagherd. {user} is here.',
    'Welcome, {user}. Stay awhile and listen.',
    'Welcome, {user}. We were expecting you ( ͡° ͜ʖ ͡°)',
    'Welcome, {user}. We hope you brought pizza.',
    'Welcome {user}. Leave your weapons by the door.',
    'A wild {user} appeared.',
    'Swoooosh. {user} just landed.',
    'Brace yourselves {user} just joined the server.',
    '{user} just joined. Hide your bananas.',
    '{user} just arrived. Seems OP - please nerf.',
    '{user} just slid into the server.',
    'A {user} has spawned in the server.',
    'Big {user} showed up!',
    "Where's {user}? In the server!",
    '{user} hopped into the server. Kangaroo!!',
    '{user} just showed up. Hold my beer.',
    'Challenger approaching - {user} has appeared!',
    "It's a bird! It's a plane! Nevermind, it's just {user}.",
    "It's {user}! Praise the sun! \\\\[T]/",
    'Never gonna give {user} up. Never gonna let {user} down.',
    'Ha! {user} has joined! You activated my trap card!',
    'Cheers, love! {user} is here!',
    'Hey! Listen! {user} has joined!',
    "We've been expecting you {user}",
    "It's dangerous to go alone, take {user}!",
    "{user} has joined the server! It's super effective!",
    'Cheers, love! {user} is here!',
    '{user} is here, as the prophecy foretold.',
    "{user} has arrived. Party's over.",
    'Ready player {user}',
    '{user} is here to kick butt and chew bubblegum. And {user} is all out of gum.',
    "Hello. Is it {user} you're looking for?",
];
function JoinMessage(member, fallbackUser) {
    const randomMessage = allJoinMessages[Math.floor(Math.random() * allJoinMessages.length)];
    return randomMessage
        .split('{user}')
        .flatMap((item, i) => {
        var _a, _b;
        return [
            item,
            react_1.default.createElement(Highlight, { color: (_a = member === null || member === void 0 ? void 0 : member.roles.color) === null || _a === void 0 ? void 0 : _a.hexColor, key: i }, (_b = member === null || member === void 0 ? void 0 : member.nickname) !== null && _b !== void 0 ? _b : fallbackUser.username),
        ];
    })
        .slice(0, -1);
}
exports.JoinMessage = JoinMessage;
//# sourceMappingURL=systemMessage.js.map