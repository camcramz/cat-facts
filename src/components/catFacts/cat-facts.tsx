import React, { useEffect, useState } from 'react';

import { useCatFactState, useCatFactDispatch, getCatFact, resetCatFact } from "../../context/catFacts/cat-facts-context";
import catPicture from './cat.jpeg';

export const CatFacts = () => {

  const dispatch = useCatFactDispatch();
  const { facts, loading, error } = useCatFactState();

  const [alertShow, setAlertShow] = useState(false);

  useEffect(() => {
    resetCatFact(dispatch);
    getCatFact(dispatch);
    // disable no dependency for passed dispatch.  We want this to render on mount only.
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setAlertShow(error ? true : false);
  }, [error])

  return (
    <div className={'container-fluid d-flex flex-column cat-card-body m-5 p-5'}>
      <div className={'row cat-fact-row h-100'}>
        <div className={'col-md-4 d-flex align-items-center justify-content-center'}>
          <img className={'card-img'} alt="cat" src={catPicture}/>
        </div>
        <div className={'col-md-8'}>
          <h3 className="App-header">Cat Facts</h3>
          <div className={'col  cat-fact-scroll'}>
            <ul>
              { facts && facts.length
                ? facts.map((fact, i) => (
                      <li key={i} className={'card-text cat-card-text'}>{ fact }</li>
                  ))
                : null }
            </ul>
            { error ? 
              <div className={`alert alert-danger ${alertShow ?  'alert-shown' : 'alert-hidden'}`} role="alert">
                Error retrieving random fact.  Please try again.
              </div>
              : null }
          </div>
          <button className={'btn btn-cat m-5'} onClick={() => getCatFact(dispatch)} disabled={loading} >{ loading ? 'Loading Another Fact' : 'Add Another Random Fact'}</button>
        </div>
      </div>
    </div>
  )
}
