import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
  })
export class LocalSorageService {
  getItem<T>(key: string): T | null {
    let item: any = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item);
      } catch {
        return item;
      }
    } else {
      return null;
    }
  }
  setItem<T>(key: string, object: T) {
    localStorage.setItem(key, JSON.stringify(object));
  }

  clear() {
    localStorage.clear();
  }

  public saveToken(token: string): void {

    this.setItem('app_token', token);
  }

  public getToken(): string | null {
    return (
      this.getItem('app_token')
    );
  }

  public saveUserName(userName: string): void {

    this.setItem('user_name', userName);
  }

  public getUserName(): string | null {
    return (
      this.getItem('user_name')
    );
  }
}
