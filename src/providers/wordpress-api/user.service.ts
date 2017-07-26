/**
 * This has combination codes of Wordpress API, Firebase SDK, Kakao, Naver, and other 
 */
import { Injectable } from '@angular/core';
import { Base } from '../../etc/base';
import { ERROR, KEY_LOGIN } from '../../etc/define';
import { WordpressApiService } from './wordpress-api.service';
import { Observable } from 'rxjs/Observable';

import {
    SOCIAL_PROFILE, USER_REGISTER, USER_REGISTER_RESPONSE, USER_LOGIN, USER_LOGIN_RESPONSE,
    USER_UPDATE, USER_UPDATE_RESPONSE, USER_DATA_RESPONSE, USER_DATA
} from './interface';

@Injectable()
export class UserService extends Base {

    profile: USER_LOGIN_RESPONSE = null;

    constructor(
        private wp: WordpressApiService
    ) {
        super();
        this.loadProfile();
    }


    /**
     * @note flowchart
     *      - All social login must check if their accounts are already created.
     *          -- If so, just login.
     *          -- If no, create one ( with secret key )
     * 
     * @param profile User profile coming from the social login.
     */
    socialLoginSuccess(profile: SOCIAL_PROFILE, callback) {

        let uid = `${profile.uid}@${profile.providerId}`;
        let password = `${profile.uid}--@~'!--`;

        /// @todo improve login security.
        this.login(uid, password).subscribe(res => {

        }, error => {
            if (!profile.email) profile.email = uid + '.com'; // if email is not given.
            let data: USER_REGISTER = {
                user_login: uid,
                user_pass: password,
                user_email: profile.email,
                name: profile.name || ''
            };
            this.register(data).subscribe(res => {
                console.log("socialLoginSuccess: ", res);
            }, error => {
            });
        });
    }

    get isLogin(): boolean {
        /// one time data load from localStorage
        if (this.profile === null) this.loadProfile();
        if (this.profile.user_login) return true;
        return false;

    }


    /**
     * 
     * @Warning This will load user profile from localStorage.
     * @Warning So, this must be case on every bootstrap.
     * @Attention This is being called in UserService::constructor which will be called by AppService::constructor.
     *          Meaning, if you inject AppService on every module, user profile will be loaded automatically.
     */
    loadProfile() {
        let re = this.storage.get(KEY_LOGIN);
        if (re === null) this.profile = <USER_LOGIN_RESPONSE>{};
        else this.profile = re;
        return this.profile;
    }


    login(user_login: string, user_pass: string): Observable<USER_REGISTER_RESPONSE> {
        let data: USER_LOGIN = {
            user_login: user_login,
            user_pass: user_pass,
            route: 'user.login'
        };
        return this.wp.post(data)
            .map(res => this.setUserProfile(res));
    }

    logout() {
        this.setUserProfile(null);
    }

    register(data: USER_REGISTER): Observable<USER_REGISTER_RESPONSE> {
        data.route = 'user.register';
        return this.wp.post(data)
            .map(res => this.setUserProfile(res));
    }

    update(data: USER_UPDATE): Observable<USER_UPDATE_RESPONSE> {
        data.session_id = this.profile.session_id;
        data.route = 'user.profile';
        return this.wp.post(data)
            .map(res => this.setUserProfile(res));
    }

    data(): Observable<USER_DATA_RESPONSE> {
        let data: USER_DATA = {
            route: 'user.data',
            session_id: this.profile.session_id
        };
        return this.wp.post(data);
    }

    setUserProfile(res) {
        this.profile = res;
        this.storage.set(KEY_LOGIN, res);
        return res;
    }

    /**
     * User login sucessfully.
     * @note this includes all kinds of social login and wordpress api login.
     * @note This method is being invoked for alll kinds of login.
     */
    loginSuccess(successCallback, errorCallback) {

        successCallback();
    }


    get sessionId(): string {
        if (this.profile && this.profile.session_id) return this.profile.session_id;
        else return '';
    }

    get name(): string {
        if (this.profile && this.profile.user_nicename) return this.profile.user_nicename;
        else return '';
    }
}