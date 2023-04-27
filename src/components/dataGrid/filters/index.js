import React, { useEffect, useState } from 'react';
import DraggableDialog from '../../dialog';
import {FilterAlt , FilterAltOff} from '@mui/icons-material';
import {  FormControl, InputLabel, MenuItem, Select, Stack } from "@mui/material";
import { DateRange } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { getFilters } from '../../../functions/contract';
import { useDispatch } from 'react-redux';

const  intialState = {
  partenaires: ['Kompar_TV_KE40', 'Kompar_TV_KE24', 'Kompar_TV_KE27', 'Kompar_TV_KE42', 'Kompar_TV_KE31', 'Kompar_TV_KE41', 'Kompar Energie 21', 'Kompar_TV_KE39', 'Kompar_TV_KE30', 'Kompar_TV_KE34', 'Kompar Energie 00', 'Kompar Energie 01', 'Kompar_TV_KE20', 'Kompar_TV_KE35', 'Kompar_TV_KE33', 'Kompar_TV_KE23', 'Kompar energie 26', 'Kompar_TV_KE14', 'Kompar_TV_KE32', 'Kompar_TV_KE37', 'kompar energie 29', 'Kompar_TV_KE38', 'kompar energie 28', 'Kompar_TV_KE36'],
  qualificationsQté: ['conforme', 'non conforme', 'annulation', 'SAV', 'aucun(e)'],
  qualificationsWc: ['validé', 'A suivre', 'annulation', 'SAV', 'faux numéro', 'aucun(e)'],
  fournisseurs: ['ohm', 'Samsung'],
  
};
export const Filters = () => {
    
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  
  
    const [serverFilters, setServerFilters] = useState({
      partenaire: '',
      qualificationQté: '',
      qualificationWc: '',
      fournisseur: '',
      date : [
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection'
        }
      ],
    });
    const [filterCount, setFilterCount] = useState(0);

  
    const handleApply = () => {
      getFilters(serverFilters).then((c) => {
        console.log("filters", c.data);
        dispatch({ type: 'SET_FILTERS', payload: serverFilters });
        dispatch({ type: 'SET_SERVER_DATA', payload: c.data });
        setOpen(false)
      });
    };
    
  

    useEffect(() => {
      dispatch({
        type: 'SET_SERVER_FILTERS',
        payload: serverFilters,
      });

      let count = 0;
      for (const key in serverFilters) {
        if (key === "date") {
          if (serverFilters.date[0].startDate !== null && serverFilters.date[0].endDate !== null) {
            count++;
          }
        } else if (serverFilters[key] !== '' && serverFilters[key] !== null) {
          count++;
        }
      }
      setFilterCount(count);
    }, [serverFilters]);


    const handleChange = (e) => {
      setServerFilters({ ...serverFilters, [e.target.name]: e.target.value });

    };
    const handleDateChange = (item) => {
      setServerFilters((prevFilters) => ({
        ...prevFilters,
        date: [item.selection]
      }));  }

    const handleReset = () => {
      setServerFilters({
        partenaire: '',
        qualificationQté: '',
        qualificationWc: '',
        fournisseur: '',
        date :  [
          {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
          }
        ]
      });
      dispatch({ type: 'RESET_FILTERS' });

    };


 const content = 
   <Stack spacing={2} mt={1}>
<FormControl fullWidth size='small'>
<InputLabel id="demo-simple-select-label">Fournisseur</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="fournisseur"
  onChange={handleChange}
  value={serverFilters.fournisseur}
  name='fournisseur'
>
  {intialState.fournisseurs.map((option) => (
    <MenuItem value={option} key={option}>
      {option}
    </MenuItem>
  ))}
</Select>
</FormControl>


  <FormControl fullWidth size='small'>
<InputLabel id="demo-simple-select-label">Partenaire</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Partenaire"
  value={serverFilters.partenaire}
  name='partenaire'
  onChange={handleChange}
>
  {intialState.partenaires.map((option) => (
    <MenuItem value={option} key={option}>
      {option}
    </MenuItem>
  ))}
</Select>
</FormControl>


<FormControl fullWidth size='small'>
<InputLabel id="demo-simple-select-label">Qualification Qté</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Qualification Qté"
  value={serverFilters.qualificationQté}
  name='qualificationQté'
  onChange={handleChange}
>
  {intialState.qualificationsQté.map((option) => (
    <MenuItem value={option} key={option}>
      {option}
    </MenuItem>
  ))}
</Select>
</FormControl>


<FormControl fullWidth size='small'>
<InputLabel id="demo-simple-select-label">Qualification Wc</InputLabel>
<Select
  labelId="demo-simple-select-label"
  id="demo-simple-select"
  label="Qualification Wc"
  value={serverFilters.qualificationWc}
  name='qualificationWc'
  onChange={handleChange}
>
  {intialState.qualificationsWc.map((option) => (
    <MenuItem value={option} key={option}>
      {option}
    </MenuItem>
  ))}
</Select>
</FormControl>

<DateRange
  editableDateInputs={true}
  onChange={handleDateChange}
  moveRangeOnFirstSelection={false}
  ranges={serverFilters.date}
  showSelectionPreview={true}
  locale={locales['fr']}
/>
</Stack>
  return (
    
    <DraggableDialog
      badgeContent = {filterCount}
      startIcon = {<FilterAlt />  }
      chipIcon = { filterCount > 0 ? <FilterAltOff /> : <FilterAlt   />}
      buttonText = "Filtres"
      title={filterCount > 0 ? "Effacer" : "Filtres"}
      text={content}
      handleReset={handleReset}
      handleApply={handleApply}
      open={open}
      setOpen={setOpen}
    />
  );
};

export default Filters;
