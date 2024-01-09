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

const Googleanalytics = () => {
  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader>Google Analytics Report</CCardHeader>
          <CCardBody>
            <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
              <iframe
                title="Looker Studio Report"
                width="100%"
                height="100%"
                src="https://lookerstudio.google.com/embed/reporting/1c52fe0f-86fe-4a27-be75-b0190d7c5633/page/kIV1C"
                style={{ border: 0 }}
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                loading="lazy"
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Googleanalytics
