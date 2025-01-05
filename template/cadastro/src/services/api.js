//Import axios
import axios from 'axios'

const api = axios.create({ //Pegar uma api (fazer uma requisição)
    baseURL:'http://localhost:3000' //Link da apido back end
})

export default api //Exportar api