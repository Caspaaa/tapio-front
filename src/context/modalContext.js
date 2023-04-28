import { createContext, useState } from 'react';
export const ModalContext = createContext();

export default function ModalContextComponent({ children }) {
	const [showModal, setShowModal] = useState(false);

	const setShowModalTrue = () => {
		setShowModal(true);
	};
	const setShowModalFalse = () => {
		setShowModal(false);
	};
	return (
		<ModalContext.Provider
			value={{
				showModal,
				setShowModalFalse,
				setShowModalTrue,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
}
