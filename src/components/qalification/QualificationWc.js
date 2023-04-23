import React, { useEffect, useState } from "react";
import DraggableDialog from "../dialog";
import {  FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SupportAgent } from "@mui/icons-material";

const initialQualification = ['Aucun(e)', 'Validé', 'A suivre', 'SAV', "Annulation", 'Faux numéro'];

const initialAnnuleQualification = ['Contrat en double', 'Forcing', 'Hors cible', 'Stop télémarketing', 'Déménagement', 'Iban frauduleux'];


const QualificationWc = () => {

  const [qualificationsWc , setQualificaionsWc] = useState({ 
    comment : "",
    qualification : '',
    AnnuleRaison : "",
  })

  const handleQualificationChange = (event) => {
    setQualificaionsWc({
      ...qualificationsWc,
      [event.target.name]: event.target.value
    });
  };

  const handleCommentChange = (event) => {
    setQualificaionsWc({
      ...qualificationsWc,
      comment: event.target.value,
    });
  };

  useEffect(() => {
    console.log("heyyy",qualificationsWc)
  },[qualificationsWc])

  const content =   
  <Stack spacing={2} width={400} mt={1}>
  <TextField
    fullWidth
     label="Commentaire"
    id="Commentaire"
     multiline
     onChange={handleCommentChange}
     value={qualificationsWc.comment}

    />
  <FormControl fullWidth >
<InputLabel id="demo-simple-select-label">Qualification</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Qualificaion"
    value={qualificationsWc.qualification}
    onChange={handleQualificationChange}
    name="qualification"
  >
    {initialQualification.map((option) => (
    <MenuItem value={option} key={option}>{option}</MenuItem>
    ))}
   
  </Select>
</FormControl>
<FormControl fullWidth >
<InputLabel id="demo-simple-select-label">Raison d'annulation</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Raison d'annulation"
    value={qualificationsWc.AnnuleRaison}
    onChange={handleQualificationChange}
    name="AnnuleRaison"
  >
    {initialAnnuleQualification.map((option) => (
    <MenuItem value={option} key={option}>{option}</MenuItem>
    ))}
   
  </Select>
</FormControl>
</Stack>
return (
    <DraggableDialog
    variant = 'contained'
    startIcon = ''
    chipIcon = {<SupportAgent />}
    buttonText = "welcome call"
    title="welcome call"
    text={content}
  />
)
}

export default QualificationWc

