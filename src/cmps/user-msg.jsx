import Swal from 'sweetalert2';

import { eventBusService } from "../services/event-bus.service.js"
import { useEffect } from 'react';

export function UserMsg() {

    useEffect(() => {
        eventBusService.on('show-user-msg', (msg) => {
            return Toast.fire({
                icon: msg.type,
                text: msg.txt,
            });
        })
    }, [])


    const Toast = Swal.mixin({
        toast: true,
        background: "rgba(247, 238, 211)",
        position: "bottom-end",
        showConfirmButton: false,
        timer: 2000,
        width: 'auto',
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    // Toast.fire({
    //     icon: isSuccess ? 'success' : 'error',
    //     text: isSuccess ? text : 'try again later',
    // });
}