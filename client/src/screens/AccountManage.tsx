import { FC } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { Text } from "@chakra-ui/react";
import { useAuth } from "../contexts/UserProvider";
import ProfileHeader from "../components/ProfileHeader";
import { UserData } from "../typings/UserData";

const AccountManage: FC = () => {
    const { auth } = useAuth();
    return (
        <HomeLayout>
            <ProfileHeader auth={auth as UserData} />
            <Text>Account Manager</Text>
        </HomeLayout>
    );
};

export default AccountManage;
