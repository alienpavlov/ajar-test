import React from 'react';
import dummyMenu from '../dummyMenu';
import auth from './../fakeAuth';
import {Link} from 'react-router-dom';
import {Button, ButtonGroup, MenuItem, DropdownButton} from 'react-bootstrap';

export default class Menu extends React.Component {
  render() {
    const menuStructure = dummyMenu.data.map(
      (obj) => {
        // Hide menu item if it not visible or not enough rights
        if (!obj.visible
          || (obj.isAdmin && !auth.isAdmin())
          || (obj.isModerator && !auth.isModerator())
        ) {
          return null;
        }

        // If menu have sub items
        if (obj.subItems.length > 0) {
          const subMenu = obj.subItems.map((subObj) => {
            // Hide sub-menu item if it not visible or not enough rights
            if (!subObj.visible
              || (subObj.isAdmin && !auth.isAdmin())
              || (subObj.isModerator && !auth.isModerator())
            ) {
              return null;
            }
            return <MenuItem key={subObj.id} href={subObj.url}>{subObj.title}</MenuItem>
          });
          return <DropdownButton key={obj.id} title={obj.title} id={`bg-vertical-dropdown-${obj.id}`}>
            {subMenu}
          </DropdownButton>;
        }
        return <Button key={obj.id}><Link to={obj.url}>{obj.title}</Link></Button>;
      }
    );

    return (
      <div className="App-menu">
        <ButtonGroup vertical>
          {menuStructure}
        </ButtonGroup>
      </div>
    );
  }
}