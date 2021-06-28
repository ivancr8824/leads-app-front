import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostBlog, ResponseListPostBlog } from '../models/postBlog.model';
import { Observable } from 'rxjs';
import { IStatusResponse } from '../models/statusResponse.model';

const URL: string = 'https://leads-backend-consalud.herokuapp.com/api/blog';
//const URL: string = 'http://localhost:4000/api/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(
    private http: HttpClient
  ) { }

  addNewPostBlog(post: PostBlog): Observable<ResponseListPostBlog<string>>{
    return this.http.post<ResponseListPostBlog<string>>(`${URL}/new`, post);
  }

  listPostsBlog(page: number = 1, limit: number = 5): Observable<ResponseListPostBlog<PostBlog[]>>{
    return this.http.get<ResponseListPostBlog<PostBlog[]>>(`${URL}/listPosts/${page}/${limit}`);
  }

  postToUpdate(id: number): Observable<ResponseListPostBlog<PostBlog>>{
    return this.http.get<ResponseListPostBlog<PostBlog>>(`${URL}/postToUpdate/${id}`);
  }

  updatePostBlog(post: PostBlog): Observable<ResponseListPostBlog<string>>{
    return this.http.put<ResponseListPostBlog<string>>(`${URL}/update/${post.id}`, post);
  }

  deletePostBlog(id: number):Observable<ResponseListPostBlog<string>>{
    return this.http.delete<ResponseListPostBlog<string>>(`${URL}/delete/${id}`);
  }
}
