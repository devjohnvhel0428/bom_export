import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { Login } from './components/authen/Login.component'
import { Register } from './components/authen/Register.component'
import { Logout } from './components/authen/Logout.component'
import { ResetPassword } from './components/authen/ResetPassword.component'
import { ChangePassword } from './components/authen/ChangePassword.component'
import { Profile } from './components/Profile.component'
import { Home } from './components/Home.component'
import { NotFound } from './components/NotFound.component'
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
import { ExportProduct } from './components/product/Export.component'
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

import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  { path: '', component: ProductIndex },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'logout', component: Logout },
  { path: 'resetPassword', component: ResetPassword },
  { path: 'changePassword/:token', component: ChangePassword },
  { path: 'home', component: Home },
  { path: 'profile', component: Profile },
  { path: 'userAccount', component: UserAccountIndex },
  { path: 'userAccount/create', component: UserAccountCreate },
  { path: 'userAccount/:id', component: UserAccountDetail },
  { path: 'userAccount/edit/:id', component: UserAccountEdit },
  { path: 'userAccount/delete/:id', component: UserAccountDelete },
  { path: 'product', component: ProductIndex },
  { path: 'product/create', component: ProductCreate },
  { path: 'product/:id', component: ProductDetail },
  { path: 'product/edit/:id', component: ProductEdit },
  { path: 'export', component: ExportProduct },
  { path: 'product/delete/:id', component: ProductDelete },
  { path: 'accessory', component: AccessoryIndex },
  { path: 'accessory/create', component: AccessoryCreate },
  { path: 'accessory/:id', component: AccessoryDetail },
  { path: 'accessory/edit/:id', component: AccessoryEdit },
  { path: 'accessory/delete/:id', component: AccessoryDelete },
  { path: 'bomHeader', component: OrderHeaderIndex },
  { path: 'bomHeader/create', component: OrderHeaderCreate },
  { path: 'bomHeader/:id', component: OrderHeaderDetail },
  { path: 'bomHeader/edit/:id', component: OrderHeaderEdit },
  { path: 'bomHeader/delete/:id', component: OrderHeaderDelete },
  { path: 'bomDetail/create', component: OrderDetailCreate },
  { path: 'bomDetail/edit/:id', component: OrderDetailEdit },
  { path: 'bomDetail/delete/:id', component: OrderDetailDelete },
  { path: '**', component: NotFound }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }