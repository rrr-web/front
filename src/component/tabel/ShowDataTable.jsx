import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Paper } from '@mui/material';
import useFetch from '../hook/useFetch';

export default function ShowData() {
    const {data, loading, error} = useFetch('http://localhost:3000/formService')

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }      

  return (
    <>
    {data.map((list, index) =>{
        return(
            <Paper key={index} elevation={3}  sx={{ 
                width: '90%'
              }}>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ArrowDropDownIcon />}
                      aria-controls="panel1-content"
                      id="panel1-header"
                    >
                      <Typography>{list.unit}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>
                       
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                  </Paper>
        )   
    })}
   
    </>
  );
}
