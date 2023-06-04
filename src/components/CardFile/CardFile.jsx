import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgVideo from '../../../public/image/icon-videoPlayer.png'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThLarge, faDownload, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ConfirmationModal } from '../ConfirmationModal';
import FormModal from '../FormModal/FormModal';
import Modal from '@mui/material/Modal';

const CardFile = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showFormModalBerkas, setShowFormModalBerkas] = useState(false);

    return (

        <>
            <Card elevation={0} sx={{ maxWidth: 200, minHeight: 170, borderRadius: 2.5, marginBottom: '10px', border: '2px solid #f5f5f5' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <PopupState variant="popover" popupId="demo-popup-menu">
                        {(popupState) => (
                            <>
                                <MoreHorizIcon variant="contained" {...bindTrigger(popupState)} style={{ paddingRight: 20, color: '#E0E0E0', fontSize: 50 }} />
                                <Menu PaperProps={{
                                    style: {
                                        transform: 'translateX(-83%) translateY(-6%)',
                                    },
                                    elevation: 0,
                                    sx: {
                                        bgcolor: "#F0FAFF",
                                        overflow: 'visible',
                                        ml: '0px',
                                        borderRadius: '8px',
                                        '&:before': {
                                            content: '""',
                                            display: 'block',
                                            position: 'absolute',
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: '#F0FAFF',
                                            transform: 'translateY(-50%) rotate(45deg)',
                                            zIndex: 0,
                                        },
                                    },
                                }}{...bindMenu(popupState)}>
                                    <MenuItem style={{ marginTop: 12, marginBottom: 12 }} onClick={() => {
                                        popupState.close
                                        setShowFormModalBerkas(true);
                                    }}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginRight: '20px' }} icon={faPen} />Ganti Nama Berkas</Typography></MenuItem>
                                    <MenuItem style={{ marginTop: 12, marginBottom: 12 }} onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginRight: '20px' }} icon={faDownload} />Unduh Berkas</Typography></MenuItem>
                                    <MenuItem style={{ marginTop: 12, marginBottom: 12 }} onClick={popupState.close}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginRight: '20px' }} icon={faThLarge} />Lihat Detail</Typography></MenuItem>
                                    <MenuItem style={{ marginTop: 12, marginBottom: 12 }} onClick={() => setShowDeleteModal(true)}><Typography sx={{ fontSize: '14px' }} color="#2196F3"><FontAwesomeIcon style={{ marginRight: '20px' }} icon={faTrash} />Hapus Berkas</Typography></MenuItem>
                                </Menu>
                            </>
                        )}
                    </PopupState>
                </div>
                <CardMedia
                    component="img"
                    alt="img-folder"
                    height="124"
                    image={imgVideo}
                    style={{
                        display: 'block',
                        marginLeft: 'auto',
                        marginRight: 'auto', width: 134
                    }}
                />
                <hr style={{ width: 135, alignItems: 'center', marginLeft: 30 }} />
                <CardContent>
                    <Typography style={{ fontSize: 14 }} gutterBottom variant="h6" component="div">
                        Matematika Dasar
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Lizards are a widesp
                    </Typography>
                </CardContent>
            </Card>
            <Modal open={showFormModalBerkas} onClose={() => setShowFormModalBerkas(false)}>
                <FormModal
                    header="Ubah Nama Berkas"
                    placeholder="Nama Berkas"
                    closeFunction={() => {
                        setShowFormModalBerkas(false);
                    }}
                />
            </Modal>
            <ConfirmationModal
                show={showDeleteModal}
                primaryButtonName="Hapus"
                secondaryButtonName="Batal"
                onPrimaryButtonClick={() => setShowDeleteModal(false)}
                onSecondaryButtonClick={() => setShowDeleteModal(false)}
                title="Hapus Berkas?"
                image={'/image/quiz-delete.png'}
                confirmationText="Apakah Anda yakin ingin menghapus berkas ini?"
            />
        </>
    )
}

export default CardFile