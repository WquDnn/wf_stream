import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import Detector from "i18next-browser-languagedetector"
import Backend from "i18next-http-backend"

i18n.use(initReactI18next).use(Backend).use(Detector).init({
    fallbackLng: "uk",
    interpolation: {
        escapeValue: false
    },
    detector: {
     order: ["navigator"],
     lookupLocalStorage: "i18nextLng",
     caches: ["localStorage"]
    },
    backend: {
        loadPath: "/locales/{{lng}}/translation.json"
    }
})

export default i18n