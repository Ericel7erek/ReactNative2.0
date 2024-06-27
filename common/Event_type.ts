import { InvitationType } from "./Invitation_type";

export interface EventType {
    id: string;
    Name: string;
    Date: {
        seconds: number;
        nanoseconds: number;
    };
    Location: string;
    userId: string;
    users: {
        userId: string;
        name: string;
        status: typeof InvitationType;
    }[];
}
