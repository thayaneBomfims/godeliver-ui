import { toast } from 'react-toastify';

type status = 'success' | 'error'

export default function AlertToast(message: string, type: status) {

    toast[type](message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

}