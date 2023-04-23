import React, { useEffect, useState } from "react";
import DraggableDialog from "../dialog";
import {  FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { SupervisorAccount } from "@mui/icons-material";

const initialQualification = ['Aucun(e)', 'validé', 'annulation', 'A relancer'];


const QualificationSav = () => {

  const [qualificationsSav , setQualificaionsSav] = useState({ 
    comment : "",
    qualification : '',
  })


  const handleQualificationChange = (event) => {
    setQualificaionsSav({
      ...qualificationsSav,
      qualification: event.target.value,
    });

  };

  const handleCommentChange = (event) => {
    setQualificaionsSav({
      ...qualificationsSav,
      comment: event.target.value,
    });
  };

  useEffect(() => {
      
    console.log(qualificationsSav)
  }, [qualificationsSav]);

  const content =   
  <Stack spacing={2} width={400} mt={1}>
   <TextField
    fullWidth
     label="Commentaire"
    id="Commentaire"
     multiline
     onChange={handleCommentChange}
     value={qualificationsSav.comment}

    />
  <FormControl fullWidth >
<InputLabel id="demo-simple-select-label">Qualificaion</InputLabel>
<Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Qualificaion"
    value={qualificationsSav.qualification}
    onChange={handleQualificationChange}
    name="qualification"
  >
    {initialQualification.map((option) => (
    <MenuItem value={option} key={option}>{option}</MenuItem>
    ))}
   
  </Select>
</FormControl>

</Stack>
return (
    <DraggableDialog
    variant = 'contained'
    startIcon = ''
    chipIcon = {<SupervisorAccount />}
    buttonText = "SAV"
    title="SAV"
    text={content}
  />
)
}

export default QualificationSav

