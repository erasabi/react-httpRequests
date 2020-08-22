import React, { Component } from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate() {
        if (this.props.id) {
            // PROBLEM:
            //  httpReq will repeat infinitely because setState change will cause rerender
            //  which will rerender componentDidUpdate which will rerender setState etc ...
            // SOLUTION: 
            // 1) add `this.state.loadedPost && this.state.loadedPost.id !== this.props.id` to stop infinite loop
                //  httpReq is run again then postId value will be the same as was previously set to loadedPost.id
                //  by checking if postId is the same as loadedPost.id we verify the httpReq is not being run again
            // 2) also add `!this.state.loadedPost || ` or else:
                // the httpReq will never run because loadedPost is null and will never meet other conditions
            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== this.props.id)) {
                axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
                    .then(response => {
                        this.setState({ loadedPost: response.data })
                    });
            }
        }
    }

    deletePostHandler = () => {
        // delete req will respond with empty response but show code '200' if successful
        axios.delete('https://jsonplaceholder.typicode.com/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) { 
            post = <p style={{ textAlign: 'center' }}>Loading...</p>;
        }
        if (this.state.loadedPost){
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.content}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler} >Delete</button>
                    </div>
                </div>
            );
        }
        return post;
    }
}

export default FullPost;