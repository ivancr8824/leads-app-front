export interface PostBlog{
    id?: number,
    date?: string,
    title: string,
    author: string,
    description: string,
    comment: string,
    urlImage: string
}

export interface ResponseListPostBlog<T>{
    ok: boolean,
    msg?: string,
    results?: T,
    totalPages?: number,
    totalRegisters?: number,
}