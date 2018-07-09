import React, { Component } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import PropTypes from 'prop-types';
export default class TextEditor extends Component {
    render() {
        return (
            <div>
                <ReactQuill modules={TextEditor.modules}
                value={this.props.content || ''}
                formats={TextEditor.formats}
                placeholder="Nhập nội dung"
                onChange={(event) => { this.props.updateContent(event) }} />
            </div>
        )
    }
}

TextEditor.modules = {
    toolbar: [
        [{ 'size': [false,'small', 'large', 'huge'] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'align': [] }],
        [{ 'list': 'ordered'}, { 'list': 'bullet'}],
        ['link'],
        ['clean'],
        ['code-block'],
        [{ 'color': [] }, { 'background': [] }]
    ]
};
TextEditor.formats = [
    'size', 'bold', 'italic', 'underline', 'strike', 'blockquote',
    'script', 'indent', 'direction', 'align', 'list', 'bullet',
    'link', 'clean', 'code-block', 'color', 'background'  
];
// TextEditor.propTypes = {
//     onChange: PropTypes.func.isRequired,
//     text: PropTypes.string
// }