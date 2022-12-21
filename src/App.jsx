import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import Header from "./components/Header.jsx";
import axios from "axios";
import Calls from "./components/Calls.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
	const [activeTab, setActiveTab] = useState("inbox");
	const [activeCalls, setActiveCalls] = useState(null);
	const [error, setError] = useState(null);
	const getActiveCalls = () => {
		axios
			.get("https://cerulean-marlin-wig.cyclic.app/activities")
			.then((res) => {
				res.data.sort((a, b) => {
					var keyA = a.created_at,
						keyB = b.created_at;
					if (keyA > keyB) return -1;
					if (keyA < keyB) return 1;
					return 0;
				});
				setActiveCalls(res.data);
			})
			.catch((error) => setError(error.message));
	};

	useEffect(() => {
		getActiveCalls();
	}, []);

	return (
		<div className="container">
			<div className="header">
				<Header />
				<div className="tabs">
					<span
						className={activeTab === "inbox" ? "tabButton active" : "tabButton"}
						onClick={() => setActiveTab("inbox")}
					>
						Inbox
					</span>
					<span
						className={activeTab === "all" ? "tabButton active" : "tabButton"}
						onClick={() => setActiveTab("all")}
					>
						All Calls
					</span>
				</div>
			</div>
			<div className="container-view">
				{error && <span>{error || "ERROR"}</span>}
				{activeCalls && activeCalls.length && (
					<Calls
						activeCalls={activeCalls}
						setActiveCalls={setActiveCalls}
						activeTab={activeTab}
					/>
				)}
			</div>
			<div className="footer">
				<Footer />
			</div>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
