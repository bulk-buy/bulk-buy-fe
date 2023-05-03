import { useAuthenticator, withAuthenticator } from "@aws-amplify/ui-react";
import { ChevronLeft, ChevronRight, Logout, Menu } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { getUserByEmail } from "apis/endpoints/UserEndpoints";
import { NavigationList } from "constants/LeftNavigationConsts";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { setCognitoInfo, setUserInfo } from "store/userInfoSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const CustomAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

function LeftNavigation() {
  const { user, signOut } = useAuthenticator();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const [open, setOpen] = React.useState(true);

  useEffect(() => {
    dispatch(setCognitoInfo(user));
    getUserByEmail(user?.attributes?.email).then((user) => {
      dispatch(setUserInfo(user[0]));
    });
  }, [user, dispatch]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClickNavigation = (routeTo) => {
    navigate(routeTo);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <CustomAppBar position="fixed" open={open}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <Menu />
          </IconButton>
          <img
            alt="BulkBuy logo"
            src="/images/logo.png"
            height={50}
            style={{ margin: "auto" }}
          />
          <IconButton onClick={() => handleClickNavigation("/profile")}>
            <Avatar />
          </IconButton>
        </Toolbar>
      </CustomAppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction == "ltr" ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            flexGrow: 1,
            flexDirection: "column",
            display: "flex",
          }}
        >
          {NavigationList.map((link) => (
            <ListItem key={link.routeTo} disablePadding>
              <ListItemButton
                color={link.color}
                onClick={() => handleClickNavigation(link.routeTo)}
              >
                <ListItemIcon color={link.color}>{link.icon} </ListItemIcon>
                <ListItemText primary={link.title} />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem key="signout" disablePadding sx={{ marginTop: "auto" }}>
            <ListItemButton color="error" onClick={signOut}>
              <ListItemIcon color="error">
                <Logout />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
}

// export default LeftNavigation;
export default withAuthenticator(LeftNavigation);
