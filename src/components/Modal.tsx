import { Dispatch, SetStateAction } from 'react';

type ModalProps = {
	isVisible: boolean;
	closeModal: Dispatch<SetStateAction<boolean>>;
	children: JSX.Element;
};

export function Modal({ isVisible, closeModal, children }: ModalProps): JSX.Element {
	return (
		<>
			<div className={`fixed inset-0 flex justify-center items-center bg-gray-500 transition-opacity duration-500 ${isVisible ? 'bg-opacity-10' : 'bg-opacity-0'}`}>
				<div className={`absolute w-full sm:w-3/4 xl:w-2/3 2xl:1/2 h-screen bg-white p-12 phone-xl:rounded-[4rem] transition-transform duration-50 ${isVisible ? 'translate-y-40' : 'translate-y-full'}`}>{children}</div>
			</div>
		</>
	);
}
