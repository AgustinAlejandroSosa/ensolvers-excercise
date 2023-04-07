import { Modal, TextField, Box, AppBar, Toolbar, Typography, Button, Grid } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { DEFAULT_URI, INITIAL_STATE } from '../../constants/Constants';
import { Note } from '../../models/Note';
import { COLORS } from '../../enums/Enums';

interface Props {
  archive: boolean,
  handleArchive: () => void,
  getNotes: () => void
}

export default function SubHeader({ archive, handleArchive, getNotes }: Props) {

  const [note, setNote] = React.useState<Note>(INITIAL_STATE);
  const [openModal, setOpenModal] = React.useState(false);

  const fillNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value })
  };

  const handleModal = () => {
    if(!openModal){
      setNote(INITIAL_STATE)
    }
    setOpenModal(!openModal);
  };

  const createNote = async (note: Note) => {
    if(note.title === ''){
      note.title = 'EMPTY'
    }
    if(note.description === ''){
      note.description = 'EMPTY'
    }
    await axios.post(DEFAULT_URI + "notes", note)
      .then(res => {
        getNotes();
        setNote(INITIAL_STATE)
      })
      .catch(error => {
        console.error(error);
      })
    handleModal();
  }

  const styles = useStyles();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={styles.appbar} position="static">
          <Toolbar>
            <img alt='ensolver_logo' src='https://www.ensolvers.com/wp-content/uploads/2022/04/Logo_Ensolvers_265px_sin_frase.png'>
            </img>
            <Button sx={styles.loginButton} color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container>
        <Grid sx={styles.gridItem} xs={12} sm={5} item>
          <Typography sx={styles.myNotes} align='center'>
            {archive ? 'Archived Notes' : 'My Notes'}
          </Typography>
        </Grid>
        <Grid sx={styles.gridItem} xs={6} sm={3.5} item>
          <Button sx={styles.subHeaderButton} onClick={handleModal} size='small' variant='contained'>
            Create note
          </Button>
        </Grid>
        <Grid sx={styles.gridItem} xs={6} sm={3.5} item>
          <Button sx={styles.subHeaderButton} onClick={handleArchive} size='small' variant='contained'>
            Go to archive
          </Button>
        </Grid>
      </Grid>

      <Modal sx={styles.modalContainer} open={openModal} onClose={handleModal}>
        <Box component="form" sx={styles.modal}>

          <Typography margin={1} padding={1} align='center' fontSize={25} fontWeight={'bold'}>New note</Typography>

          <TextField name='title' value={note.title} onChange={fillNote} sx={styles.textField} label="Title" />

          <TextField name='description' value={note.description} onChange={fillNote} sx={styles.textField} label="Description" />

          <Typography align='center' padding={1} margin={1}>

            <Button onClick={() => createNote(note)} sx={styles.modalCreateButton} variant="contained">
              Create
            </Button>
            <Button sx={styles.modalCancelButton} variant="contained" onClick={handleModal}>
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
    </>
  )
}

const useStyles = () => {
  return {
    subHeaderButton:{
      fontWeight:'bold',
      backgroundColor:COLORS.YELLOW,
      color:COLORS.BLACK,
      '&:hover': {
        backgroundColor: COLORS.BROWN,
        color: COLORS.WHITE
      }
    },
    loginButton: {
      color:COLORS.BLACK,
      fontWeight:'bold',
      marginLeft: 'auto',
      '&:hover': {
        backgroundColor: COLORS.BROWN,
        color: COLORS.WHITE
      }
    },
    appbar: {
      backgroundColor: COLORS.DARK_YELLOW
    },
    gridItem: {
      display: 'flex',
      flexDirection: 'column',
      padding: '2%'
    },
    myNotes: {
      fontWeight: 'bold',
      fontSize: '1.5rem'
    },
    modalContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modal: {
      backgroundColor: COLORS.WHITE,
      border: '2px solid',
      padding: "16px 32px 24px",
    },
    modalCreateButton: {  
      fontWeight:'bold',
      margin: 1,
      backgroundColor: COLORS.DARK_YELLOW,
      color: COLORS.WHITE,
      '&:hover': {
        backgroundColor: COLORS.YELLOW,
        color: COLORS.BLACK
      }
    },
    modalCancelButton: {
      fontWeight:'bold',
      margin: 1,
      backgroundColor: COLORS.ORANGE,
      color: COLORS.BLACK,
      '&:hover': {
        backgroundColor: COLORS.BROWN,
        color: COLORS.WHITE
      }
    },
    textField: {
      width: '100%',
      marginTop: 1,
      marginBot: 1,
    }
  }
}
