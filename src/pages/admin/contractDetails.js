import React, { useEffect, useState } from "react";
import { MainContainer } from "../../style/mainContainer";
import { useSelector } from "react-redux";
import { Box, Button, Divider, List, ListItem, ListItemText, ListSubheader, Paper, Stack, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import QualificationWc from "../../components/qalification/QualificationWc";
import QualificationQualité from "../../components/qalification/QualificationQualité";
import QualificationSav from "../../components/qalification/QualificationSav";
import { grey } from "@mui/material/colors";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getContract } from "../../functions/contract";
import moment from "moment";



const ContractDetails = () => {

    const {drawer} = useSelector((state) => ({...state}))
    const [data, setData] = useState([]);
    const [otherContractLink, setOtherContractLink] = useState("");
    const history = useNavigate()

    const { slug, energie } = useParams();
 
    const loadContract = () => {
      getContract(slug, energie).then((c) => {
        const {contract , otherContractLink} = c.data;
        setData(contract);
        setOtherContractLink(otherContractLink)
         });
    };
    useEffect(() => {
      loadContract(slug, energie);
    }, [slug, energie]);

    const handleOtherContractClick = (event) => {
      event.preventDefault();
      history(otherContractLink)
    };

    return(
     <MainContainer open={drawer} sx={{  backgroundColor : grey[100] , height:"100vh"}}>
        <Box sx={{ m: 2}}>
            <Box sx={{display : 'flex' , justifyContent:'space-between'}}>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
        Détail de la souscription
      </Typography>
      <Button
              variant="outlined"
            onClick={handleOtherContractClick}
            >
              change
            </Button>
      <Stack direction="row" spacing={2}>
        <QualificationQualité />
  <QualificationWc/>
  <QualificationSav />
  <Button variant="outlined" size="small" sx={{backgroundColor : 'white'}}>retour</Button>
</Stack>
</Box>
      <Grid container spacing={2} sx={{ mt: 2 }} >
        <Grid xs={6}>
        <Paper elevation={3} >
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail contrat</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Ref contrat" />
        <Typography >
{data.contratRef}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Ref client" />
        <Typography >
        {data.clientRef}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Énergie" />
        <Typography >
        {data.energie}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Point de livraison" />
        <Typography >
        {data.Point_de_livraison}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Partenaire" />
        <Typography >
        {data.Nom_du_partenaire}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Date début" />
        <Typography >
        {moment(data.date_de_début).format('DD/MM/YYYY')}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Date de signature" />
        <Typography >
        {moment(data.date_de_la_signature).format('DD/MM/YYYY')}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Mensualité" />
        <Typography >
        {data.Mensualité}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Statut" />
        <Typography >
        {data.Statut}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Puissance" />
        <Typography >
        {data.Puissance}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Offre" />
        <Typography >
        {data.Offre}
      </Typography>
      </ListItem>
    </List>
    </Paper>
        </Grid>
        <Grid xs={6}>
        <Paper elevation={3} >
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail client</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Contact" />
        <Typography >
        {data.Civility} {data.Prénom} {data.Nom}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Tel" />
        <Typography >
        {data.tel}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Email" />
        <Typography >
        {data.email}
      </Typography>
      </ListItem>
      <Divider  />
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Adresse" />
        <Typography >
        {data.Adresse} {data.Code_postal} {data.Commune}
      </Typography>
      </ListItem>      
    </List>
    </Paper>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail qualité </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { ""}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        { ""}      
        </Typography>
      </ListItem>
    </List>
    </Paper>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail welcome call </ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { ""}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        {""}
      </Typography>
      </ListItem>
    </List>
    </Paper>
    <Paper elevation={3} sx={{mt:1}}>
        <List
      sx={{ width: '100%' }}
      subheader={<ListSubheader>Détail sav</ListSubheader>}
    >
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Qualification " />
        <Typography >
        { ""}
      </Typography>
      </ListItem>
      <ListItem >
        <ListItemText id="switch-list-label-wifi" primary="Comentaire" />
        <Typography >
        { "" } 
      </Typography>
      </ListItem>
    </List>
    </Paper>
        </Grid>
      </Grid>
      </Box>
        
     </MainContainer>
    )
}

export default ContractDetails