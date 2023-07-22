import { io } from 'socket.io-client';
import './App.css';
import { useEffect, useState, useRef } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  // Criar a conexão do cliente Socket.IO utilizando uma referência (ref)
  const socketRef = useRef(null);

  useEffect(() => {
    // Inicializar a referência do socket apenas uma vez
    socketRef.current = io('http://localhost:3000');

    // Adicionar o listener para o evento 'listen'
    socketRef.current.on('listen', data => {
      setMessageList(current => [...current, data]);
    });

    // Remover o listener ao desmontar o componente
    return () => {
      socketRef.current.off('listen');
    };
  }, []);

  const handleConnect = () => {
    setIsLogged(true);
  };

  const handleSendMessage = () => {
    socketRef.current.emit('SendMessage', message);
  };

  if (!isLogged) {
    return (
      <div>
        <button onClick={handleConnect}>ENTRAR</button>
      </div>
    );
  } else {
    return (
      <div>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>

        <ul>
          {messageList.map((data, index) => (
            <li key={index}>{data}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
