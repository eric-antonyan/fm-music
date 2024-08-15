import { FC } from "react";
import HomeLayout from "../layouts/HomeLayout";
import { useAuth } from "../contexts/UserProvider";
import { Flex, Text } from "@chakra-ui/react";
import Loading from "./Loading";
import ProfileHeader from "../components/ProfileHeader";
import { Link, useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import ProfileHeaderText from "../ui/ProfileHeaderText";
import Cookies from "js-cookie";

const ProfilePage: FC = () => {
    const { auth, isLoading } = useAuth();
    const navigate = useNavigate()
    return (
        <HomeLayout>
            {!isLoading ? (
                auth ? (
                    <>
                        <ProfileHeader auth={auth} />
                        <Flex direction={"column"} gap={"20px"}>
                            <ProfileHeaderText>User Info</ProfileHeaderText>
                            <UserInfo auth={auth} />
                            <ProfileHeaderText>Playlists</ProfileHeaderText>
                            <Text fontWeight={600} as={"span"} color={"crimson"}>Playlists not found, <Link style={{color: "#6495ED"}} to="/home/playlists/add">Add new</Link></Text>
                        </Flex>
                    </>
                ) : (
                    <>
                    "User not be found"
                    <button onClick={() => {
                        Cookies.remove("access_token")
                        navigate("/")
                    }}>Logout</button>
                    </>
                )
            ) : (
                <Loading />
            )}
        </HomeLayout>
    );
};

export default ProfilePage;
