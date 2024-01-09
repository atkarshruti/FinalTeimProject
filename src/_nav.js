import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cibInstagram,
  cibFacebook,
  cibYoutube,
  cilSpeedometer,
  cibLinkedin,
  cibGoogleAds,
  cibGoogleAnalytics,
  cilCheck,
  cilChatBubble,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Social Media',
  },
  {
    component: CNavItem,
    name: 'Facebook',
    to: '/facebook',
    icon: <CIcon icon={cibFacebook} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Instagram',
    to: '/instagram',
    icon: <CIcon icon={cibInstagram} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'YouTube',
    to: '/youtube',
    icon: <CIcon icon={cibYoutube} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Linkedin',
    to: '/linkedin',
    icon: <CIcon icon={cibLinkedin} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Google Ads',
    to: '/googleads',
    icon: <CIcon icon={cibGoogleAds} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Google Analytics',
    to: '/googleanalytics',
    icon: <CIcon icon={cibGoogleAnalytics} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Text Plagiarism',
  },
  {
    component: CNavItem,
    name: 'Check Plagiarism',
    to: '/textplagiarism',
    icon: <CIcon icon={cilCheck} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Custom Chatbot',
  },
  {
    component: CNavItem,
    name: 'Seva Facility Chatbot',
    to: '/chatbot',
    icon: <CIcon icon={cilChatBubble} customClassName="nav-icon" />,
  },
]

export default _nav
