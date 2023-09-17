type Role = "assistant" | "user"; // assistant or user

export interface ChatType {
    role: Role;
    content: string;
}