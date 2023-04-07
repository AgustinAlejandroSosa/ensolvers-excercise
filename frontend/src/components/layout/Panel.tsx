import React, { useState, useEffect } from 'react'
import { Note } from '../../models/Note';
import axios from 'axios';
import { DEFAULT_URI } from '../../constants/Constants';
import { Grid } from '@mui/material';
import NoteComponent from '../notes/NoteComponent';
import SubHeader from './SubHeader';
import EmptyPanel from './EmptyPanel';

export default function Panel() {
  const styles = useStyles();
  const [notes, setNotes] = useState<Note[]>([]);
  const [archive, setArchive] = useState<boolean>(false);

  const handleArchive = () => {
    setArchive(!archive);
  }

  const getNotes = async () => {
    await axios.get(DEFAULT_URI + "notes")
      .then(res => {
        setNotes(res.data);
      })
      .catch(error => {
        console.error(error);
      })
  }

  useEffect(() => {
    getNotes()
  }, [])
  

  return (
    <>
    <SubHeader archive={archive} handleArchive={handleArchive} getNotes={getNotes}/>
      <Grid sx={styles.gridContainer} container>
        {archive
          ?
          notes.map(note => (
            note.archived ? (
              <Grid key={note.id} xs={12} sm={6} md={4} lg={3} item>
                <NoteComponent getNotes={getNotes} note={note} archive={archive} />
              </Grid>
            ) : (
              null
            )
          ))
          :
          notes.map(note => (

            !note.archived ? (
              <Grid key={note.id} xs={12} sm={6} md={4} lg={3} item>
                <NoteComponent getNotes={getNotes} note={note} archive={archive} />
              </Grid>
            ) : (
              null
            )
          ))
        }
        {!notes.length && <EmptyPanel/>}
      </Grid>
    </>
  )
}

const useStyles = () => {
  return {
    gridContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center'
    }
  }
}
