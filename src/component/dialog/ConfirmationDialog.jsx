import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';


function ConfirmationDialog({ open, handleClose }) {
  return (
    <Dialog open={open} onClose={() => handleClose(false)}>
      <DialogTitle>Konfirmasi Pengiriman Data</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Apakah data sudah benar?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose(false)} color="primary">
          Batal
        </Button>
        <Button onClick={() => handleClose(true)} color="primary">
          Kirim
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default ConfirmationDialog
