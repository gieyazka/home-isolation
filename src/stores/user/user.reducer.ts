import image from 'components/image';
import { User, UserActions, UPDATE_USER } from './user.actions';

type UserState = User;

const initialState: UserState = {
  
  username : "",
  company: "",
  emp_id : "",
  email : "",
  isLoggin : false,
  image : ""

};

export default (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action.type) {
  case UPDATE_USER: {
    const {
      user: {
        username,company,emp_id,isLoggin,email,image
  
      }
    } = action;

    return {
      username,company,emp_id,email,isLoggin,image
    
    };
  }

  default:
    
    return state;
  }
};
