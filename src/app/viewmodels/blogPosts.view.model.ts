import { PostBlog } from '../models/postBlog.model';

interface IBlogPost{
    blogPosts: PostBlog[];
    blogSelected: PostBlog;
    totalPages: number;
    totalRegisters: number;
}

export class BlogPostViewModel implements IBlogPost{
    public blogPosts: PostBlog[];
    public blogSelected: PostBlog;
    public totalPages: number;
    public totalRegisters: number;

    constructor(obj: IBlogPost){
        this.blogPosts =  (obj && obj.blogPosts) || null;
        this.blogSelected =  (obj && obj.blogSelected) || null;
        this.totalPages =  (obj && obj.totalPages) || null;
        this.totalRegisters =  (obj && obj.totalRegisters) || null;
    }
}