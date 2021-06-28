import { Injectable } from '@angular/core';
import { BlogPostViewModel } from '../viewmodels/blogPosts.view.model';
import { Action, State, StateContext } from '@ngxs/store';
import * as fromAction from '../actions/blog.action';
import { BlogService } from '../services/blog.service';
import { tap } from 'rxjs/operators';
import { SubmitAction, NoSubmitAction, LoadingAction, NoLoadingAction } from '../actions/ui.action';
import Swal from 'sweetalert2';

export const KEY_BLOG = 'blog';

@Injectable()
@State<BlogPostViewModel>({
    name: KEY_BLOG,
    defaults: {
        blogPosts: null,
        blogSelected: null,
        totalPages: 0,
        totalRegisters: 0
    }
})

export class BlogState{
    constructor(
        private blogService: BlogService
    ){}

    @Action(fromAction.ListPostsBlogAction)
    public listPostsBlog(
        { dispatch, patchState }:StateContext<BlogPostViewModel>,
        { page, limit }: fromAction.ListPostsBlogAction
    ){
        dispatch(new LoadingAction());
        return this.blogService.listPostsBlog(page, limit).pipe(
            tap(response => {
                dispatch(new NoLoadingAction());
                if(response.ok){
                    patchState({
                        blogPosts: response.results,
                        totalPages: response.totalPages,
                        totalRegisters: response.totalRegisters
                    });
                }else{
                    Swal.fire('Error', response.msg, 'error');
                }
            })
        );
    }

    @Action(fromAction.PostToUpdateAction)
    public postToUpdate(
        { dispatch, patchState }: StateContext<BlogPostViewModel>,
        { id }: fromAction.PostToUpdateAction
    ){
        dispatch(new SubmitAction());
        return this.blogService.postToUpdate(id).pipe(
            tap(response => {
                dispatch(new NoSubmitAction());
                if(response.ok){
                    patchState({
                        blogSelected: response.results
                    });
                }else{
                    Swal.fire('Error', response.msg, 'error');
                }
            })
        );
    }

    @Action(fromAction.AddPostBlogAction)
    public addnewPostBlog(
        { dispatch }: StateContext<BlogPostViewModel>,
        { newPost }: fromAction.AddPostBlogAction
    ){
        dispatch(new SubmitAction());
        return this.blogService.addNewPostBlog(newPost).pipe(
            tap(response => {
                dispatch(new NoSubmitAction());
                if(response.ok){
                    Swal.fire('Creacion Existosa', response.msg, 'success');
                }else{
                    Swal.fire('Error', response.msg, 'error');
                }
            })
        );
    }

    @Action(fromAction.UpdatePostBlogAction)
    public updatePostBlog(
        { dispatch }: StateContext<BlogPostViewModel>,
        { post }: fromAction.UpdatePostBlogAction
    ){
        dispatch(new SubmitAction());
        return this.blogService.updatePostBlog(post).pipe(
            tap((response) => {
                dispatch(new NoSubmitAction());
                if(response.ok){
                    Swal.fire('Actualizacion Existosa', response.msg, 'success');
                }else{
                    Swal.fire('Error', response.msg, 'error');
                }
            })
        );
    }

    @Action(fromAction.DeletePostsBlogAction)
    public deletePost(
        { dispatch }: StateContext<BlogPostViewModel>,
        { id, limit, page }: fromAction.DeletePostsBlogAction
    ){
        dispatch(new SubmitAction());
        return this.blogService.deletePostBlog(id).pipe(
            tap((response) => {
                dispatch(new NoSubmitAction());
                if(response.ok){
                    dispatch(new fromAction.ListPostsBlogAction(page, limit));
                    Swal.fire('Eliminacion Existosa', response.msg, 'success');
                }else{
                    Swal.fire('Error', response.msg, 'error');
                }
            })
        );
    }
}