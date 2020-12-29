import React, { useCallback, useState } from 'react';
import { KarakterAlkotas } from './pages/KarakterAlkotas';
import { Karakterlap } from './pages/Karakterlap';
import { useDataConnector } from './hooks/dataconnector';
import { Karakter, KarakterInfo } from './engine/karakter';
import 'semantic-ui-css/semantic.min.css'
import { PageHeader } from './components/PageHeader';


export type PageSelection = { page: 'karakteralkoto' | 'home' } | { page: 'karakterlap', karakter: KarakterInfo }


function App() {

  const [page, setPage] = useState<PageSelection>({ page: 'home' });
  const { save, list, categories, load, remove, listFajok, listFegyverek, saveFegyverek } = useDataConnector();
  const [karakter, setKarakter] = useState<Karakter>();
  const [currentCategory, setCurrentCategory] = useState('');

  const saveKarakter = useCallback((karakter: Karakter) => {
    save(karakter);
    setPage({ page: 'karakterlap', karakter });
  }, [save, setPage]);

  const removeKarakter = useCallback(() => {
    if (karakter) {
      remove(karakter);
      setPage({ page: 'home' });
    }
  }, [karakter, setPage, remove]);

  const renderPage = () => {
    switch (page.page) {
      case 'home': return <div>Óvakodj a rotoni lomhatasaktól</div>
      case 'karakteralkoto': return <KarakterAlkotas save={saveKarakter} fajok={listFajok()} />
      case 'karakterlap': return <Karakterlap saveFegyverek={saveFegyverek} fegyverek={listFegyverek()} categories={categories()} karakter={karakter as Karakter} save={saveKarakter} remove={removeKarakter} />
    }
  };



  return (
    <div className="App">
      <PageHeader
        categories={categories()}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        karakter={karakter}
        page={page}
        setPage={ps => {
          setPage(ps);
          if (ps.page === 'karakterlap') {
            setKarakter(load(ps.karakter));
          }
        }}
        save={saveKarakter}
        karakterek={list(currentCategory)}
      />
      {renderPage()}
    </div>
  );
}

export default App;
