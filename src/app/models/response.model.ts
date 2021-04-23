import { Lead } from "./lead.model";

export interface Response {
    ok: boolean,
    totalPages?: number,
    totalRegistros?: number,
    leads?: Lead[],
    msg?: string
}