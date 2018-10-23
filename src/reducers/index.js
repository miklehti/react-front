import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'
import PostsReducer from './reducer_posts'

const rootReducer = combineReducers({
 posts: PostsReducer,
 // eli ei itse tartte tehdä actioneita tms lomakkeelle kun on vaan hookattu reducer.
 form: formReducer
});

export default rootReducer;
