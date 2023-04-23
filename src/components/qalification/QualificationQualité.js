import React, { useEffect, useState } from "react";
import DraggableDialog from "../dialog";
import { Android12Switch } from "../../style/switch";
import {  FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { Headphones } from "@mui/icons-material";

const initialQualification = [ "Aucun(e)",'conforme', 'non conforme', 'annulation', 'SAV'];

const QualificationQualité = () => {

    const [qualificationsQté , setQualificaionsQté] = useState({
      switchState : {
        Appel_enregistré: false,
        _14j_de_rétractation: false,
        Autorisation_accès_GRD: false,
        Inscription_Bloctel: false,
        Valider_les_coordonnées_du_client: false,
        Expliquer_que_nous_sommes_KOMPAR: false,
        Explication_changement_de_fournisseur: false,
        Discours_frauduleux_mensenger: false,
        MES_non_conforme: false,
        non_conformité_signature_recap: false,
        Validation_à_la_place_du_prospect: false,
        Comportement_général: false,
        Mineur_trop_âgée_non_lucide: false,
        IBAN_invalide: false,
      },
      comment : "",
      qualification : '',
    })
    const handleChange = (event) => {
       setQualificaionsQté({
        ...qualificationsQté,
        switchState: {
          ...qualificationsQté.switchState,
         [event.target.name]: event.target.checked,
       }
       });
      console.log({[event.target.name]: event.target.checked})
    }

    const handleQualificationChange = (event) => {
      setQualificaionsQté({
        ...qualificationsQté,
        qualification: event.target.value,
      });
  
    };
    const handleCommentChange = (event) => {
      setQualificaionsQté({
        ...qualificationsQté,
        comment: event.target.value,
      });
    };

    useEffect(() => {
      
      console.log(qualificationsQté)
    }, [qualificationsQté]);

    const content =  
    <Grid container spacing={2} sx={{mt:1}} >
            <FormControl></FormControl>

    <Grid xs={6}>
        <Paper elevation={3} sx={{p:1}}>
    <Typography
    variant="subtitle1"
    gutterBottom
    sx={{ fontWeight: 600 }}
    >
    A respecter impérativement
    </Typography>
    <Stack>
    <FormControlLabel
    control={<Android12Switch  color="success"  checked={qualificationsQté.switchState.Appel_enregistré} name="Appel_enregistré"     onChange={handleChange}
    />}
    label="Appel enregistré"

  />
    <FormControlLabel
    control={<Android12Switch color="success" checked={qualificationsQté.switchState._14j_de_rétractation} name="_14j_de_rétractation"     onChange={handleChange}/>}
    label="14j de rétractation"
  />
    <FormControlLabel
    control={<Android12Switch  color="success" checked={qualificationsQté.switchState.Autorisation_accès_GRD} name="Autorisation_accès_GRD"     onChange={handleChange}/>}
    label="Autorisation accès GRD"
  />
    <FormControlLabel
    control={<Android12Switch  color="success" checked={qualificationsQté.switchState.Inscription_Bloctel} name="Inscription_Bloctel"     onChange={handleChange}/>}
    label="Inscription Bloctel"
  />
    <FormControlLabel   
    control={<Android12Switch  color="success" checked={qualificationsQté.switchState.Valider_les_coordonnées_du_client} name="Valider_les_coordonnées_du_client"     onChange={handleChange}/>}
    label="Valider les coordonnées du client"
  />
    <FormControlLabel
    control={<Android12Switch  color="success" checked={qualificationsQté.switchState.Expliquer_que_nous_sommes_KOMPAR} name="Expliquer_que_nous_sommes_KOMPAR"     onChange={handleChange}/>}
    label="Expliquer que nous sommes kompar"
  />
    <FormControlLabel
    control={<Android12Switch  color="success" checked={qualificationsQté.switchState.Explication_changement_de_fournisseur} name="Explication_changement_de_fournisseur"     onChange={handleChange}/>}
    label="Explication changement de fournisseur"
  />
   
  </Stack>
</Paper>
    </Grid>
    <Grid xs={6}>
    <Paper elevation={3} sx={{p:1}}>

    <Typography
    variant="subtitle1"
    gutterBottom
    sx={{ fontWeight: 600 }}
    >
    Il est strictement interdit de
    </Typography>
    <Stack>
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.Discours_frauduleux_mensenger} name="Discours_frauduleux_mensenger"     onChange={handleChange}/>}
    label="Discours frauduleux/mensenger"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.MES_non_conforme} name="MES_non_conforme"     onChange={handleChange}/> }
    label="MES non conforme"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.non_conformité_signature_recap} name="non_conformité_signature_recap"     onChange={handleChange}/>}
    label="Non conformité signature / recap"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.Validation_à_la_place_du_prospect} name="Validation_à_la_place_du_prospect"     onChange={handleChange}/>}
    label="Validation à la place du prospect"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.Comportement_général} name="Comportement_général"     onChange={handleChange}/>}
    label="Comportement général"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.Mineur_trop_âgée_non_lucide} name="Mineur_trop_âgée_non_lucide"     onChange={handleChange}/>}
    label="Mineur, trop âgée/non lucide"
  />
    <FormControlLabel
    control={<Android12Switch  color="error" checked={qualificationsQté.switchState.IBAN_invalide} name="IBAN_invalide"     onChange={handleChange}/>}
    label="IBAN invalide"
  />
  </Stack>

  </Paper>
  

    </Grid>
    <Grid xs={6}>
    <TextField
    fullWidth
     label="Commentaire"
    id="Commentaire"
     multiline
     onChange={handleCommentChange}
     value={qualificationsQté.comment}

    />
    </Grid>
    <Grid xs={6}>
    <FormControl fullWidth >
  <InputLabel id="demo-simple-select-label"> Qualificaion </InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Qualificaion"
    value={qualificationsQté.qualification}
    onChange={handleQualificationChange}
    name="qualification"
  >
    {initialQualification.map((option) => (
    <MenuItem value={option} key={option}>{option}</MenuItem>
    ))}
   
  </Select>
</FormControl>
    </Grid>
  </Grid>     
return (
    <DraggableDialog
    variant = 'contained'
    startIcon = ''
    chipIcon = {<Headphones />}
    buttonText = "Qualité"
    title="Qualité"
    text={content}
  />
)
}

export default QualificationQualité

