type Role = "assistant" | "user"; // assistant or user

export type ChatEntry = {
    role: Role;
    content: string;
}

export type ChatLog = {
    messages: ChatEntry[];
}