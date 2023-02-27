import React, { useReducer, createContext } from 'react';

const notesReducer = (state, action) => {
    
    let notesList = [... state.notesList];
    
    switch (action.type) {
      case 'add':
        let newNote = {... action.payload, id: state.nextId}
        notesList.push(newNote);
        return ({ ...state, notesList: notesList, nextId: state.nextId + 1 });
      case 'del':
        let id = action.payload
        notesList = notesList.filter(note => note.id != id);
        return ({ ...state, notesList: notesList, nextId: state.nextId });
      case 'upd':
        let noteToUpdate = action.payload
        notesList.forEach( (obj, index, objs) => {
            if(noteToUpdate.id === obj.id){
              objs[index] =  noteToUpdate;
            }   
        });
        return ({ ...state, notesList: notesList, nextId: state.nextId });
      default:
        return ({ ...state });
    }
  };
  
  const NotesContext = createContext();
  
  const NotesProvider = ({ children }) => {
    const add = (newNote) => {
      dispatch({ type: 'add', payload: newNote});
    }

    const upd = (noteToUpdate) => {
        dispatch({ type: 'upd', payload: noteToUpdate});
    }
    const del = (note_id) => {
        dispatch({ type: 'del', payload: note_id});
    }

    const [state, dispatch] = useReducer(notesReducer, { nextId: 0, notesList: []});
  
    return (
      <NotesContext.Provider value={{ state, add, upd, del}}>
        {children}
      </NotesContext.Provider>
    )
  }
  
  export { NotesContext, NotesProvider };
  