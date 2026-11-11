import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SignUpPayload } from '../models/auth.interface';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signUp(payload: SignUpPayload): Observable<any> {
    return this.http.post('/api/signup', payload);
  }
}