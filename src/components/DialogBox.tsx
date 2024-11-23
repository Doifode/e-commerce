import React from "react";
import {
    Modal,
    Box,
    IconButton,
    Typography,
    SxProps,
    Theme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface DialogBoxProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
    sx?: SxProps<Theme>; // Custom styling for the modal box
}

const DialogBox: React.FC<DialogBoxProps> = ({
    open,
    onClose,
    title = "",
    children,
    sx = {},
}) => {
    const modalStyle: SxProps<Theme> = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: 24,
        p: 4,
        ...sx, // Allow overriding styles
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={modalStyle}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    {title && (
                        <Typography variant="h6" component="h2">
                            {title}
                        </Typography>
                    )}
                    <IconButton onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Box>
        </Modal>
    );
};

export default DialogBox;
