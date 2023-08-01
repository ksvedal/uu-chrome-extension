import { ElementType } from "./elementInterfaces"
import { JsonDataFormat } from "./resultInterfaces"

export interface SidepanelInterface {
    darkMode: boolean
    scanPageResult: ElementType[]
    error: string | null
    websiteURL: string
    jsonData: JsonDataFormat[]
    setJsonData: React.Dispatch<React.SetStateAction<JsonDataFormat[]>>
    handleFetchData: () => void
    handleToggleDarkMode: () => void
    computedProperties: JSON | null;

}