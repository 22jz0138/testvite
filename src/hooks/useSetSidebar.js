import React, { useState } from 'react'

export default function useSetSidebar() {

    const [checkbool,serCheckbool] = useState(true);

    const toggleSidebar = () => {
      serCheckbool (prevState => !prevState)
    }
  return {checkbool,toggleSidebar}
}
