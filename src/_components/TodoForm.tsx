import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';

type TodoFormProps = {
    handleClose: () => void;
    title: string;
    open: boolean;
}

export const TodoForm = ({ handleClose, title, open }: TodoFormProps) => {
    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
            <DialogTitle id="form-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                To subscribe to this website, please enter your email address here. We will send updates
                occasionally.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Email Address"
                    type="email"
                    fullWidth />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                Cancel
                </Button>
                <Button onClick={handleClose} color="primary">
                Subscribe
                </Button>
            </DialogActions>
        </Dialog>
    )
}

