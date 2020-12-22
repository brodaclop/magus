import React, { useCallback, useState } from 'react';
import { Kockadobo } from './pages/Kocskadobo';
import { KarakterAlkotas } from './components/KarakterAlkotas';
import { Karakterlap } from './pages/Karakterlap';
import { useDataConnector } from './hooks/dataconnector';
import { Karakter } from './engine/karakter';
import 'semantic-ui-css/semantic.min.css'
import logo from './static/magus.png';
import { Icon, Menu, Image, Modal, Button, Dropdown } from 'semantic-ui-react';
import DragAndDrop from './components/DragAndDrop';

type PAGES = 'home' | 'karakteralkoto' | 'karakterlap';

function App() {

  const [page, setPage] = useState<PAGES>('home');
  const { save, list, load, categories, remove } = useDataConnector();
  const [karakter, setKarakter] = useState<Karakter>();
  const [kockaOpen, setKockaOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('');

  const saveKarakter = useCallback((karakter: Karakter) => {
    setKarakter({ ...karakter });
    save(karakter);
    setPage('karakterlap');
  }, [save, setKarakter, setPage]);

  const removeKarakter = useCallback(() => {
    if (karakter) {
      remove(karakter);
      setKarakter(undefined);
      setPage('home');
    }
  }, [karakter, setKarakter, setPage, remove]);

  const renderPage = useCallback(() => {
    switch (page) {
      case 'home': return <div>Óvakodj a rotoni lomhatasaktól</div>
      case 'karakteralkoto': return <KarakterAlkotas save={saveKarakter} />
      case 'karakterlap': return <Karakterlap karakter={karakter as Karakter} save={saveKarakter} remove={removeKarakter} />
    }
  }, [page, saveKarakter, karakter, removeKarakter])

  const renderHeader = useCallback(() => {
    const karakterek = list(currentCategory);
    const kategoriak = categories();
    return <Menu tabular>
      <Menu.Item header>
        <Image src={logo} size='mini' />
      </Menu.Item>
      <Dropdown item text={`Karakterek: ${currentCategory || 'Összes'}`}>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setCurrentCategory('')}>Összes</Dropdown.Item>
          {kategoriak.map(k => <Dropdown.Item onClick={() => setCurrentCategory(k)}>{k}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
      {karakterek.map(k => <Menu.Item active={k.id === karakter?.id} name={k.name} onClick={() => { setKarakter(load(k)); setPage('karakterlap') }}>
      </Menu.Item>)}
      <Menu.Item active={page === 'karakteralkoto'} onClick={() => { setKarakter(undefined); setPage('karakteralkoto') }}>
        <Icon name='plus' />
      </Menu.Item>
      <Menu.Item position='right'>
        <DragAndDrop
          dragPlaceholder={<Button circular as='div' color='green'><Icon name='upload' />Import</Button>}
          handleDrop={async l => {
            const text = await l.item(0)?.text();

            if (text) {
              save(JSON.parse(text));
            }
          }}>
          <Button circular basic as='div' color='green'><Icon name='upload' />Import</Button>
        </DragAndDrop>
        <Modal trigger={<Button primary>Kocka</Button>} onOpen={() => setKockaOpen(true)} onClose={() => setKockaOpen(false)} open={kockaOpen}>
          <Modal.Content>
            <Kockadobo />
          </Modal.Content>
        </Modal>
      </Menu.Item>
    </Menu>
  }, [setPage, page, list, load, karakter, setKarakter, kockaOpen, setKockaOpen, categories, currentCategory, setCurrentCategory, save]);

  return (
    <div className="App">
      {renderHeader()}
      {renderPage()}
    </div>
  );
}

export default App;
