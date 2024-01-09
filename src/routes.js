import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Facebook = React.lazy(() => import('./views/facebook/Facebook'))
const YouTube = React.lazy(() => import('./views/youtube/Youtube'))
const Instagram = React.lazy(() => import('./views/instagram/Instagram'))
const Linkedin = React.lazy(() => import('./views/linkedin/Linkedin'))
const GoogleAds = React.lazy(() => import('./views/googleads/Googleads'))
const GoogleAnalytics = React.lazy(() => import('./views/googleanalytics/Googleanalytics'))
const Widgets = React.lazy(() => import('./views/widgets/Widgets'))
const TextPlagiarism = React.lazy(() => import('./views/textplagiarism/Textplagiarism'))
const ChatBot = React.lazy(() => import('./views/chatbot/Chatbot'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/facebook', name: 'Facebook', element: Facebook, exact: true },
  { path: '/instagram', name: 'Instagram', element: Instagram, exact: true },
  { path: '/youtube', name: 'YouTube', element: YouTube, exact: true },
  { path: '/linkedin', name: 'Linkedin', element: Linkedin, exact: true },
  { path: '/googleads', name: 'GoogleAds', element: GoogleAds, exact: true },
  { path: '/googleanalytics', name: 'GoogleAnalytics', element: GoogleAnalytics, exact: true },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/textplagiarism', name: 'TextPlagiarism', element: TextPlagiarism, exact: true },
  { path: '/chatbot', name: 'ChatBot', element: ChatBot, exact: true },
]

export default routes
