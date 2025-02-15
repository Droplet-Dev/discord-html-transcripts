import { type Awaitable, type Channel, type Message, type Role, type User } from 'discord.js';
export declare type RenderMessageContext = {
    messages: Message[];
    channel: Channel;
    callbacks: {
        resolveChannel: (channelId: string) => Awaitable<Channel | null>;
        resolveUser: (userId: string) => Awaitable<User | null>;
        resolveRole: (roleId: string) => Awaitable<Role | null>;
    };
    poweredBy?: boolean;
    saveImages: boolean;
    favicon: 'guild' | string;
};
export default function renderMessages({ messages, channel, callbacks, ...options }: RenderMessageContext): Promise<string>;
