import { useState } from 'react';
import Modal from '@/components/Modal';
import ItemList from "@/components/ItemList";
import styles from "@/styles/Forms.module.css";

const Searchbox = ({ value, onChange, label, list, accessor, identifier}) => {
    const [showModal, setShowModal] = useState(false);

    const handleSearchClick = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleItemSelect = (item) => {
        onChange(item);
        handleModalClose();
    };

    return (
        <>
            <label htmlFor={label}>
                <span>{`${label}:`}</span>
                <div className='w-full flex flex-row gap-2'>
                    <input id={label} className={`read-only:bg-gray-100 ${styles["input"]}`} type="text" value={value} onChange={(e) => onChange(e.target.value)} readOnly />
                    <button onClick={handleSearchClick} className='bg-gray-400 cursor-pointer'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>
                </div>
            </label>

            {showModal && (
                <Modal title={""} onClose={handleModalClose}>
                    <ItemList 
                        items={list} 
                        onSelect={handleItemSelect} 
                        accessor={accessor} 
                        identifier={identifier}
                    />
                </Modal>
            )}
        </>
    );
}

export default Searchbox;