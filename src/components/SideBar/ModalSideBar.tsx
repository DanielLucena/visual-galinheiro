import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import InsightsIcon from "@mui/icons-material/Insights";
import HomeIcon from "@mui/icons-material/Home";
import TocIcon from "@mui/icons-material/Toc";
import WidgetsIcon from "@mui/icons-material/Widgets";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { Menu, MenuItem } from "@mui/material";
import Logout from "@mui/icons-material/Logout";
import RegistrosContext from "../../context/registrosContext";
import { useContext } from "react";

type Anchor = "top" | "left" | "bottom" | "right";

export default function ModalSideBar() {
  const [user, _loading] = useAuthState(auth);
  const { userLogout } = useContext(RegistrosContext);
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {itemsList.map((item) => {
          const { text, icon, onClick } = item;
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton key={text} onClick={onClick}>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
  const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => navigate("/"),
    },
    {
      text: "DashBoard",
      icon: <InsightsIcon />,
      onClick: () => navigate("/dashboard"),
    },
    {
      text: "Galinheiros",
      icon: <WidgetsIcon />,
      onClick: () => navigate("/monitoring"),
    },
    {
      text: "Tabela",
      icon: <TocIcon />,
      onClick: () => navigate("/data-table"),
    },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          {(["left"] as const).map((anchor) => (
            <React.Fragment key={anchor}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer("left", true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor={anchor}
                open={state[anchor]}
                onClose={toggleDrawer(anchor, false)}
              >
                <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Hub de Dados
                  </Typography>
                </Toolbar>
                {list(anchor)}
              </Drawer>
            </React.Fragment>
          ))}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hub de Dados
          </Typography>
          {user && (
            <>
              <Tooltip title="Conta">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar src={user.photoURL!} alt="" />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                {/* <Typography variant="h6">Conta</Typography>
                <Typography variant="body1">{user.displayName}</Typography>

                <Divider /> */}

                <MenuItem
                  onClick={() => {
                    handleClose();
                    auth.signOut();
                    userLogout();
                  }}
                >
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              {/* //{" "}
              <Link to={"/profile"}>
                // <Avatar src={user.photoURL!} alt="" />
                //{" "}
              </Link> */}
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
