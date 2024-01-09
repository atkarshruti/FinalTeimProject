import React, { useState } from 'react'
import WidgetsBrand from '../widgets/WidgetsBrand'
import { CRow, CInput, CButton } from '@coreui/react'
import { parse } from '@fortawesome/fontawesome-svg-core'

const Dashboard = () => {
  return (
    <CRow>
      <WidgetsBrand withCharts />
    </CRow>
  )
}

export default Dashboard
