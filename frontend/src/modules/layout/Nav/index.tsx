import { Accordion, AccordionDetails, AccordionSummary, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SwipeableDrawer } from "@mui/material"
import { Dispatch, FC, SetStateAction } from "react";
import { Link, links } from "./links";
import { Link as NavLink, useLocation } from "react-router-dom";
import { NAV_WIDTH } from "global/constants";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./index.module.scss";
import { AccessControl } from "shared/components/AccessControl";

type LinkProps = {
  link: Link,
  currentPath: string,
  onClose: () => void,
}

const LinkComponent: FC<LinkProps> = ({ link, currentPath, onClose }) => {
  if (link.path) return (
    <ListItem disablePadding dense>
      <ListItemButton dense component={NavLink} to={link.path} selected={currentPath === link.path} onClick={onClose}>
        <ListItemIcon sx={{ minWidth: 35 }} >
          {link.icon}
        </ListItemIcon>
        <ListItemText primary={link.title} />
      </ListItemButton>
    </ListItem>
  )
  else return (
    <Accordion elevation={0} square>
      <ListItemButton dense>
        <ListItemIcon sx={{ minWidth: 35 }} >
          {link.icon}
        </ListItemIcon>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          className={styles["nav__subnav"]}
        >
          <ListItemText primary={link.title} />

        </AccordionSummary>
      </ListItemButton>
      <AccordionDetails className={styles["nav__subnav-details"]}>
        {link.children?.map(child =>
          <AccessControl auth roles={child.roles.length ? child.roles : undefined} errorComponent={null} key={child.title}>
            <LinkComponent link={child} currentPath={currentPath} onClose={onClose} />
          </AccessControl>
        )}
      </AccordionDetails>
    </Accordion>
  )
}

type NavProps = {
  isOpened: boolean,
  setIsOpened: Dispatch<SetStateAction<boolean>>,
  isMobile: boolean,
}

export const Nav: FC<NavProps> = ({ isOpened, setIsOpened, isMobile }) => {
  const { pathname } = useLocation()

  const onOpen = () => {
    setIsOpened(true)
  }

  const onClose = () => {
    setIsOpened(false)
  }

  return (
    <SwipeableDrawer
      variant={isMobile ? "temporary" : "permanent"}
      open={isOpened}
      onOpen={onOpen}
      onClose={onClose}
      sx={{
        width: NAV_WIDTH,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: NAV_WIDTH, boxSizing: 'border-box', paddingTop: { xs: 7, md: 10 } },
      }}
    >
      <List>
        {links.map(link =>
          <AccessControl auth roles={link.roles.length ? link.roles : undefined} errorComponent={null} key={link.title}>
            <LinkComponent link={link} currentPath={pathname} onClose={onClose} />
          </AccessControl>
        )}
      </List>
    </SwipeableDrawer>
  )
}