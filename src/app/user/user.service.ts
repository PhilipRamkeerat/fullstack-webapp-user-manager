import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import User from './user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:4000/products';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'Application/json' })
  };

  constructor(private http: HttpClient) { }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl).pipe(
      tap(_ => console.log('Fetched products')),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  // Get user by id
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/edit/${id}`;

    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`Fetched product id = ${id}`)),
      catchError(this.handleError<User>(`error on getUser id=${id}`))
    );
  }

  // Search user
  searchUser(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]); // Return empty product array
    }
    return this.http.get<User[]>(`${this.userUrl}/search/${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}" `)),
      catchError(this.handleError<User[]>('error searchProducts', []))
    );
  }

  // Register user
  addUser(product: User): Observable<User> {
    const url = `${this.userUrl}/add`;

    return this.http.post<User>(url, product, this.httpOptions).pipe(
      tap((newProduct: User) => this.log(`user successfully added`)),
      catchError(this.handleError<User>(`Error on addUser`))
    );
  }

  // Update User
  updateUser(user: User, id: any): Observable<any> {
    const url = `${this.userUrl}/update/${id}`;

    return this.http.put(url, user).pipe(
      tap(_ => this.log(`updated user id ${id}`)),
      catchError(this.handleError<any>('error updateUser'))
    );
  }

  // Delete User
  deleteUser(id: any): Observable<User> {
    const url = `${this.userUrl}/delete/${id}`;

    console.log('url do deleteUser', url);
    return this.http.delete<User>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted product id = ${id}`)),
      catchError(this.handleError<any>('error on deleteUser'))
    );
  }

  // Edit User
  editUser(id) {
    return this
      .http
      .get(`${this.userUrl}/edit/${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log product */
  private log(message: string) {
    console.log(message);
  }
}
