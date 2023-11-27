import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
} from '@chakra-ui/react'

const InvoiceModal = ({ isOpen, onOpen, onClose }: { isOpen: boolean, onOpen: () => void, onClose: () => void }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px" }}>
                        <Box display={"flex"} alignItems={"center"} gap={10}>
                            <input
                                onChange={handleImageSelectLocal}
                                id="file_input"
                                type="file"
                            />
                            <Button colorScheme='blue' onClick={() => modifyPdf(file)}>Belgeyi Yazdır</Button>
                        </Box>
                        <Box >
                            {modifiedPdf && (
                                <Box display={"flex"} alignItems={"center"} gap={5}>
                                    {file && typeof file === 'string' && <iframe src={file} height="300px" width="100%" />}
                                    <iframe src={`data:application/pdf;base64,${encode(modifiedPdf)}`} height="300px" width="100%"></iframe>
                                </Box>
                            )}
                        </Box>
                    </div>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default InvoiceModal