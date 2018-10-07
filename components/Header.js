import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from '../routes';

export default () => {
  return (
    <Menu style={{ marginTop: '10px' }}>
      <Link route="/">
        <a className="item">Smart Meter</a>
      </Link>

      <Menu.Menu position="right">
        <Link route="/">
          <a className="item">View Account</a>
        </Link>
        <Link route="/newaccount">
          <a className="item">Create</a>
        </Link>
        <Link route="/management">
          <a className="item">Contract List</a>
        </Link>
        <Link route="/about">
          <a className="item">About Smart Meter</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};
