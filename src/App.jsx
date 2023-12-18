import { useEffect, useState } from "react"


function App() {
  const [apiData, setApiData] = useState(false);
  const [date, setDate] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_API_KEY;
  useEffect(() => {
    if (date != null) {

      fetch(`http://data.fixer.io/api/${date}?access_key=${apiKey}&base=EUR&symbols=USD,GBP,CAD,JPY,CNY,CHF,AUD,ALL,AMD,AFN,AED `)
        .then(response => {
          if (!response.ok)
            throw new Error('Network response was not ok !')
          else
            return response.json()
        })
        .then(apiData => setApiData(apiData))
        .catch(error => console.log('Error fetching data :', error))
    }
  }, [date])

  const handleDate = e => {
    if (e.key === 'Enter')
      setDate(e.target.value)
  }

  const getFlagbyCurrency = (key) => {
    switch (key) {
      case 'USD':
        return 'usa.svg'
      case 'GBP':
        return 'united-kingdom.svg'
      case 'CAD':
        return 'kanada.svg'
      case 'JPY':
        return 'japonya.svg'
      case 'CNY':
        return 'çin.svg'
      case 'CHF':
        return 'isviçre.svg'
      case 'AUD':
        return 'avustralya.svg'
      case 'ALL':
        return 'arnavutluk.svg'
      case 'AMD':
        return 'ermenistan.svg'
      case 'AFN':
        return 'afganistan.svg'
      case 'AED':
        return 'bae.svg'
      default:
        return 'deneme.png'
    }
  }

  return (
    <>
      <div className="wrapper">
        <div className="input-box">
          <div className="user-info">Please press enter</div>
          <input type="date" onKeyDown={handleDate} min="1900-01-01" max="2100-12-31" />
        </div>
  
        {
          apiData && (
            <div className="result">
              <div className="base-currency">Base currency : 1 EURO</div>
              {
                Object.keys(apiData.rates).map((key, index) => (
                  <div key={index} className="result-item">
                    <div className="text">{key} : {apiData.rates[key]}</div>
                    <img src={getFlagbyCurrency(key)} alt="None" />
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
