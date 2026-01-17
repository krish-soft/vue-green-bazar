import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 CSS for customization

// Apply Bootstrap 5 buttons and default theme to SweetAlert2
// Swal.fire({
//   customClass: {
//     popup: 'border border-primary rounded-3', // Optional: Add Bootstrap border and rounded styling
//     title: 'fs-4 text-primary',               // Optional: Make the title font size larger and color it
//     content: 'fs-6',                          // Optional: Customize the content font size
//     confirmButton: 'btn btn-primary',         // Bootstrap 5 primary button for confirmation
//     cancelButton: 'btn btn-secondary'         // Bootstrap 5 secondary button for cancel
//   }
// });

/**
 * Show a normal SweetAlert2 message dialog.
 *
 * @param {string} title - The title of the alert.
 * @param {string} text - The text to display in the alert.
 * @param {string} icon - The type of alert icon (success, error, warning, info).
 * @param {boolean} showConfirmButton - Show the confirm button (default is true).
 * @param {number} timer - Set the timer in milliseconds for auto-close (optional).
 */
export function showMessageDialog(title, text, icon = 'info', showConfirmButton = true, timer = null) {
    Swal.fire({
        title,
        text,
        icon,
        showConfirmButton,
        timer,
        customClass: {
            confirmButton: 'btn btn-primary',   // Apply Bootstrap's primary button
        }
    });
}

/**
 * Show a SweetAlert2 confirmation dialog.
 *
 * @param {string} title - The title of the confirmation alert.
 * @param {string} text - The text to display in the alert.
 * @param {string} icon - The type of alert icon (warning, question).
 * @param {Function} onConfirm - The callback function for when "Yes" is clicked.
 * @returns {Promise<boolean>} - Returns a promise that resolves to `true` if confirmed, `false` otherwise.
 */
export function showConfirmDialog(title, text, icon = 'warning') {
    return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'btn btn-danger',
            cancelButton: 'btn btn-secondary',
        },
    }).then((result) => {
        return result.isConfirmed; // Returns true if "Yes" is clicked, false otherwise
    });
}