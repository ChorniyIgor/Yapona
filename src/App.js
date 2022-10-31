import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import MainSection from "./components/MainSection/MainSection";
import CartContextProvider from "./store/cartContextProvider";
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
    <CartContextProvider>
      <Header showModal={showModal}/>
      <MainSection/>
      {isModalVisable && <Modal hideModal={hideModal}><Cart hideModal={hideModal}/></Modal>}
    </CartContextProvider>
  );
}

export default App;
