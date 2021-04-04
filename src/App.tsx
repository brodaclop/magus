import React, { useCallback, useState } from 'react';
import { KarakterAlkotas } from './pages/KarakterAlkotas';
import { Karakterlap } from './pages/Karakterlap';
import { useDataConnector } from './hooks/dataconnector';
import { Karakter, KarakterInfo } from './engine/karakter';
import 'semantic-ui-css/semantic.min.css'
import { PageHeader } from './components/PageHeader';
import { Kombat } from './pages/Kombat';
import { StoryPage } from './story/pages/StoryPage';

export type PageSelection = { page: 'karakteralkoto' | 'home' } | { page: 'karakterlap', karakter: KarakterInfo } | { page: 'kombat', category: string } | { page: 'story' }


function App() {

  const [page, setPage] = useState<PageSelection>({ page: 'home' });
  const { save, list, categories, load, remove, listFajok, listFegyverek, saveFegyverek, loadStory, saveStory, listPancelok, savePancelok, clone } = useDataConnector();
  const [currentCategory, setCurrentCategory] = useState('');

  const saveKarakter = useCallback((karakter: Karakter) => {
    save(karakter);
    setPage({ page: 'karakterlap', karakter });
  }, [save, setPage]);

  const removeKarakter = useCallback((karakter: Karakter) => {
    if (karakter) {
      remove(karakter);
      setPage({ page: 'home' });
    }
  }, [setPage, remove]);

  const renderPage = () => {
    switch (page.page) {
      case 'home': return <div>Óvakodj a rotoni lomhatasaktól</div>
      case 'kombat': return <Kombat karakterek={list(page.category).map(i => load(i))} save={save} />
      case 'karakteralkoto': return <KarakterAlkotas save={saveKarakter} fajok={listFajok()} />
      case 'story': return <StoryPage story={loadStory()} saveStory={saveStory} />;
      case 'karakterlap': return <Karakterlap clone={clone} pancelok={listPancelok()} savePancelok={savePancelok} saveFegyverek={saveFegyverek} fegyverek={listFegyverek()} categories={categories()} karakter={load(page.karakter)} save={saveKarakter} remove={() => removeKarakter(page.karakter as Karakter)} />
    }
  };



  return (
    <div className="App">
      <PageHeader
        categories={categories()}
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
        karakter={page.page === 'karakterlap' ? page.karakter : undefined}
        page={page}
        setPage={ps => {
          setPage(ps);
          if (ps.page === 'kombat') {
            setCurrentCategory(ps.category);
          }
        }}
        save={saveKarakter}
        karakterek={list(currentCategory)}
        saveMese={saveStory}
      />
      {renderPage()}
    </div>
  );
}

export default App;
