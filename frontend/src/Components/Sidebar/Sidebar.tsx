import {
    Drawer, 
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import { Home, VerifiedUserRounded, ViewAgenda } from '@mui/icons-material';
import { Link } from 'react-router-dom';


interface SidebarProps {
    open: boolean;
    onClose: () => void;
}

const menuItems = [
    {text: 'Acceuil', icon:<Home />,path: '/'},
    {text: 'Sign In', icon:<VerifiedUserRounded />,path: '/SigninLAyout'},
    {text: 'Agenda', icon:<ViewAgenda />,path: '/Agenda'},
];

function Sidebar({ open, onClose}: SidebarProps) {
    return (
        <Drawer anchor='left' open={open} onClose={onClose}>
            <List sx={{ width: 250 }}>
                {menuItems.map(item => (
                    <ListItem key={item.text} disablePadding onClick={onClose}>
                        <ListItemButton component={Link} to={item.path}>
                            <ListItemIcon>{item.icon}</ListItemIcon> 
                            <ListItemText primary={item.text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    )
}
export default Sidebar;