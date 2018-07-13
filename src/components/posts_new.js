import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {createPost} from '../actions';

class PostsNew extends Component {

	

	renderField(field) {
		const { meta: {touched, error} } = field;
		const className  = `form-group ${touched && error ? 'has-danger' : ''}`;
		return (
			//field.meta.error tulee automaattisesti validatesta, täytyy olla sama kuin name property Fieldissä
			<div className={className}>
				<label>{field.label}</label>
				<input
					className="form-control"
					type="text"
					{...field.input}
				 />
				 <div className="text-help">
				{touched ? error : ''}	
				</div>
			</div>
		);
	}

	onSubmit(values){
		this.props.createPost(values, () => {
			this.props.history.push('/');
		});
	}

	render (){
		//eli tämä tulee siitä että kun alhaalla liitetään reduxForm PostNew componenttiin sille tulee uusia propseja kunten tässä handleSubmit
		//redux form hanskaa vain staten ja validoinnin, esim. POST on koodaajaan vastuulla.
		const { handleSubmit } =this.props;
		return (
			//this.onSubmit on meidän määriittelemä, pitää vain bindata koska callback

			// kaksi tapaa lisätä css sääntöjä: joko suoraan Link tai sitten syle.css
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<Field 
					label="Title"
					name="title"
					component={this.renderField}
				/>
				<Field 
					label="Categories"
					name="categories"
					component={this.renderField}
				/>
				<Field 
					label="Post Content"
					name="content"
					component={this.renderField}
				/>
				<button type="submit" className="btn btn-primary">Submit</button>

				<Link className="btn btn-danger" to="/">Cancel</Link>
			</form>
		);
	}

}

function validate(values) {
	const errors = {};

	// validate the inputs from 'values'
	if(!values.title || values.title.length < 3) {
		errors.title = "Enter a title that is at least 3 characters!";	
	}

	if(!values.categories) {
		errors.categories = "Enter some categories!";	
	}

	if(!values.content) {
		errors.content = "Enter some content!";	
	}


	// jos error tyhjä => ei virheitä, muuten virheitä
	return errors;
}

export default reduxForm({
	// validointi tulee redux formeista
	 validate,
	//tämä on formin nimi, jos olisi useita formeja sovelluksessa, uniikki nimi formille
	form: 'PostsNewForm'
})(
	connect(null, { createPost}) (PostsNew)
);