import styles from '@/styles/Modals.module.css';

const Modal = ({ onClose, children }) => {
    return (
        <div className={styles["modal"]}>
            <button className={styles["modal-close"]} onClick={onClose}>
                Close
            </button>
            <div className={styles["modal-content"]}>{children}</div>
        </div>
    );
}

export default Modal;