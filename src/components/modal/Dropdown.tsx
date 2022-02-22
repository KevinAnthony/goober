import React from "react";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { splitAndUppercase } from "../../util/formatting";
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state";
import { Menu, Typography } from "@mui/material";
import { PopupState as psState } from "material-ui-popup-state/core";

interface props {
  options: Array<string>;
  selected: string;
  onSelected: (index: number) => void;
  className: string;
}

export function Dropdown({ options, selected, onSelected, className }: props) {
  const handleMenuItemClick = (popupState: psState, index: number) => {
    onSelected(index);
    setSelected(splitAndUppercase(options[index]));
    popupState.close();
  };
  const [selectedState, setSelected] = React.useState(
    splitAndUppercase(selected)
  );

  return (
    <div className={className}>
      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState: psState) => (
          <React.Fragment>
            <Button
              variant="contained"
              fullWidth={true}
              {...bindTrigger(popupState)}
            >
              <Typography>{selectedState}</Typography>
            </Button>
            <Menu {...bindMenu(popupState)}>
              {options.map((option: string, index: number) => (
                <MenuItem
                  key={option}
                  onClick={() => handleMenuItemClick(popupState, index)}
                >
                  <Typography>{splitAndUppercase(option)}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </div>
  );
}
