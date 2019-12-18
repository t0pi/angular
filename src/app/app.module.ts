import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSnackBarModule, MatToolbarModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import { PostComponent } from './components/post/post.component';
import { FeedComponent } from './components/feed/feed.component';
import {PostRepository} from './services/post.repository';
import {PostService} from './services/real/post.service';
import { CommentComponent } from './components/comment/comment.component';
import { CommentService } from './services/real/comment.service';
import {UsersService} from './services/real/users.service';
import {UsersRepository} from './services/users.repository';
import { UsersComponent } from './components/users/users.component';
import { CommentRepository } from './services/comment.repository';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    PostComponent,
    FeedComponent,
    CommentComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: PostRepository, useFactory: (http: HttpClient) => new PostService(http), deps: [HttpClient]},
    {provide: UsersRepository, useFactory: (http: HttpClient) => new UsersService(http), deps: [HttpClient]},
    {provide: CommentRepository, useFactory: (http: HttpClient) => new CommentService(http), deps: [HttpClient]}

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
