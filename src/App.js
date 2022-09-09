import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import Modal from "./UI/Modal/Modal";

const App = () => {
  const [isModalVisable, setIsModalVisable] = useState(false);

  const showModal = () =>{
    setIsModalVisable(true);
  }

  const hideModal = () =>{
    setIsModalVisable(false);
  }

  return (
    <div>
      <Header showModal={showModal}/>
      <MainSection/>
      {isModalVisable && <Modal hideModal={hideModal}><Cart hideModal={hideModal}/></Modal>}
    </div>
  );
}

export default App;
