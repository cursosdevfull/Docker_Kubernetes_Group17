interface EnvWindow extends Window {
    env: {
        API_ENDPOINT: string;
    }
}

declare const window: EnvWindow;

export const endpoint = window.env.API_ENDPOINT === "${API_ENDPOINT}" ? 'http://localhost:3000' : window.env.API_ENDPOINT;