import { useState } from 'react';


const initialState = {
    options: false,
    account: false,
}


const useModal = () => {
    const [modals, setModals] = useState(initialState);

    const modalActions = {
        showModal: (name) => setModals({ ...modals, [name]: true }),
        closeModal: (name) => setModals({ ...modals, [name]: false })
    }

    return { modals, modalActions }
}

export default useModal