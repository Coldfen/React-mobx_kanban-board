import {Avatar, Box} from "@material-ui/core";

export default function User({user}) {
    return (
        <Box display="flex" alignItems="center">
            <Avatar src={user?.avatar} alt={user?.name}/>
            <span style={{padding: 5}}>
                {user?.name}
            </span>
        </Box>
    )
}