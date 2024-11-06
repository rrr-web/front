
import { useState } from "react";
import { FormPrev } from "./formPm/FormPrev";
import { Box, Button } from "@mui/material";
import ConfirmationDialog from "./tabel/ConfirmationDialog";
import { CustomTable } from "./tabel/Tabel";
import FilledAlerts from "./tabel/Alert";

export function Layout() {
  const [formPrev, setFormPrev] = useState({});
  const [formTable, setFormTable] = useState({});
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showError, setShowError] = useState(false);
  
  function handleFormData(data) {
    setFormPrev(data);
  }
  
  function handleTabelData(data) {
    setFormTable(data);
  }
  
  function buttonSubmit(e) {
    e.preventDefault();
    const validationErrors = validateForm(formPrev);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); 
      setShowError(true);

      setTimeout(() => {
        setShowError(false);
      }, 5000);

      return;
    }
    
    setOpen(true); 
  }
  const validateForm = (data) => {
    const errors = [];
    if (!data.unit) {
      errors.push("Nomor Unit is required");
    }
    if (!data.hm) {
      errors.push("Hours Meter is required");
    }
    if (!data.pm) {
      errors.push("Preventive Maintenance is required");
    }
    if (!data.start) {
      errors.push("Start Progress is required");
    }
    if (!data.end) {
      errors.push("End Progress is required");
    }
    console.log(errors)
    return errors
  }
  
  const handleClose = (confirmed) => {
    if (confirmed) {
      // Logic for sending data can be added here
      // For example, you can make an API call to your backend
      // ... your data sending logic ...
    }
    setOpen(false);
  };

  return (
    <>
      <FormPrev onChange={handleFormData} errors={errors} />
      <CustomTable onChange={handleTabelData} />
      {showError && <FilledAlerts errors={errors} />}
      <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
        <Button type="submit" variant="contained" color="primary" onClick={buttonSubmit}>
          Submit
        </Button>
      </Box>
      <ConfirmationDialog open={open} handleClose={handleClose} />
    </>
  );
}
