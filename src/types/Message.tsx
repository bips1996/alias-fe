export interface Message {
  from: number; // userId
  text: string;
  status: "sent" | "delivered" | "seen";
}