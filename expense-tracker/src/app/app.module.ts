import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//import { AppComponent } from './app.component';
import { HomeListComponent } from './home-list/home-list.component';
import { from } from 'rxjs';
import { AboutComponent } from './about/about.component';
// import { HomepageComponent } from './homepage/homepage.component';
// import { HeaderComponent } from './header/header.component';
import { FrameworkComponent } from './framework/framework.component';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { CreateComponent } from './create/create.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { FormsModule } from '@angular/forms';
import { CategoryDetailsPageComponent } from './category-details-page/category-details-page.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryComponent } from './category/category.component';

@NgModule({
  declarations: [
    //AppComponent,
    HomeListComponent,
    AboutComponent,
    // HomepageComponent,
    // HeaderComponent,
    FrameworkComponent,
    //CreateComponent,
    DetailsPageComponent,
    CategoryDetailsPageComponent,
    CategoryListComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([{
      path: '',
      component: HomeListComponent
    },
    {
      path: 'category',
      component: CategoryComponent
    },
    {
      path: 'about',
      component: AboutComponent
    },
      // {
      //   path: 'create',
      //   component: CreateComponent
      // },
      // {
      //   path: 'coffees/:coffeeid',
      //   component: DetailsPageComponent
      // }
    ])
  ],
  //providers: [],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  bootstrap: [FrameworkComponent],

})
export class AppModule { }
