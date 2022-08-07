import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function MemberModal({member}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>More info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" align='center' variant="h5" component="h2">
           {member.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Email address: ${member.email}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {`Phone number:${member.phone}`}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {member.details}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
