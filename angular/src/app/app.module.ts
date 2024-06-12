import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { AppInterceptor } from './app.interceptor'

import { Profile } from './components/Profile.component'
import { Login } from './components/authen/Login.component'
import { Register } from './components/authen/Register.component'
import { Logout } from './components/authen/Logout.component'
import { ResetPassword } from './components/authen/ResetPassword.component'
import { ChangePassword } from './components/authen/ChangePassword.component'
import { UserAccountIndex } from './components/userAccount/Index.component'
import { UserAccountCreate } from './components/userAccount/Create.component'
import { UserAccountDetail } from './components/userAccount/Detail.component'
import { UserAccountEdit } from './components/userAccount/Edit.component'
import { UserAccountDelete } from './components/userAccount/Delete.component'
import { ProductIndex } from './components/product/Index.component'
import { ProductCreate } from './components/product/Create.component'
import { ProductDetail } from './components/product/Detail.component'
import { ProductEdit } from './components/product/Edit.component'
import { ProductDelete } from './components/product/Delete.component'
import { AccessoryIndex } from './components/accessory/Index.component'
import { AccessoryCreate } from './components/accessory/Create.component'
import { AccessoryDetail } from './components/accessory/Detail.component'
import { AccessoryEdit } from './components/accessory/Edit.component'
import { AccessoryDelete } from './components/accessory/Delete.component'
import { OrderHeaderIndex } from './components/orderHeader/Index.component'
import { OrderHeaderCreate } from './components/orderHeader/Create.component'
import { OrderHeaderDetail } from './components/orderHeader/Detail.component'
import { OrderHeaderEdit } from './components/orderHeader/Edit.component'
import { OrderHeaderDelete } from './components/orderHeader/Delete.component'
import { OrderDetailCreate } from './components/orderDetail/Create.component'
import { OrderDetailEdit } from './components/orderDetail/Edit.component'
import { OrderDetailDelete } from './components/orderDetail/Delete.component'
import { ExportProduct } from './components/product/Export.component'

@NgModule({
  declarations: [
    AppComponent,
    Profile,
    Login,
    Register,
    Logout,
    ResetPassword,
    ChangePassword,
    UserAccountIndex,
    UserAccountCreate,
    UserAccountDetail,
    UserAccountEdit,
    UserAccountDelete,
    ProductIndex,
    ProductCreate,
    ProductDetail,
    ProductEdit,
    ProductDelete,
    AccessoryIndex,
    AccessoryCreate,
    AccessoryDetail,
    AccessoryEdit,
    AccessoryDelete,
    OrderHeaderIndex,
    OrderHeaderCreate,
    OrderHeaderDetail,
    OrderHeaderEdit,
    OrderHeaderDelete,
    OrderDetailCreate,
    OrderDetailEdit,
    OrderDetailDelete,
    ExportProduct
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }