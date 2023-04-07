import { Box, Button, CardContent, Modal, TextField, Typography } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import React from 'react'
import { Note } from '../../models/Note';
import { COLORS } from '../../enums/Enums';
import axios from 'axios';
import { DEFAULT_URI } from '../../constants/Constants';

interface Props {
  archive: boolean,
  note: Note,
  getNotes: () => void
}

export default function NoteComponent({ getNotes, note, archive }: Props) {
  const styles = useStyles();
  const [noteEdited, setNoteEdited] = React.useState<Note>(note)
  const [openEditModal, setOpenEditModal] = React.useState(false);

  const fillEditNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNoteEdited({ ...noteEdited, [name]: value })
  };

  const handleEditModal = () => {
    setOpenEditModal(!openEditModal);
    console.log('hi');
  };

  const editNote = async (note: Note) => {
    if(note.title === ''){
      note.title = 'EMPTY'
    }
    if(note.description === ''){
      note.description = 'EMPTY'
    }
    await axios.put(DEFAULT_URI + "notes/edit/" + note.id, note)
      .then(res => {
        getNotes();
        if (openEditModal) {
          handleEditModal();
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  const deleteNote = async (id: number | undefined) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      await axios.delete(DEFAULT_URI + "notes/delete/" + id)
        .then(res => {
          getNotes();
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  const archiveNote = async (note: Note) => {
    await axios.get(DEFAULT_URI + "notes/" + note.id)
      .then(res => {
        let archivedNote: Note = res.data;
        archivedNote.archived = !archivedNote.archived;
        editNote(archivedNote);
      })
      .catch(error => {
        console.error(error)
      })
  }

  return (
    <>
      <CardContent sx={styles.cardContainer}>
        <Typography variant="h5" component="div">
          {note.title}
        </Typography>
        <Typography variant="body1">
          {note.description}
        </Typography>
        <Box sx={styles.iconsContainer}>
          <Button onClick={handleEditModal} sx={styles.editIcon}>
            <EditNoteIcon />
          </Button>
          <Button onClick={() => archiveNote(note)} sx={styles.archiveIcon}>
            {archive ? <UnarchiveIcon /> : <ArchiveIcon />}
          </Button>
          <Button onClick={() => deleteNote(note.id)} sx={styles.deleteIcon}>
            <DeleteIcon />
          </Button>
        </Box>
      </CardContent>


      <Modal sx={styles.modalContainer} open={openEditModal} onClose={handleEditModal}>
        <Box sx={styles.modal}>
          <Typography margin={1} padding={1} align='center' fontSize={25} fontWeight={'bold'}>Edit note</Typography>

          <TextField name='title' value={noteEdited.title} onChange={fillEditNote} sx={styles.textField} label="Title" />

          <TextField name='description' value={noteEdited.description} onChange={fillEditNote} sx={styles.textField} label="Description" />

          <Typography align='center' padding={1} margin={1}>

            <Button onClick={() => editNote(noteEdited)} sx={styles.modalCreateButton} variant="contained">
              Edit
            </Button>
            <Button sx={styles.modalCancelButton} variant="contained" onClick={handleEditModal}>
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
    cardContainer: {
      backgroundColor: COLORS.WHITE,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '2px 2px 2px 1px rgba(0, 0, 0, 0.2)',
      margin: '1.5%'
    },
    iconsContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: '1%'
    },
    editIcon: {
      color: COLORS.DARK_YELLOW,
      margin: '1%'
    },
    deleteIcon: {
      color: 'red',
      margin: '1%'
    },
    archiveIcon: {
      color: 'green',
      margin: '1%'
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
      fontWeight: 'bold',
      margin: 1,
      backgroundColor: COLORS.DARK_YELLOW,
      color: COLORS.WHITE,
      '&:hover': {
        backgroundColor: COLORS.YELLOW,
        color: COLORS.BLACK
      }
    },
    modalCancelButton: {
      fontWeight: 'bold',
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