import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { HomeGuard } from './core/guards/home.guard';
import { RoleGuard } from './core/guards/role.guard';
import { UserResolver } from './core/resolvers/user.resolver';
import { Role } from './core/models/auth';
import { TabsComponent } from './tabs/tabs.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'signup-welcome',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule),
    canActivate: [HomeGuard],
  },
  {
    path: 'logout',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: '', component: TabsComponent,
    resolve: {user: UserResolver},
    children: [
      {
        path: 'exam-form',
        loadChildren: () => import('./exam-form/exam-form.module').then(m => m.ExamFormPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Teacher]
        }
      },
      {
        path: 'exam-play',
        loadChildren: () => import('./exam-play/exam-play.module').then( m => m.ExamPlayPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Student]
        }
      },
      {
        path: 'exam-review',
        loadChildren: () => import('./exam-play/exam-play.module').then( m => m.ExamPlayPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Teacher, Role.Student],
          review: true
        }
      },
      {
        path: 'exam-infiniquiz',
        loadChildren: () => import('./exam-infiniquiz/exam-infiniquiz.module').then( m => m.ExamInfiniquizPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Student]
        }
      },
      {
        path: 'exams',
        loadChildren: () => import('./exams/exams.module').then(m => m.ExamsPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Teacher]
        }
      },
      {
        path: 'assignments',
        loadChildren: () => import('./assignments/assignments.module').then(m => m.AssignmentsPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Student]
        }
      },
      {
        path: 'completed',
        loadChildren: () => import('./completed-assignments/completed-assignments.module').then(m => m.CompletedAssignmentsPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Student]
        }
      },
      {
        path: 'students',
        loadChildren: () => import('./students/students.module').then( m => m.StudentsPageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Teacher]
        }
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
        canActivate: [AuthGuard, RoleGuard],
        data: {
          role: [Role.Student]
        }
      }
    ]
  },
  {
    path: 'completed-assignments',
    loadChildren: () => import('./completed-assignments/completed-assignments.module').then( m => m.CompletedAssignmentsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
