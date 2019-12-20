import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PostComponent} from './components/post/post.component';
import {CommentComponent} from './components/comment/comment.component';
import {FeedComponent} from './components/feed/feed.component';
import {ContactsComponent} from './components/contacts/contacts.component';


const routes: Routes = [
  {path: '', component: UsersComponent},
  {path: 'feed', component: FeedComponent},
  {path: 'posts/:id', component: PostComponent},
  {path: 'comment/:id', component: CommentComponent},
  {path: 'login', component: LoginComponent},
  {path: 'contacts', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
