import { toast } from 'react-toastify'

//import 'react-toastify/dist/ReactToastify.css'
//import 'react-toastify/dist/core/toast.d.ts'
//import 'react-toastify/dist/core/ReactToastify.css'


const ToasterStyle = { direction: 'rtl', fontFamily: 'Open Sans Hebrew Condensed' }
const ToasterSettings = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  style: ToasterStyle,
  theme: 'dark'

}

export const TopBarStyle = {
  position: 'fixed',
  top: 0,
  left: 0
}

export const succesLatwoToaster = (text) => toast.success(text, ToasterSettings)
export const infoLatwoToaster = (text) => toast.info(text, ToasterSettings)
export const errorLatwoToaster = (text) => toast.error(text, ToasterSettings)