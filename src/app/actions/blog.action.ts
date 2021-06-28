import { PostBlog } from '../models/postBlog.model';

export class ListPostsBlogAction{
    static readonly type = '[Blog] Obtener listado de blogs'
    constructor(public page: number, public limit: number){}
}

export class PostToUpdateAction{
    static readonly type = '[Blog] Obtener post para actualizar'
    constructor(public id: number){}
}

export class AddPostBlogAction{
    static readonly type = '[Blog] Insertar nuevo post blog'
    constructor(public newPost: PostBlog){}
}

export class UpdatePostBlogAction{
    static readonly type = '[Blog] Actualizar post blog'
    constructor(public post: PostBlog){}
}

export class DeletePostsBlogAction{
    static readonly type = '[Blog] Eliminar post blog'
    constructor(public id: number, public page: number, public limit: number){}
}