import React, { Component } from 'react';
import Note from './Note/Note'; 
import NoteForm from './NoteForm/NoteForm'; 
import {DB_CONFIG} from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

//setup the React state of our component 
constructor(props){
  super(props); 
  this.app = firebase.initializeApp(DB_CONFIG);
  this.db = this.app.database().ref().child('notes');
  this.state = {
    notes: [], 
  }
  this.addNote = this.addNote.bind(this);
  this.removeNote = this.removeNote.bind(this);
}

componentWillMount(){
  const previousNotes = this.state.notes; 

//Adding an item to the Firebase DB
//DataSnapshot
  this.db.on('child_added', snap => {
    previousNotes.push({
      id: snap.key,
      noteContent: snap.val().noteContent,
    })
    //updating setState with the new array we just pushed
    this.setState({notes : previousNotes})
  })

this.db.on('child_removed', snap => {
  for (var i=0; i<previousNotes.length; i++){
    if(previousNotes[i].id === snap.key) {
  previousNotes.splice(i,1); 
}}
    this.setState({notes : previousNotes})
  })
}

addNote(note){
  //push the note into the notes array
this.db.push().set({noteContent:note});
}

removeNote(id){
  this.db.child(id).remove();
}

  render() {
    return (
      <div className='notesWrapper'>
        <div className = 'notesHeader'>
          <div className="heading">Take note
          </div>
        </div>   
        <div className='notesBody'>
        {
          this.state.notes.map( (note) => {
            return (
              <Note noteContent={note.noteContent} 
                noteId={note.id} 
                key={note.id} 
                removeNote={this.removeNote}/>
                  )
              })
            }
        </div>
        <div className='notesFooter' >
        <NoteForm addNote={this.addNote}/>
        </div>
      </div>
    );
  }
}

export default App;
