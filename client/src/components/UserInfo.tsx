import { Badge, DataList, Link, Text } from "@radix-ui/themes";
import { FC } from "react";
import { UserData } from "../typings/UserData";

interface IUserInfo {
    auth: UserData;
}

const UserInfo: FC<IUserInfo> = ({ auth }) => {
    return (
        <DataList.Root>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">
                    Verified By FM Music
                </DataList.Label>
                <DataList.Value>
                    <Badge color="jade" variant="soft" radius="full">
                        {auth.verified ? "YES" : "NO"}
                    </Badge>
                </DataList.Value>
            </DataList.Item>

            <DataList.Item align="center">
                <DataList.Label minWidth="88px">ID</DataList.Label>
                <DataList.Value>{auth._id.toUpperCase()}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Name</DataList.Label>
                <DataList.Value>{auth.name}</DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Email</DataList.Label>
                <DataList.Value>
                    <Link href={`mailto:${auth.email}`}>{auth.email}</Link>
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Company</DataList.Label>
                <DataList.Value>
                    <Text as={"span"}>
                        {auth.name.split(" ").length === 1
                            ? auth.name
                            : auth.name.split(" ")[1]}{" "}
                        Productions
                    </Text>
                </DataList.Value>
            </DataList.Item>
            <DataList.Item align="center">
                <DataList.Label minWidth="88px">Description</DataList.Label>
                <DataList.Value>
                    <Text as="span">{auth.description}</Text>
                </DataList.Value>
            </DataList.Item>
        </DataList.Root>
    );
};

export default UserInfo;
