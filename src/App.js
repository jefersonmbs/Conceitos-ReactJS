import React, { useEffect , useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>{
      api.get('/repositories').then(res =>{
        setRepositories(res.data);
      })
  }, [])

  async function handleAddRepository() {
    const res = await api.post('/repositories',{
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    const repo = res.data;

    setRepositories([...repositories , repo]);
  }

  async function handleRemoveRepository(id) {

     api.delete(`/repositories/${id}`).then(res => {
         console.log(res)
         setRepositories(repositories.filter( repo => repo.id != id
         ))
     })

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositories =>
              <li key={repositories.id}>
                  {repositories.title}

                  <button onClick={() => handleRemoveRepository(repositories.id)}>
                      Remover
                  </button>
              </li>
          )}

      </ul>

      <button type='button' onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
