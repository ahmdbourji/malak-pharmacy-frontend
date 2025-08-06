import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service'; // صحح المسار هنا

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let mockAuthService: jasmine.SpyObj<AuthService>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockAuthService = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    });

    guard = new AuthGuard(
      TestBed.inject(AuthService),
      TestBed.inject(Router)
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate()).toBeTrue();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should block activation when not logged in', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    expect(guard.canActivate()).toBeFalse();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
  });
});
