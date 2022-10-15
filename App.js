import {
	Box,
	Button,
	Flex,
	Text,
	TextInput,
	IconComponentProvider,
	Icon,
} from "@react-native-material/core";
import { StatusBar } from "expo-status-bar";
import SignupComponent from "./component/SignupComponent";

const App = () => {
	return (
		<>
			<StatusBar />
			<SignupComponent />
		</>
	);
};

export default App;
