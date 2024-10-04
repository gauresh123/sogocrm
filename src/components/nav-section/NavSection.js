import PropTypes from 'prop-types';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Collapse, IconButton, List, ListItemText, Menu, MenuItem } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { BorderAll, ExpandLess, ExpandMore, MoreVert } from '@mui/icons-material';
import { useEffect, useState } from 'react';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], subscription, ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1, mt: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} subscription={subscription} />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
};

function NavItem({ item }) {
  const { title, path, icon, info, children } = item;
  const [open, setOpen] = useState(false);
  const [navigateTo, setNavigateTo] = useState(null);
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (children) {
      e.preventDefault(); // Prevent navigation
      setOpen((prev) => !prev);
    }
    setNavigateTo(path); // Set the path to navigate
  };

  const handleExpandClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent's onClick
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    if (navigateTo) {
      navigate(navigateTo);
      setNavigateTo(null); // Reset navigation state
    }
  }, [navigateTo, navigate]);

  return (
    <Box>
      <StyledNavItem
        component={RouterLink}
        to={path}
        onClick={handleClick}
        sx={{
          '&.active': {
            color: 'text.primary',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          },
          color: 'text.primary',
          fontWeight: '500',
        }}
      >
        <StyledNavItemIcon>{icon}</StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
        {/* {children && (
          <IconButton onClick={handleExpandClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        )} */}
        {info}
      </StyledNavItem>

      {children && (
        <Collapse in={open}>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {children.map((child) => (
              <NavItem key={child.title} item={child} />
            ))}
          </List>
        </Collapse>
      )}
    </Box>
  );
}
