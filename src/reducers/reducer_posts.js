import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function(state = {}, action) {
	switch (action.type){
		case DELETE_POST:
		return _.omit(state, action.payload);
		case FETCH_POST:
		//eli { ...dtate} tarkoittaa että pidä statessa kaikki aiemmat postaukset, mutta jos esim navigoi suoraan tähän niin pitää lisätä stateen.
		// data mitä saadaan

		//ES 5
		//const post = action.payload.data;
		// const newState = { ...state };
		// newState[post.id] = post;
		// return newState;

		//[action.payload.data.id] <= ei luoda uutta arrayta vaan key tulkintaa
		return {...state, [action.payload.data.id]: action.payload.data};
		case FETCH_POSTS:
		return _.mapKeys(action.payload.data, 'id');
		default:
		return state;
	}
}