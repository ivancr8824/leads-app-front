import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { ListPostsBlogAction, DeletePostsBlogAction } from '../../../../actions/blog.action';
import { UiViewModel } from '../../../../viewmodels/ui.view.model';
import { UiState } from '../../../../state/ui.state';
import { BlogState } from '../../../../state/blog.state';
import { Observable } from 'rxjs';
import { BlogPostViewModel } from '../../../../viewmodels/blogPosts.view.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { PostBlog } from '../../../../models/postBlog.model';

@Component({
  selector: 'app-admin-content-blog',
  templateUrl: './admin-content-blog.component.html',
  styleUrls: ['./admin-content-blog.component.css']
})
export class AdminContentBlogComponent implements OnInit {

  @Select(BlogState) model$: Observable<BlogPostViewModel>;
  @Select(UiState) UiModel$: Observable<UiViewModel>;
  
  limits: number = 5;
  page: number = 1;
  
  constructor(
    private store: Store,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.store.dispatch(new ListPostsBlogAction(this.page, this.limits));
  }

  changeTotalRegisters(){
    this.store.dispatch(new ListPostsBlogAction(1, this.limits));
  }

  pagination(page: number){
    this.page = page;
    this.store.dispatch(new ListPostsBlogAction(page, this.limits));
  }

  newPost(){
    this.router.navigateByUrl('others/publish-blog/new');
  }

  updatePost(id: number){
    this.router.navigateByUrl(`others/publish-blog/${id}`);
  }

  deletePost(post: PostBlog){
    Swal.fire({
      title: '¿Elminar este registro?',
      text: `Realmente quieres eliminar el post ${post.title}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Procesando',
          text: 'Eliminando espere por favor...',
          showConfirmButton: false,
          allowOutsideClick: false,
          onBeforeOpen: () => {
            Swal.showLoading()
          }
        })
        this.store.dispatch(new DeletePostsBlogAction(post.id, this.page, this.limits));
      }
    })
  }

}
