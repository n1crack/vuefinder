export interface Upsertable {
    path: string;
    [key: string]: unknown;
}
export default function upsert<T extends Upsertable>(array: T[], element: T): void;
