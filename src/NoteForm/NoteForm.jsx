import React, {Component} from 'react';
import './NoteForm.css';

class NoteForm extends Component {
    constructor(props){
        super(props); 
        this.state = {
            newNoteContent: "",
        };
        // 'this' will be undefined unless we explicitly bind it to handleUserInput
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeNote = this.writeNote.bind(this);
    }
    //when user input changes, set state of newNoteContent to the text input value
    handleUserInput(e){
        this.setState({
            newNoteContent: e.target.value, // the value of the text input  
            })
        }
    //this method sets newNoteContent to the value of the input
    writeNote(){
        this.props.addNote(this.state.newNoteContent);
        this.setState({
            newNoteContent:"", //set newNoteContent to empty string
        })
    }

    render(){
        return(
            <div className='formWrapper'>
                <input className='noteInput' placeholder='Write a new note...' value={this.state.newNoteContent} onChange={this.handleUserInput}/>
                <button className='noteButton' 
                onClick={this.writeNote}>Add Note</button>
            </div>
            );
    }
}
export default NoteForm; 