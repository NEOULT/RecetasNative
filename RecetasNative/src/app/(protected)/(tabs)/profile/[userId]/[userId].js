import { useLocalSearchParams } from "expo-router";
import ProfileScreen from "../index";

export default function profileByIdScreen() {

    const { userId } = useLocalSearchParams();

    return <ProfileScreen userId={userId} />;
}