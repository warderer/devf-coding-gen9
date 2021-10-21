import React, { useState, useEffect } from 'react';
import useAxios from '../../hooks/useAxios';
import Coin from '../../components/Coin/Coin';

const Home = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');

    const { response, loading, error } = useAxios({
        method: 'GET',
        url: 'coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    });

    const handleChange = e => {
        setSearch(e.target.value)
    }

    useEffect(() => {
        if (response !== null) {
            setCoins(response);
            console.log(response);
        }
    }, [response]);

    const filteredCoins = coins && coins.filter(coin =>
        coin.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <h1>Home</h1>
            <div className='coin-app'>
                <div className='coin-search'>
                    <h1 className='coin-text'>Search a currency</h1>
                    <form>
                        <input
                            className='coin-input'
                            type='text'
                            onChange={handleChange}
                            placeholder='Search'
                        />
                    </form>
                </div>
                {error && (
                    <div>
                        <p>{error.message}</p>
                    </div>
                )}

                {coins && <div>
                    {filteredCoins.map(coin => {
                        return(
                            <Coin
                                key={coin.id}
                                name={coin.name}
                                price={coin.current_price}
                                symbol={coin.symbol}
                                marketcap={coin.market_cap}
                                volume={coin.total_volume}
                                image={coin.image}
                                priceChange={coin.price_change_percentage_24h}
                            />
                        )
                    })

                    }
                </div>
                }
            </div>
        </>
    )
}

export default Home;