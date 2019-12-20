import { LikesService } from './services/real/likes.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatGridListModule, MatMenuModule
} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
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
import { MatCheckboxModule } from '@angular/material/checkbox';
//import { CookieService} from 'ngx-cookie-service';
import { LoginComponent } from './components/login/login.component';
import { LikesRepository } from './services/likes.repository';
import { DragDropModule} from '@angular/cdk/drag-drop';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import { ContactsComponent } from './components/contacts/contacts.component';
@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    FeedComponent,
    CommentComponent,
    UsersComponent,
    LoginComponent,
    ContactsComponent
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
    MatSnackBarModule,
    MatDividerModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatGridListModule,
    DragDropModule,
    MatMenuModule
  ],
  providers: [
    {provide: PostRepository, useFactory: (http: HttpClient) => new PostService(http), deps: [HttpClient]},
    {provide: LikesRepository, useFactory: (http: HttpClient) => new LikesService(http), deps: [HttpClient]},
    {provide: UsersRepository, useFactory: (http: HttpClient) => new UsersService(http), deps: [HttpClient]},
    {provide: CommentRepository, useFactory: (http: HttpClient) => new CommentService(http), deps: [HttpClient]},
   // {provide: CookieService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
