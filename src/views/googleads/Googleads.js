import React from 'react'
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react'

import {
  CChartBar,
  CChartDoughnut,
  CChartLine,
  CChartPie,
  CChartPolarArea,
  CChartRadar,
} from '@coreui/react-chartjs'
import { DocsCallout } from 'src/components'

const Googleads = () => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Google Ads Report</CCardHeader>
          <CCardBody>
            <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
              <iframe
                title="Looker Studio Report"
                width="100%"
                height="100%"
                src="https://lookerstudio.google.com/embed/reporting/2df5da88-dedc-4237-b239-ec5efd269664/page/p_x6gc45a69c"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Googleads
