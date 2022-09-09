import styles from './Cart.module.css';

const Cart = (props) => {

    const cartItems = [    {
        id: "m1",
        name: 'Ролл "Наоми"',
        description:
          "Сыр Филадельфия, куриное филе, масаго, помидор, огурец, кунжут",
        price: 11.99,
      },
      {
        id: "m2",
        name: "Спайс в лососе",
        description: "Рис, лосось, соус спайс",
        price: 3.99,
      }]

    return <div>
        <ul className={styles.cartItems}>
          {cartItems.map(item => <li>{item.name}</li>)}
        </ul>

        <div className={styles.total}>
            <span>Total</span>
            <span>49.21</span>
        </div>

        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={props.hideModal}>Close</button>
            <button className={styles.button}>Order</button>
        </div>
    </div>
}

export default Cart;