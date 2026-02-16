import {Injectable, signal} from '@angular/core';

import {User} from '../../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    currentUser = signal<User | null>(null);

    setUser(user: User){
        this.currentUser.set(user);
    }

    logout(){
        this.currentUser.set(null);
        localStorage.removeItem('user');
    }

    isLoggedIn(){
        return this.currentUser()?.userId !== null;
    }
}