import { Injectable } from "@angular/core";
import {of, Observable } from "rxjs";
import { User } from "./types";
import { delay, map, filter } from "rxjs/operators";
import { users } from "./constants";

@Injectable({providedIn: "root"})
export class UserService {
    currentUser = {
        username: 'TiepPhan'
    };

    getUsers(query?: string): Observable<User[]> {
        return of(users).pipe( // chuyển array này thành 1 observable
            delay(2000), // delay này để nó mô phỏng fetch api
            map(data =>
                data.filter(u => {
                    if (!query) return true; // nếu ko có query thì trả về tất cả list users
                    return (
                        u.name.toLowerCase().startsWith(query.toLowerCase()) ||
                        u.username.toLowerCase().startsWith(query.toLowerCase()) ||
                        u.email.toLowerCase().startsWith(query.toLowerCase())
                    )
                })
            )
        )
    }
    constructor() {
        
    }
}