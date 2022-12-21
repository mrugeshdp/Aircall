import React, { useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
import DialpadIcon from "@mui/icons-material/Dialpad";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const Footer = () => {
	const [activeTab, setActiveTab] = useState("calls");

	return (
		<div className="footerContainer">
			<div
				onClick={() => setActiveTab("calls")}
				className={activeTab === "calls" ? "active" : "notActive"}
			>
				<PhoneIcon className="iconSize" />
			</div>
			<div
				onClick={() => setActiveTab("contacts")}
				className={activeTab === "contacts" ? "active" : "notActive"}
			>
				<PersonIcon className="iconSize" />
			</div>
			<div className="dialPad" onClick={() => setActiveTab("")}>
				<span className="wrapper">
					<DialpadIcon className="dialPadIcon" />
				</span>
			</div>
			<div
				onClick={() => setActiveTab("settings")}
				className={activeTab === "settings" ? "active" : "notActive"}
			>
				<SettingsRoundedIcon className="iconSize" />
			</div>
			<div
				onClick={() => setActiveTab("record")}
				className={activeTab === "record" ? "active" : "notActive"}
			>
				<RadioButtonCheckedIcon className="iconSize" />
			</div>
		</div>
	);
};

export default Footer;
