import { useState, useEffect } from "react";
import { FormPrev } from "./formPm/FormPrev";
import { Box, Button } from "@mui/material";
import ConfirmationDialog from "./tabel/ConfirmationDialog";
import { CustomTable } from "./tabel/TabelPm";
import FilledAlerts from "./tabel/Alert";

export function Layout() {
  const [formPrev, setFormPrev] = useState({});
  const [formTable, setFormTable] = useState([]);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Update showTable state based on formPrev.pm selection
  useEffect(() => {
    setShowTable(!!formPrev.pm); // Show table only if pm is selected
  }, [formPrev.pm]);

  // Handle form data from FormPrev
  function handleFormData(data) {
    setFormPrev(data);
  }

  // Handle table data
  function handleTabelData(data) {
    setFormTable(data);
  }

  // Submit button logic
  function buttonSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(formPrev);

    if (validationErrors.length > 0) {
      setErrors(validationErrors); 
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }
    
    setOpen(true); 
  }

  // Validation logic
  const validateForm = (data) => {
    const fields = ['unit', 'hm', 'pm', 'start', 'end'];
    return fields
      .filter(field => !data[field])
      .map(field => `${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
  };

  // Handle dialog close after confirmation
  const handleClose = (confirmed) => {
    if (confirmed) {
      // Logic for sending data can be added here
      // Example: API call to save data
    }
    setOpen(false);
    console.log("Form Data:", formPrev);
    console.log("Table Data:", formTable)
  };

  
  

  return (
    <>
    <Box sx={{position:"relative"}}>    
      <FormPrev onChange={handleFormData} errors={errors} />
      
      {/* Tabel hanya muncul jika pm dipilih */}
      {showTable && <CustomTable onChange={handleTabelData} pmType={formPrev.pm} />}

      {/* Pesan error jika ada */}
      {showError && <FilledAlerts errors={errors} />}

      {/* Tombol Submit hanya muncul jika showTable true */}
      {showTable && (

    <Box> 
      <Button 
        type="submit" 
        sx={{position:"absolute", right:"80px",
        bottom:{xs: '0.5rem', sm: '0.5rem', md: '0.5rem' },
       right: {xs: '3rem', sm: '3.5rem', md: '5rem', lg: '6.5rem', xl: '10rem'}, zIndex:999}}
        variant="contained" 
        onClick={buttonSubmit}
        style={{backgroundColor:"#008080"}}>
          Submit
      </Button>
    </Box>
)}


      <ConfirmationDialog open={open} handleClose={handleClose} />
    </Box>
    </>
  );
}
