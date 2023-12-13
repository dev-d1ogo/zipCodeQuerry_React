import { useEffect, useState } from 'react'
import logoCaminhao from './assets/Caminhao.svg'
import logoBusca from './assets/Vector.svg'
import rosto from './assets/rostinho.svg'

import './App.sass'

function App() {
  const [cep, setCep] = useState('')
  const [url, setURL] = useState('')
  

  const [endereco, setEndereco] = useState(null)
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState(null)
  
  
  const buscarCep = async() =>{
    setLoading(true)
    
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((res) => {
        if (res.erro !== true) {
          setEndereco(res);
        } else {
          setErro(true);
          setEndereco(null);
        }
      })
      .catch((error) => {
        setErro(true);
        setEndereco(null);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    
    console.log(erro);
    console.log(endereco);

  }
  

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (cep.length > 0) {
      buscarCep() 
    }else{
      alert('Digite um CEP')
    }
    setCep('')
    
  }

  return (
    <div className="container">

      <div className="container-logoTitle">
        <div className="container-title">
          <h1>BuscaCEP</h1>
          <h2>Encontre qualquer CEP em segundos</h2>
        </div>
        <img src={logoCaminhao} alt="" />
      </div>

      <form onSubmit={handleSubmit}>
          <div className="busca">
            <input type="number" onChange={(e) => setCep(e.target.value)} value={cep} placeholder='Digite o CEP' />
            <button type="submit"><img src={logoBusca} alt="" /></button>
          </div>
      </form>
      
      
      {(endereco && !loading) &&  <div className="info">
          <p><span>Logradouro:</span> {endereco.logradouro}</p>
          <p> <span>Bairro</span>: {endereco.bairro}</p>
          <p><span>Cidade:</span> {endereco.localidade}</p>
          <p><span>Estado:</span> {endereco.uf}</p>
          
        </div>}
       
      {loading && 
        <div className="info">
          <p>Loading...</p>
        </div>
      }

      {(erro && !endereco) && !loading &&
      <div className="infoEspecial">
        <p>{"Cep não encontrado ou inválido"}</p>
        <img src={rosto} alt="" />
      </div>}

    </div>
  )
}

export default App
