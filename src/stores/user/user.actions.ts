export const UPDATE_USER = 'UPDATE_USER';

export interface User {
  username: string,
  company: string,
  emp_id: string,
  email:string,
    isLoggin : boolean
    image : string 
    

}

export interface UpdateUserAction {
    type: typeof UPDATE_USER,
    user: User
}

export type UserActions = UpdateUserAction;

export const updateUser = (user: User): UpdateUserAction => ({
  type: UPDATE_USER,
  user
});
