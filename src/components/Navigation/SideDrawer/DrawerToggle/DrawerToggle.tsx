import React from 'react'

interface Props {
  clicked: () => void
}

const DrawerToggle = (props: Props) => (
  <div onClick={props.clicked}>MENU</div>
)

export default DrawerToggle
