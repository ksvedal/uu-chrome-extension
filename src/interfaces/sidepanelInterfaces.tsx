import { ElementType } from "./elementInterfaces"
import { JsonDataFormat } from "./resultInterfaces"

export interface SidepanelInterface {
    darkMode: boolean
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    scanPageResult: ElementType[]
    setScanPageResult: React.Dispatch<React.SetStateAction<ElementType[]>>
    error: string | null
    setError: React.Dispatch<React.SetStateAction<string | null>>
    websiteURL: string
    setWebsiteURL: React.Dispatch<React.SetStateAction<string>>
    jsonData: JsonDataFormat[]
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>
    
}