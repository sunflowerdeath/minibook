import { createContext, useContext } from 'react'

const MinimarkContext = createContext({ components: {}, theme: {} })

const useTheme = () => useContext(MinimarkContext).theme

export default MinimarkContext
export { useTheme }
