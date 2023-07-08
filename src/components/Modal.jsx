import styles from '@/styles/Modals.module.css';

const Modal = ({ onClose, title, children }) => {
    return (
        <div className={styles["modal"]}>
            <div className={styles["modal-content"]}>
                <div className={styles["modal-header"]}>
                    <div>{title}</div>
                    <button className={styles["modal-close"]} onClick={onClose}>
                        <span className='text-2xl'>&times;</span>
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;