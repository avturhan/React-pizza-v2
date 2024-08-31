import React from "react";


import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

 const Home =  () => {
    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState(0);

  React.useEffect(() => {
    setIsLoading(true);
    fetch('https://66d2bde5184dce1713ce45b8.mockapi.io/items?category = '+  categoryId)
      .then((res) => res.json())
      .then((arr) => {
        if (Array.isArray(arr)) {
            setItems(arr);
        } else {
            setItems([]); // или обработайте случай, когда данные не массив
        }
        setIsLoading(false);
      });
      window.scrollTo(0, 0)
  }, [categoryId]);
    return(
      <div className="container">
            <div className="content__top">
              <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)}/>
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {isLoading
                ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
            </div> 
        </div>
    )
}

export default Home;