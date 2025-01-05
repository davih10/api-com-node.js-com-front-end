
import { useEffect,useState,useRef} from 'react'
//Para Importar uma imagem: import Nome from 'caminho para imagem'
import './style.css'
import Lixo from '../../assets/lixo.png'
import api from '../../services/api' // importar api

//React hook ---> useRef

function Home() {
  //Código js
const [users,setUsers]= useState([]) // Para mudar a variavel dinamicamente junto com a segunda variavel

const inputName= useRef()
const inputAge= useRef() //Faz referencia ao input junto com o ref em baixo
const inputEmail= useRef()

  async function getUsers(){ //Função assincrono é usada quando a função tem que pegar algo externo
    const usersFromApi = await api.get('/usuarios')          //await ---> espera a conexão
    setUsers(usersFromApi.data) // segunda variavel
  }
  async function createUsers(){ //Função assincrono é usada quando a função tem que pegar algo externo
    await api.post('/usuarios',{
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value
    })
    getUsers()
  }
  useEffect(()=>{ //Quando a pagina rodar tudo será executado dentro do bloco
    getUsers()
  },[])

  return ( //Codigo html só que o {js}
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" name="nome" placeholder='Digite seu nome' required ref={inputName}/>
        <input type="number" name="idade" placeholder='Digite sua idade' required ref={inputAge}/>
        <input type="text" name="email" placeholder='Digite seu email' required ref={inputEmail}/>
        <button type='button'>Cadastrar</button>
      </form>
    {users.map(user => (
      <div key={user.id} className='Card'>
        <div>
          <p>Nome: <span>{user.name}</span></p>
          <p>Idade: <span>{user.age}</span></p>
          <p>Email: <span>{user.email}</span></p>
        </div>
        <div>
          <button type="button" onClick={createUsers}>
            <img src={Lixo} id='lixo' />
          </button>
        </div>
      </div>
    ))}
  </div>
  )
}


export default Home