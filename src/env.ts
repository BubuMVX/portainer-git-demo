import { load } from 'ts-dotenv';

export const env = load({
    MESSAGE: {
        type: String,
        default: 'Hello world!',
    },
    PORT: {
        type: Number,
        default: 8080,
    },
});
