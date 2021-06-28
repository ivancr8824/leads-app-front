import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HtmlEditorService, ImageService, LinkService, RichTextEditorComponent, ToolbarService } from '@syncfusion/ej2-angular-richtexteditor';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UploadImagesService } from '../../../../services/upload-images.service';
import { KEYS_THUMBSNAP } from '../../../../../environments/environment';
import Swal from 'sweetalert2';
import { PostBlog } from '../../../../models/postBlog.model';
import { Store, Select } from '@ngxs/store';
import { AddPostBlogAction, PostToUpdateAction, UpdatePostBlogAction } from '../../../../actions/blog.action';
import { UiState } from '../../../../state/ui.state';
import { UiViewModel } from '../../../../viewmodels/ui.view.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BlogState } from '../../../../state/blog.state';
import { BlogPostViewModel } from 'src/app/viewmodels/blogPosts.view.model';

@Component({
  selector: 'app-publish-content-blog',
  templateUrl: './publish-content-blog.component.html',
  styleUrls: ['./publish-content-blog.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService]
})
export class PublishContentBlogComponent implements OnInit {

  public tools: object = {
    items: [
        'Undo', 'Redo', '|',
        'Bold', 'Italic', 'Underline', '|',
        'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
        'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
        'Indent', 'Outdent', '|', 'CreateLink'
    ]
  };

  public iframe: object = { enable: true };
  public height: number = 300;

  public id: string = '';

  @ViewChild('templateRTE') rteEle: RichTextEditorComponent;
  @ViewChild('inputFile') inputFile: ElementRef;

  @Select(UiState) uISubmit$: Observable<UiViewModel>;
  @Select(BlogState) Model$: Observable<BlogPostViewModel>;

  blogForm: FormGroup;

  imageVisible: boolean = false;
  loadingImage: boolean = false;
  urlService: string;

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private uploadImageService: UploadImagesService,
    private router: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');

    this.blogForm = this.fb.group({
      titlePost: new FormControl('', Validators.required),
      createFor: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      comment: new FormControl('', Validators.required),
      file: [''],
      url: new FormControl('')
    });

    if(this.id !== 'new'){
      this.store.dispatch(new PostToUpdateAction(parseInt(this.id))).subscribe(() => {
        this.Model$.subscribe(blog => {
          this.blogForm.patchValue({
            titlePost: blog.blogSelected.title,
            createFor: blog.blogSelected.author,
            description: blog.blogSelected.description,
            comment: blog.blogSelected.comment,
            url: blog.blogSelected.urlImage
          });

          this.imageVisible = true;
          this.urlService = blog.blogSelected.urlImage;
        });
      })
    }
  }

  get titlePost() {
    return this.blogForm.get('titlePost');
  }

  get createFor() {
    return this.blogForm.get('createFor');
  }
  
  get description() {
    return this.blogForm.get('description');
  }

  get comment() {
    return this.blogForm.get('comment');
  }

  rteCreated(): void {
    this.rteEle.element.focus();
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.blogForm.get('file').setValue(file);
    }
  }

  uploadFile(){
    this.imageVisible = false;
    this.loadingImage = true;

    const formData = new FormData();
    formData.append('key', KEYS_THUMBSNAP.CLIENT_ID);
    formData.append('media', this.blogForm.get('file').value);

    this.uploadImageService.uploadImage(formData)
    .subscribe(response => {
      if(response.success){
        this.urlService = response.data.media;
        this.blogForm.patchValue({
          url: response.data.media
        });
        this.imageVisible = true;
      }else{
        Swal.fire('Error', response.error.message, 'error');
      }
    });

    this.inputFile.nativeElement.value = "";
    this.loadingImage = false;
  }

  saveBlog(){
    const newPost: PostBlog = {
      title: this.blogForm.value.titlePost.trim(),
      author: this.blogForm.value.createFor.trim().toUpperCase(),
      description: this.blogForm.value.description.trim(),
      comment: this.blogForm.value.comment,
      urlImage: this.blogForm.value.url
    }

    if(this.id !== 'new'){
      newPost.id = parseInt(this.id);
      this.store.dispatch(new UpdatePostBlogAction(newPost));
    }else{
      this.store.dispatch(new AddPostBlogAction(newPost))
      .subscribe(() => {
        this.imageVisible = false;
        this.blogForm.reset();
      });
    }
  }
}
