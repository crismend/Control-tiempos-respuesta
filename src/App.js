import React, { useEffect, useState } from 'react';
import './App.css';
 import logo from './Img/pazDelRio.png'

function App() {

  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)  //false valor predeterminado del contador

  //useState para listar y guardar
  const [list, setList] = useState(JSON.parse(localStorage.getItem("lista") || '[]'))


  //useEffect se ejecutara cada vez que el timerOn cambie
  useEffect(() => {
    //control d eintervalo
    let interval = null;
    //se inicializa el intervalo (se enciende el temporizador)
    if (timerOn) {
      //con el metodo setInterval aumentamos cada 10 mls en la funcion setTime
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);    //10 mls  (seguimiento a las centecimas de seg)                        

      //(se apaga el temporizador) borramos este intervalo con el metodo  clearInterval()js
    } else if (!timerOn) {
      clearInterval(interval);
    }
    //funcion de limpieza
    return () => clearInterval(interval)

  }, [timerOn])




  //captura de tiempos
  const timeList = () => {
    setTimerOn(false)
      setTime(0)
    const fecha = new Date().getTime();
    list.push({ time, fecha });
    guardarLista();
  }

  const agregarCeroSiEsNecesario = valor => {
    if (valor < 10) {
      return "0" + valor;
    } else {
      return "" + valor;
    }
  }

  const milisegundosAMinutosYSegundos = (milisegundos) => {
    const minutos = parseInt(milisegundos / 1000 / 60);
    milisegundos -= minutos * 60 * 1000;
    const segundos = (milisegundos / 1000);
    return `${agregarCeroSiEsNecesario(minutos)}:${agregarCeroSiEsNecesario(segundos.toFixed(1))}`;
  };

  const guardarLista = () => {
    localStorage.setItem("lista", JSON.stringify(list));
  };
  const borrarLista = () => {
    setList([]);
    localStorage.removeItem("lista");
  };


  return (
    <div className="App">
      <img className='logo' src={logo}/> 
      <h2 className='titulo'>Registro de Tiempos</h2>
      {/* display */}
      <div className='clock-holder'>
        <div className="display">
          <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}</span>&nbsp;:&nbsp;     {/*1min=60000mls %60*/}
          <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>&nbsp;:&nbsp;      {/*1seg=1000mls %60 seg en un minuto*/}
          <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>                              {/*1ctm=10mls, %100cent deseg en 1 seg*/}
        </div>
        {/* Botones */}
        <div className='botones'>
          <button className='button' onClick={() => setTimerOn(true)}>Start</button>
          <button className='button' onClick={() => timeList()}>Stop</button>
          <button className='button' onClick={() => setTimerOn(true)}>Resume</button>
          <button className='button' onClick={() => setTime(0)}>Reset</button>
        </div>
      </div>


      {/* listar los tiempos */}
      <div className='listaTiempos'>
        <h2 className='tituloR'>lista de Tiempos</h2>
        {list.map((marcaDeTiempo, indice) => {
          const fecha = new Date(marcaDeTiempo.fecha);
          const time = marcaDeTiempo.time;
          const formateador = new Intl.DateTimeFormat("es-es", {
            dateStyle: "short",
            timeStyle: "medium"
          });
          const formateado = formateador.format(fecha);

          return <p key={indice}>
            <span>{formateado}</span>
            &nbsp; &nbsp;
            <span className='tiempoRegistrado'>
              {milisegundosAMinutosYSegundos(time)}
            </span>
            
          </p>
        })}

        <div className='botones borrarList'>
          <button className='button' onClick={() => borrarLista()}>Borrar</button>
        </div>
      </div>
    </div>
  );
}







export default App;
