import { Avatar, Card, CardContent, CardHeader, IconButton, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import UserContext from "./UserContext";
import { useContext } from "react";
import MemberModal from "./MemberModal";

const MemberCard = ({ member }) => {

    const { deleteMember } = useContext(UserContext)

    const stringAvatar = (name) => {
        return {
            children: `${name.split(' ')[0][0]}`,
        }
    }
    return (
        <Card key={member.id}>
            <Avatar {...stringAvatar(member.name)} sx={{ bgcolor: "green" }} style={{ marginTop: "20px", marginLeft: "15px" }} />
            <CardHeader
                title={member.name}
                action={
                    <Tooltip title="Delete User" placement="top">
                        <IconButton onClick={() => deleteMember(member.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                }
            />

            <CardContent>
                <Typography paragraph align="justify">
                    {member.phone}
                </Typography>
                <MemberModal member={member} />
            </CardContent>
        </Card>
    );
}

export default MemberCard;