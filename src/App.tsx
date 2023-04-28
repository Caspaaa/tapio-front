import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { PostList } from './views/PostListView';
import { PostView } from './views/PostView';

export function App(): JSX.Element {
	return (
		<Router>
			<div className="mx-auto">
				<Routes>
					<Route path="/" element={<PostList />} />
					<Route path="/posts/:id" element={<PostView />} />
				</Routes>
			</div>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" icon={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
		</Router>
	);
}
