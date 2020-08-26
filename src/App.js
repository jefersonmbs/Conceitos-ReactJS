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
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    })
    const repo = res.data;

    setRepositories([...repositories , repo]);
  }

  async function handleRemoveRepository(id) {

     api.delete(`/repositories/${id}`).then(r => {
         setRepositories(repositories.splice(1, 1))
     })

  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repositories =>
              <li key={repositories.id}>{repositories.title} </li>
          )}

      </ul>
        <button onClick={() => handleRemoveRepository(123)}>
            Remover
        </button>
      <button type='button' onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
