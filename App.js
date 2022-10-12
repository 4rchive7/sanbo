import {
	Box,
	Button,
	Flex,
	Text,
	TextInput,
	IconComponentProvider,
	Icon,
} from "@react-native-material/core";
import { vw } from "react-native-expo-viewport-units";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EvilsIcons from "react-native-vector-icons/EvilIcons";
import {
	KeyboardAvoidingView,
	StyleSheet,
	TurboModuleRegistry,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useEffect, useState } from "react";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	inner: {
		flex: 1,
		justifyContent: "space-around",
	},
});

const spellCheck = (str, type) => {
	var regex;
	type == "email"
		? (regex = new RegExp(
				/([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
		  ))
		: (regex = new RegExp(
				/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/
		  ));

	console.log(type, str, regex.test(str));
	return regex.test(str);
};

const App = () => {
	const [email, setEmail] = useState(null);
	const [emailStatus, setEmailStatus] = useState(null);
	const [password, setPassword] = useState(null);
	const [passwordStatus, setPasswordStatus] = useState(null);
	const [passwordConfirm, setPasswordConfirm] = useState(null);
	const [passwordConfirmStatus, setPasswordConfirmStatus] = useState(null);
	const [nickname, setNickname] = useState(null);
	const [nicknameStatus, setNicknameStatus] = useState("");
	const [isInvisiblePassword, setInvisiblePassword] = useState(true);
	const [isInvisiblePasswordConfirm, setInvisiblePasswordConfirm] =
		useState(true);

	useEffect(() => {
		setEmailStatus(spellCheck(email, "email"));
		setPasswordStatus(spellCheck(password, "password"));
		setPasswordConfirmStatus(spellCheck(passwordConfirm, "password"));
		setNicknameStatus(spellCheck(nickname, "nickname")); //기준에 대해서 물어보기
	}, [email, password, passwordConfirm, nickname]);

	return (
		<Flex fill>
			<Box h={36}></Box>
			<KeyboardAwareScrollView>
				<Flex fill>
					<StatusBarUpper />
					<SignupHeader />
					<Space margin={8} />
					<SignupElement
						type="email"
						name="이메일 주소"
						placeholder="이메일 주소"
						value={email}
						setter={setEmail}
						status={emailStatus}
						setStatus={setEmailStatus}
					/>
					<SignupElement
						type="password"
						name="비밀번호"
						placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
						value={password}
						setter={setPassword}
						status={passwordStatus}
						setStatus={setPasswordStatus}
						isInvisible={isInvisiblePassword}
						setInvisible={setInvisiblePassword}
					/>
					<SignupElement
						type="password"
						name="비밀번호 확인"
						placeholder="비밀번호 재입력"
						value={passwordConfirm}
						setter={setPasswordConfirm}
						status={passwordConfirmStatus}
						setStatus={setPasswordConfirmStatus}
						isInvisible={isInvisiblePasswordConfirm}
						setInvisible={setInvisiblePasswordConfirm}
					/>
					<SignupElement
						type="nickname"
						name="닉네임"
						placeholder="닉네임"
						description="닉네임을 추천해드려요! 가입 후 언제든지 바꿀 수 있어요!"
						value={nickname}
						setter={setNickname}
						// status={nicknameStatus}
						// setStatus={setNicknameStatus}
					/>
				</Flex>
			</KeyboardAwareScrollView>

			<NextButton />
			<Box h={40}></Box>
		</Flex>
	);
};

const SignupElement = (props) => (
	<Flex ml={20} mr={20} mt={24}>
		<Flex>
			<Text
				style={{
					// fontFamily: "Noto Sans CJK KR",
					fontStyle: "normal",
					fontWeight: "400",
					fontSize: 14,
					lineHeight: 14,
					letterSpacing: "-0.01em",
					color: "#333333",
				}}
			>
				{props.name}
			</Text>
		</Flex>
		<Flex mt={12}>
			<TextInput
				variant="outlined"
				// blurOnSubmit={false} // 자판 안사라지게 하는 법
				secureTextEntry={props.type == "password" ? props.isInvisible : false}
				placeholder={props.placeholder}
				fontSize={14}
				height={52}
				maxLength={
					props.type == "password" ? 15 : props.type == "nickname" ? 8 : 40
				}
				value={props.value}
				color={
					props.status == null
						? "grey"
						: props.status == true
						? "grey"
						: "#EB0800"
				}
				onChangeText={(e) => {
					props.setter(e);
				}}
				trailing={
					props.type == "password" ? (
						<Text
							style={{
								// fontFamily: "Noto Sans CJK KR",
								fontStyle: "normal",
								fontWeight: "700",
								fontSize: 13,
								lineHeight: 13,
								color: "#666666",
							}}
							onPress={(e) => {
								props.setInvisible(!props.isInvisible);
							}}
						>
							보기
						</Text>
					) : (
						<Icon
							m={17}
							name="close-o"
							size={18}
							onPress={(e) => props.setter("")}
						/>
					)
				}
			/>
		</Flex>
		{props.description != null ? (
			<Flex>
				<Text
					style={{
						// fontFamily: "Noto Sans CJK KR",
						fontStyle: "normal",
						fontWeight: "400",
						fontSize: 12,
						lineHeight: 12,
						color: "#666666",
						// letterSpacing: "-0.01em",
					}}
				>
					{props.description}
				</Text>
			</Flex>
		) : null}
	</Flex>
);

const StatusBarUpper = () => <Box h={3} />;

const Space = (props) => <Box h={props.margin} />;

const SignupHeader = (props) => (
	<Flex
		h={56}
		direction="row"
		style={{
			borderBottomWidth: 1,
			borderBottomColor: "#E5E5E5",
		}}
	>
		<Flex center w={vw(20)}>
			<Flex justify="center" fill>
				<Icon m={17} name="close" size={30} />
			</Flex>
		</Flex>

		<Flex center w={vw(60)}>
			<Text
				style={{
					fontStyle: "normal",
					fontWeight: "400",
					fontSize: 18,
					lineHeight: 27,
					color: "#000000",
				}}
			>
				회원가입
			</Text>
		</Flex>
		<Flex center w={vw(20)}></Flex>
	</Flex>
);

const NextButton = (props) => (
	<Flex ml={20} mr={20}>
		<Button
			disabled
			title="다음"
			compact
			height={53}
			style={{
				justifyContent: "center",
			}}
			titleStyle={{
				// fontFamily: "Noto Sans CJK KR",

				fontStyle: "normal",
				fontWeight: "700",
				fontSize: 16,
				lineHeight: 16,
			}}
		/>
	</Flex>
);

export default () => (
	<IconComponentProvider IconComponent={EvilsIcons}>
		<App />
	</IconComponentProvider>
);
