import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';


class PostsShow extends Component {

	componentDidMount(){
		//id tulee wild cardista index.js routessa oli :id
		//ei haetat turhaa jos jo on 
		if(!this.props.post){
			const {id} = this.props.match.params;
			this.props.fetchPost(id);
		}
	}

	onDeleteClick(){
		const {id} = this.props.match.params;
		this.props.deletePost(id, () => {
			this.props.history.push('/');
		});
	}

	render(){

		const { post } = this.props;

		if(!post){
			return <div>Loading...</div>;
		}
		return (
			<div>
				<Link to="/">Back to index</Link>
				<button
				 className="btn btn-danger pull-xs-right"
				 onClick={this.onDeleteClick.bind(this)}
				>
				Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>Categories: {post.categories}</h6>
				<p>{post.content}</p>
			</div>
		);
	}
}

//eli kiinnostaa vain posts property statesta.
// toinen argumentti aina ownProps
function mapStateToProps({posts}, ownProps) {
	// eli ei näin, palauttaisi koko listan posts => ownProps auttaa
	//return { posts };
	// eli mapStateToProps voisi olla omassa filussa jossain isossa aplikaatiosas, eli nyt vain se aktiivinen tulee componentille.
	return {post: posts[ownProps.match.params.id]};

}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);