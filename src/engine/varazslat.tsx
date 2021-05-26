export interface Varazslat {
    name: string;
    pont: string;
    misc?: {
        erosseg?: string;
        sebzes?: string;
        idotartam?: string;
        me?: string;
        hatotav?: string;
    };
    varazslasIdeje: string;
    labels: Array<string>;
    description: string;
}

export const PSZI_PYARRONI: Array<Varazslat> = [
    {
        name: 'Emlékfelidézés',
        pont: '1',
        misc: {
            me: 'M',
            idotartam: 'Lásd a leírásban',
        },
        varazslasIdeje: '2 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description:
            `A diszciplína helyszínek, szövegek, vagy események meg­jegyzésében, illetve régi - egyébként már elfelejtett - emlékek felidézésében nyújt segítséget. Ha a Ψ-alkalmazó valamit szeretne úgy az elméjébe vésni, hogy arra később - minden részletében ­visszaemlékezzen, akkor rövid (két körig] tartó meditációval  mintegy beleégeti a kívánt dolgot az agyába.

Ezek után az emlék még három éven át tökéletesen tisztán él  benne, s minden különösebb erőfeszítés (vagy diszciplína alkalmazása) nélkül felidézhető. Az emlék  há­rom év múltán ugyanúgy halványodni kezd, mint egy nem efféle beégetéssel szerzett kép.

Ha a Ψ-alkalmazó olyan emléket kíván felidézni, melyet nem a fenti módon tárol agyában, akkor a  diszcip­lína használatával erre is mód nyílik. Az így felidézett emlék 10 körig tökéletesen éles lesz, ám  utána semmivé válik, s csak a diszciplína újbóli alkalmazásával kerül elő megint.
        
Mesterfokú alkalmazás esetén nem csak saját ma­gunkban idézhetünk fel emléket, hanem másokban is.`
    },
    {
        name: 'Ébredés',
        pont: '-',
        misc: {
            me: 'M',
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A Ψ-alkalmazó képes beprogramozni magát arra, hogy egy  meghatározott időben minden külső befolyás nél­kül felébredjen. Az  önszuggesztiónak vagy arra kell irá­nyulnia, hogy mennyi idő  múlva szakadjon ki az álomból, vagy egy külső jelhez kell  kapcsolódnia. Mivel az érzék­szervek alvás alatt is működnek ­noha normális esetben a gyenge ingereket a tudat figyelmen  kívül hagyja - a disz­ciplína alkalmazója olyasféle jeleket határozhat  meg ébre­dési pontnak, mint hajnali kakasszó, az Éjközép teljes  sö­tétje, lova ideges horkantása, stb.
        
        A diszciplína nem működik, ha a karakter elájult, ká­bítószeres  álomba merült, vagy valamely mentális támadás hatására  kapcsolt ki tudata. Az alkalmazáshoz legalább egy Ψp-tal kell  rendelkeznie.`
    },
    {
        name: 'Érzékélesítés',
        pont: '2/érzék',
        misc: {
            me: 'M',
            idotartam: '1 kör',
        },
        varazslasIdeje: '2 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A Pszi-energiák lehetőséget nyújtanak arra, hogy fel­haszná­lásukkal az alapvető öt érzékszerv hatásfokát növel­jük vagy  csökkentsük. A diszciplína arra ad módot, hogy a látást, hallást,  szaglást, tapintást és ízlelést akaratunk szerint befolyásoljuk.
        
        A Látás befolyásolásával nemcsak élesíthetjük a szemet (esetleg  elhomályosíthatjuk), hanem lehetőségünk nyílik a Megzavarására  is. A látás élesítésével legfeljebb megkétszereződik a látótávolság,  tompításával azonban vakság is okozható.
        
        Megzavarás esetén a szem nem tud kellőképpen fó­kuszálni,  így felléphet kettőslátás, esetleg a távolság, vagy egy közeledő  tárgy, lény sebességének felmérése okozhat problémát. A valóságtól  való eltérés 10% és 60% között mozoghat. (Kiszámítása: 1 K6,  majd az eredmény megszor­zandó 10-zel.)
        
        A Hallás élesítése kétszeresére növeli a hallótávolsá­got, míg  tompítása akár süketséghez is vezethet.
        
        Megzavarásakor a hangok távolságát, esetleg irányát véti el  a befolyásolt lény. Az eltérés és a kiszámítás módja megegyezik  a Látás befolyásolásánál leírtakkal.
        
        A Szaglás, a Tapintás, és az Ízlelés felerősítése meg­kétszerezi  ezen érzékszervek hatásfokát. Tompításuk az ér­zékek teljes  kikapcsolásával is járhat. Megzavarásukkal el­érhetjük, hogy más  szag, anyagi minőség (esetleg hőmér­séklet), vagy íz érződjék. A  Megzavarás mértékének el­döntése a Kalandmester feladata.
        
        FIGYELEM!
        A diszciplína nem alkalmas arra, hogy bármely ér­zékszerv  befolyásolásával valós kárt okozzon. Pl.: Nem le­het a hőérzetet  annyira fokozni, ami Fp veszteséggel jár.
        A diszciplína végrehajtása érzékszervenkét 2 Ψp-ba kerül, és  hatását 1 körig fejti ki. 4 Ψp-ért két érzékszervet lehet befolyásolni  1 körig, vagy egy érzékszervet 2 körig, stb.`
    },
    {
        name: 'Fájdalomcsillapítás',
        pont: '1/Fp',
        misc: {
            me: 'A',
            idotartam: 'végleges',
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A diszciplína segítségével az agy fájdalomközpont­jára gyako­rolhatunk hatást. Lehetőség nyílik fájdalomérzet tompítására vagy  keltésére. Miután nem gyógyít vagy okoz valódi sebesüléseket, az  Életerő Pontokra nincs befolyással. Csak Fp-ot adhatunk vissza,  vagy vehetünk el. Az Fp-ok teljes elvonásával - 0 Fp-ra kínzás ­elérhetjük, hogy az áldo­zat elájuljon, ám igazi seb ekkor sem  keletkezik rajta. Ma­ximum Fp fölé sem önmagunkat, sem másokat  nem juttat­hatunk, bármennyi Ψp-ot is áldoznánk rá. Asztráltesttel  nem rendelkező lényekre a diszciplína nem működik.`
    },
    {
        name: 'Hatodik Érzék',
        pont: '5',
        misc: {
            idotartam: '60 kör',
        },
        varazslasIdeje: '5 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A Hatodik Érzék az agy azon különleges képességét használja  fel, mely lehetővé teszi, hogy az idő szövedékén átszűrődő  eseménymozaikokat összerendezve megérezze a közeljövőben  bekövetkező történések irányát.
        
        A diszciplína alkalmazója megérzésekhez juthat az időtartam  alatt. Ezek a megérzések semmiféle pontossággal nem bírnak,  csupán egy hamarosan bekövetkező eseményre figyelmeztetik a  karaktert. A megérzések lehetnek jó, vagy rossz előjelűek.
        
        Rossz előérzetet kelt minden olyan történés, mely ártalmas  lehet, vagy gonosz szándékkal cselekedték.

        Jó előérzethez juthat a diszciplína alkalmazója, ha az idő­tartam alatt semmiféle baj nem történik vele, illetve a rá váró  események a javára válnak.

        A Hatodik Érzéknek két alkalmazási módja lehetsé­ges. Az  első esetben a karakter csupán általánosságban kí­váncsi az  időtartam alatt bekövetkező események rá vonat­kozó előjelére.  Ennek tipikus példája, ha a karakter egy sö­tét barlang szájánál  megtorpanva alkalmazza a diszciplínát. Amennyiben a barlang­ban ellenséges lények lapulnak, akik valamilyen módon a  biztonságára törnek a diszciplína hatá­sának időtartama alatt,  akkor a karaktert Rossz Előérzet fogja el. Nem tudja az okát, sőt,  a leselkedő veszedelem mértékét és pontos irányát sem ismeri,  csupán arról szerez tudomást, hogy valami vár rá. Belépve a  barlangba fokozó­dik Rossz Előérzete - ahogy az időben egyre  közeledik az ártalmas esemény -, majd a baj közvetlen megtörténte  előtt egy pillanattal megérzi irányát is. Ha ez egy támadás volt,  már nem érte a diszciplína alkalmazóját váratlanul, s ebben az  esetben az ellenséges akció nem minősül Meglepetésnek.

        A Hatodik Érzék másik alkalmazási módja, ha a ka­rakter  arra kíváncsi, hogy egy általa végrehajtott cselek­mény milyen  hatással jár rá nézve. Ilyenkor a diszciplína alkalmazása után  megkérdezheti Kalandmesterét, hogy mi­lyen előérzetei vannak,  érdemes-e megtenni, amire készül. A válasz minden esetben csak  annyi, hogy jó vagy rossz ér­zések ébrednek benne. Indoklás sosincs.  Jellemző helyzet, amikor karakter egy sírt kíván kibontani.  Végrehajtja a diszciplínát, s megkérdezi a Kalandmesterét érzeteiről.  Ha a sírban élőhalott fekszik, a karakternek Rossz Előérzetei  tá­madnak. Ha a sírban semmi sincs (legfeljebb egy porladó tetem),  vagy a koporsó mélyén kincs hever, a karakterben )ó Előérzetek  ébrednek.

        A diszciplína 5 Ψp-ért 60 körig (azaz tíz percig) en­gedi efféle  korlátozott módon a jövő titkainak felfedését. 10 Ψp felhasználásával  az időtartam megduplázódik, stb.

        A Hatodik Érzék csak alapfokon működik, mester­foka nincs. `
    },
    {
        name: 'Képességjavítás',
        pont: 'lásd a leírásban',
        misc: {
            me: 'M',
            idotartam: '6 kör',
        },
        varazslasIdeje: '2 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `Olykor - különleges veszélyhelyzetekben - az emberi fizikum  látszólag csodákra képes. Egy vadállattól megré­mült gyermek  hihetetlen gyorsasággal képes felkúszni egy sudár, ág nélküli fa  törzsén, s miután a veszély elmúlt, nemcsak azon csodálkozik,  hogy miképp sikerült ez neki, hanem gyakorta lemászni sem tud  magától. Ez jellemző példája a Ψ akaratlan megnyilvánulásának,  hiszen ilyenkor az agy szabadít fel a testben olyan erőforrásokat,  melyek egyébként nem hozzáférhetőek.
        
        A diszciplína ugyanezt képes végrehajtani, termé­szetesen a  tudat teljes irányítása alatt. A Ψ erők segítségével a fizikai képességek  - kivéve a Szépséget - megváltoztat­hatóak. A változtatás időleges,  s a diszciplína hatásának el­múltával visszatérnek az eredeti értékek.  Ugyanakkor lehe­tetlent nem szabad elvárnunk a Ψ-től sem: egyik  képessé­günket sem emelhetjük 20 fölé.
        
        FIGYELEM!  
        Bármely képesség nullára - vagy nulla alá - csök­kentése azonnali  halálhoz vezet.

        A Képességjavítás az egyik legkedveltebb Általános Disz­ciplína. Gyakorta használják a Méregellenállás - az Egészség tíz  feletti része - megnövelésére. Valójában igen hasznos minden  olyan esetben, amikor Képességpróbára kényszerülünk, hiszen  az adott pillanatban valóban erőseb­bek, gyorsabbak, egész­ségesebbek vagy ügyesebbek le­szünk. Nem szabad elfelejteni,  hogy ha harc folyamán megnöveljük egészségünket - és egy  csapást csak az így nyert Ép-okkal éltünk túl -,amint a disz­ciplína hatása elmú­lik, a nyert Ép-k is semmivé lesznek, s ebbe  akár bele is halhatunk.

        Ha Rontással az ellenfelünk Egészségét annyira le­csökken­tettük, hogy ettől elveszíti maradék Ép-jait, akkor meghal. Hiába  jönnének vissza az Ép-ok a diszciplína hatá­sának megszűntével,  a lélek nem költözik vissza a halott testbe.

        <table>
            <tr>
                <td>+/- módosítás az eredeti képesség­hez képest</td>
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
                <td>6</td>
            </tr>
            <tr>
                <td>Szükséges Ψp</td>
                <td>1</td>
                <td>2</td>
                <td>4</td>
                <td>8</td>
                <td>16</td>
                <td>32</td>
            </tr>
        </table>

        A táblázatban feltüntetett Ψp értékek a diszciplína alap idő­tartamára (6 kör) vonatkoznak. A felhasznált Ψp-ok megdup­lázásával a hatás időtartamának megduplázását ér­hetjük el,  megtriplázásával a hatás ideje megháromszorozó­dik, és így tovább.        
        `
    },
    {
        name: 'Roham',
        pont: '1/+2TÉ',
        misc: {
            me: 'A',
            idotartam: '1 támadás',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A diszciplína alkalmazója egyetlen csapásra össz­pontosítva,  teste és elméje minden tartalékát kiadja egy lerohanásszerű  támadásban. Az alkalmazó mély, torok­hangú kiáltás kíséretében  hajtja végre a rohamot.
        
        A diszciplína felemészti az alkalmazó összes aktuális Ψp-ját,  beleértve a Dinamikus Pajzsban tároltakat is. Ez azt jelenti, hogy  a támadó kénytelen felhasználni minden Ψp-ot, amivel rendelkezik,  s az ebből nyert energia hozzáadó­dik a Támadó Értékéhez.  1 Ψp +2 TÉ-t jelent. (Azaz 5 Ψp felhasználása esetén + 10 van a  TÉ-n.)

        Amennyiben az ellenfél nem ugyanezt a diszciplínát alkalmazza,  a kezdeményezés automatikusan a Roham al­kalmazóját illeti,  kezdeményező dobás nélkül.

        Megfékezés esetén a diszciplína végrehajtója ezzel a mód­szerrel megakasztja, megzavarja támadóját, az elveszíti kezde­ményezését és a fenti módon kiszámított érték levonó­dik a Támadó  Értékéből.

        Ez a diszciplína olykor igen hasznos lehet, ám nem szabad  figyelmen kívül hagynunk veszélyét: agyunk feltöl­tődéséig képtelenek  leszünk bármiféle Ψ-alkalmazásra és elménket is csak a Statikus  Pajzs védi.
        `
    },
    {
        name: 'Telekinézis',
        pont: '2/1kg',
        misc: {
            idotartam: '1 kör',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `Agyi energiáink segítségével kisebb tárgyakat moz­gathatunk  látótávolságon belül. Elfordíthatunk a zárban egy kulcsot, a tőlünk  távol heverő fegyvert magunkhoz húzhat­juk, vagy észrevétlen  elcsenhetünk az ékszerészmúhelyből némi drágaságot. A diszciplína  alkalmazása taglejtéseket nem igényel, pusztán a mozgatni kívánt  tárgyon kell tartani tekintetünket. Amint elfordulunk, vagy valami  eltakarja a tárgyat, az mozdulatlanná válik, esetleg - ha a levegőben  volt - lepottyan. A Telekinézis csak lassú mozgatásra alkal­mas  - egy futó ember sebességénél nagyobbat nem érhetünk el vele ­ezért ilyen módon fegyvert dobni, vagy sebesülést okozni szinte  lehetetlen.
        
        A diszciplína kifejti hatását mágikus tárgyakra is.

        2 Ψp felhasználásával 1 kg súlyú tárgy mozgatható 1 körig. 4  Ψp rááldozásával mozgathatunk 1 kg-os tárgyat 2 körig, vagy 2  kg-ot 1 körig, stb.
        `
    },
    {
        name: 'Telepátia',
        pont: 'lásd a leírást',
        misc: {
            me: 'M',
            idotartam: 'lásd a leírást',
        },
        varazslasIdeje: '3 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        Az egyik legősibb Ψ-alkalmazás, más néven Gondo­latátvitel.  Az Általános Diszciplínák azon kivétele, mely igazán csak  mesterfokon használható. Segítségével gondo­lati úton lehet  beszélgetni, vagy a Ψ-alkalmazó által felidé­zett képeket közölni.  A Telepátia csak Ψ képzettséggel ren­delkezők között működik.  Alapfokon a Ψ-alkalmazó nem tud beszélgetést kezdeményezni,  sőt válaszolni sem, csupán a hozzá intézett gondolati üzenetet  képes venni.

        A diszciplína mesterfokú alkalmazása ad módot arra, hogy a  Gondolatátvitelt megindítsa, és - két mesterfokú al­kalmazó ese­tében - válaszoljon a kérdésekre.

        A Telepátia alkalmazásához a Gondolatátvitel meg­kezdőjének  tökéletesen ismernie kell a gondolatokat fogadó személyt - ebben  az esetben a távolság nem számít -, vagy látnia kell azt.

        Amennyiben a Telepátiában résztvevők látják egy­mást, csupán  2 Ψp-ba kerül az 1 körig tartó gondolatátvitel. Ha nem látják  egymást 1 szegmensenként kerül 1 Ψp-ba. A Ψp-ok növelésével  egyenlő arányban növelhető a diszcip­lína időtartama is.

        Egyszerre legfeljebb két elme kapcsolható össze Te­lepátiával,  tehát a gondolati úton történő beszélgetésbe nem lehet harmadik  részről sem beleszólni, sem azt lehallgatni.

        Az egyetlen olyan diszciplína, mely megtalálja a módját,  hogy hatása átszivárogjon a Statikus Pajzson, noha a Dinami­kus Pajzs ezt is feltartóztatja. Ha egy efféle pajzsot vise­lőnek küldenek Telepátiával üzenetet, az csak azt fogja érzé­kelni, hogy kapcsolatot keresnek vele, ám a beszélgetés csu­pán a fogadó Dinamikus Pajzsának lebomlása után jöhet létre.

        A Telepátia mindig csak annak a Ψ-alkalmazónak ke­rül Ψp­-ba, aki a gondolati közlést kezdeményezte.
        `
    },
    {
        name: 'Testhőmérséklet n/cs',
        pont: '1/5 °C',
        misc: {
            me: 'M',
            idotartam: '1 óra',
        },
        varazslasIdeje: '6 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `A diszciplína alkalmazója képes saját - mesterfokon más ­testének hőmérsékletét növelni vagy csökkenteni. Így lehetősége  nyílik a vizes ruhát megszárítani magán, vagy egy lángoló házból  kimenekülni égési sérülések nélkül. Minden felhasznált Ψp 5 fokkal  képes megváltoztatni a testhőmérsékletet.
        
        Az ötven fok fölé növelt testhő hat kör múltán ájulást eredményez,  hosszabb távon halállal jár. A húsz fokra csökkentett hőmérséklet  Tetszhalálhoz vezet - ilyen formán még egy felkészületlen szervezet  is képes életben maradni néhány hónapig -, a húsz fok alá  csökkentett testkő mara­dandó egészségkárosodással jár, míg a  negyedórát megha­ladó öt fok alatti állapot visszafordíthatatlan  folyamattá vá­lik, és az áldozat meghal.

        A diszciplína lehetőséget ad arra, hogy 1Ψp-ért 5 fokkal eltérő  hőmérsékletet 1 óráig fenntartsa, 2Ψp-ért az 5 fokos befolyásolást  2 óráig, vagy a 10 fokos változtatást 1 órán keresztül biztosítsa,  stb.
        `
    },
    {
        name: 'Pszi-lökés',
        pont: '1/1 kg',
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        Más nevén Energialökés. A mágiához legközelebb álló, alapvető  diszciplína. Használata során a Ψ-alkalmazó kis mennyiségű mágikus  energiát gyűjt magába, ám mivel tárolására nem készíti fel a  módszer, azonnal ki is áramlik belőle. A Ψ-lökés irányítható, gyenge szél fuvallat formájá­ban nyilvánul meg. Taszító ereje felhasznált  Ψp-onként 1 kg. Apróbb dolgok felborítására, arréb lökésére  szokták használni, olykor-kellő erővel alkalmazva - tárgyak vagy emberek egyensúlyi helyzetét lehet megszüntetni  vele.
        `
    },
    {
        name: 'Pszi-ostrom',
        pont: 'min 1',
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A tudat védelmére felépített Ψ-pajzsok megsemmi­sítésére szolgáló  diszciplína, mely csak mesterfokon alkal­mazható. Két különböző  típusa létezik: a Ψ-rombolás és Ψ-bontás.
        
        A Ψ-rombolással a Statikus Pajzsokat lehet meg­szüntetni. A  Statikus Pajzsok nem bonthatóak Ψp-onként - egyszerre kell  lerombolni őket. Ez a következőképp törté­nik:
        
        A diszciplína alkalmazója meghatározza, hogy a Ψ-romboláshoz  hány Ψp-ot kiván felhasználni. Ennyi lesz a Rombolás erősítése.  Ha ez nagyobb (egyenlő), mint a Stati­kus Pajzs erősítése, akkor a  Statikus Pajzs megszűnik, s a pajzshoz felhasznált energia semmivé  válik. Amennyiben a Ψ-romboláshoz valaki kevesebb Ψp-ot használ,  mint amennyiből a Statikus Pajzsot felépítették (legyen az asztrális  vagy mentális), akkor a pajzs teljes erősítéssel megmarad, míg a  Romboláshoz felhasznált Ψp-ok elvesz­nek. A Ψ-rombolás nem árt  a Dinamikus Pajzsoknak.
        
        A Dinamikus Pajzsok kiiktatására a Ψ-bontás szol­gál.  Segítségével akár Ψp-onként is bontható a Dinamikus Pajzs.  Ilyenkor a Bontáshoz felhasznált Ψp-ok mennyiségé­vel meg­egyező Ψp bomlik le a Dinamikus Pajzsból. Ψ-bon­tással nem  támadható a Statikus Pajzs.
        
        Egy 10 Ψp erősségű Statikus Pajzs, csak egy, leg­alább 10 Ψp  erősségű (vagy nagyobb) Ψ-rombolással sem­misíthető meg.  Ekkor a pajzs viselője (a pajzs építéséhez felhasznált, ám az  aktuális Ψp-jaiba nem beleszámító) és a Rombolás alkalmazója  (a Romboláshoz felhasznált) Ψp-jalt is elveszíti. Ha a Ψ-rom­
        
        boláshoz kevesebb, mint 10 Ψp-ot használtak, a Statikus Pajzs  teljes erősítéssel megmarad, míg a Romboláshoz igénybe vett  Ψp-ok elvesznek.
        
        Egy l0 Ψp nagyságú Dinamikus Pajzs lebontható 1, 2 vagy 3  Ψp-onként, de Felhasználtató egyszerre 10 vagy több Ψp is. A Dinamikus Pajzs mindig elveszít annyit az erősségéből, ahány  Ψp erősségű a Bontás. Persze, ha már nincs pajzs, a Romboláshoz  vagy Bontáshoz felhasznált Ψp-ok elvesznek, hiszen ugyanúgy  levonódnak az aktuális Ψp számából, mintha lett volna pajzs.
        
        A Ψ alapfokú alkalmazói nem érzékelik, ha egy elmét pajzsok  védenek. Mesterfokon már gyenge (Ψp-ot nem igénylő) kon­centrációval megállapítható, ha a tudatot övezi valamiféle vé­delem. Azt azonban, hogy Statikus vagy Dinamikus Pajzsok  működnek, csak a Kyr metódus alkalmazói tudhatják (lásd Kyr  Diszciplínák, Auraérzékelés).
        
        A Ψ-ostrom folytatója következtethet a pajzsok típusaira, hiszen  pontosan érzékeli, ha az Ostrom valamely fajtája sikerrel jár, vagy  ha a felhasznált energiák nem ütköznek ellenállásba.        
        `
    },
    {
        name: 'Pszi-pajzs, Dinamikus',
        pont: 'min 1',
        misc: {
            idotartam: 'lásd a leírást'
        },
        varazslasIdeje: '30 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A Statikus Pajzsokra építhető egyetlen újabb védelmi réteg,  az úgynevezett Dinamikus Pajzs. A 30 körig tartó meditáció után  a Dinamikus Pajzs megmarad mindaddig, amíg az alkalmazó  meg nem szünteti, vagy Ψ-ostrommal le nem bontják. Felépítése után - ellentétben a Statikus Pajz­zsal - bármikor további Ψp-ok  adhatóak hozzá (azaz erősíthető), vagy vonhatóak el belőle. Ez  minden alkalom­mal 1 körig tartó, rövid, meditatív koncentrációt  igényel. Erőssége minden esetben megegyezik az éppen benne  tárolt Ψp-ok mennyiségével, ám az aktuális Ψp-ok számánál  so­sem lehet több. A Dinamikus Pajzsokban tartott Ψp-ok  be­leszámítanak a karakter aktuális Ψp-jaiba, azaz az asztrális  és mentális Dinamikus Pajzsban működő Ψp-ok és a disz­ciplínákra  Felhasználható pontok összessége a Karakter max. Ψp-ja.

        Fenntartása folytonos, gyenge koncentrációt igényel, amire a  Ψ-alkalmazó szinte bármely esetben képes - kivéve, ha alszik,  eszméletlen, vagy bármely egyéb okból öntudat­lan. Ha az elmét  valamilyen erős sokk éri, akárcsak egy pillanatra is, vagy a tudatot  megbénítják, a Dinamikus Pajzs rögtön lebomlik.

        A Dinamikus Pajzsnak éppen úgy két formája létezik, mint  a Statikusnak (asztrális és mentális), és erőssége is ép­pen úgy  adódik hozzá a ME-hoz. Előnye a Statikus Pajzs­hoz képest,  hogy a benne tárolt Ψ-energia bármikor hozzá­férhető, s fel­használható egyéb diszciplínák alkalmazásához vagy Ψ-ostrom  folytatásához. Hátránya, hogy a Dinamikus Pajzs lebontásával  a támadó nem csak közelebb jutott az elméhez, hanem az  alkalmazót, a diszciplínákra felhasznál­ható Ψp-jai nagyrészétől  (a Dinamikus Pajzsban tároltaktól) is megfosztotta.

        Dinamikus Pajzs más elméje köré nem építhető.
        `
    },
    {
        name: 'Pszi-pajzs, Statikus',
        pont: 'min 1',
        misc: {
            idotartam: 'lásd a leírást'
        },
        varazslasIdeje: '90 kör',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A Ψ pajzsok hivatottak megvédeni az  elmét a mági­kus és Pszi befolyások ellen. A  alkalmazó agyi energiáiból erőteret épít tudata köré, melyen a tudati támadások  fenna­kadhatnak. A Statikus Prajzs egyfajta  állandó védelem, ami mindaddig óvja a  tudatot, amíg azt az alkalmazó meg nem  szünteti, vagy valaki le nem Rombolja.

        A Statikus Pajzs erőssége annyi, ahány  Ψp-ból épí­tették. Gyakorlati hatása ab­ban nyilvánul meg, hogy a pajzs erősségét  hozzáadjuk a Tudatalatti Mágiaellenál­ láshoz és így dobjuk az ME-t. Két különböző típusú Statikus  Pajzs létezik: asztrális és mentális. Az Asztrális Pajzs az asztrális  támadások ME-ához adódik hozzá, míg a Mentális Pajzs a mentális  ME-hoz.

        A Statikus Pajzs, miután felépült, többé nem befolyá­solható: Ψp-okot sem elvonni, sem hozzáadni nem lehetsé­ges.  Védő hatását akkor is kifejti, ha a Ψ-alkalmazó alszik, esz­méletlen, vagy bármely egyéb okból öntudatlan, hiszen immár  az elmétől függetlenül működik. Lebontani is csak újabb  kilencven körön át tartó meditációval lehet vagy Ψ-ostrommal  (lásd Általános Diszciplínák, Ψ-ostrom).

        A Statikus Pajzshoz felhasznált Ψp-ok a későbbiek­ben nem  számítanak bele az aktuális Ψp-ok számába. Ez azt jelenti, hogy  az alkalmazó megteheti, hogy egy békés napon az összes Ψp-ját  Statikus Pajzsok emelésére fordítja, majd pihenés után ismét  maximális Ψp-jaira támaszkodhat - noha tudatát már védik) a  Statikus Pajzsfok). Minden elme köré legfeljebb egy asztrális és egy  mentális Statikus Pajzs épít­hető.

        Statikus Ψ-pajzs, mesterfokú alkalmazással bárki el­méje köré  (nemcsak ember, de lélekkel rendelkező állat) építhető, ám a  más elme köré épített pajzs, akárki építette is (harcművész,  kardművész vagy varázsló), bárki által alkal­mazott Ψ-ostrommal  lerombolható.
`
    },
    {
        name: 'Membrán',
        pont: '10',
        misc: {
            idotartam: 'végleges'
        },
        varazslasIdeje: '5 perc',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A membrán a Statikus Ψ-pajzs egy változata. Éppúgy körbevehető vele az elme, működtetésére többé nem kell Ψ-pontot áldozni, s lerombolni is csak ahhoz hasonlóan, Ψ-ostrommal lehet.

        A Membrán nem védi az elmét, hanem figyelmezteti a rá irányuló passzív Ψ-tevékenységre. A membrán felépítője megérzi, ha huzamosabb ideig figyelik, s azt is meg tudja határozni, merről. Azonnal tudomására jut, ha Asztrál vagy Mentál Szemmel rápillantanak. Természetesen akkor is nyomban riaszt, ha asztrál vagy mentál varázslattal próbálnak hatni a viselőjére. Ha a Ψ-használó nem a saját, hanem más elméjét övezi Membránnal, bármilyen távol tartózkodjék is, tudomására jut, ha a viselőre a fent említett mágikus módszerekkel hatnak.

        A membrán magától soha nem vész el, csak felépítője képes lebontani, vagy 10 E erősségű Ψ-ostrom.
`
    },
    {
        name: 'Csettintés',
        pont: 'lásd a leírásban',
        misc: {
            idotartam: 'egyszeri'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A diszciplina alapvető képessége minden Ψ-használónak. Oly kevés mentális energia használódik el alkalmazásakor, hogy Ψ-pontban nem mérhető, ezért a Csettintésre nem kell Ψ-pontot áldozni. Egyszerre egyvalakivel szemben használható, mindössze annyi történik, hogy az illető tudomást szerez a diszciplina alkalmazójáról. A hatás hasonló ahhoz, mint amikor egy csendes teremben valaki csettint. A "csettintést" csak a kiszemelt "áldozat" hallja, nem tudja, kitől származik, de tudja, milyen irányban keresse őt. Tapasztalatlan emberek első reakciója feltétlenül az, hogy az alkalmazó irányába, netán rápillantanak.
        A Csettintés csak azzal szemben használható, akit az alkalmazó lát.
`
    },
    {
        name: 'Összpontosítás',
        pont: '1/Ψ-használati szint',
        misc: {
            idotartam: '1 kör'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A diszciplina legtöbb 1 kör időtartamig egyetlen adott feladat megoldására elegendő misztikus, belső erővel ruházza fel alkalmazóját. Az illető ezáltal képes lesz olyan próbatételek sikeres végrehajtására, melyekre egyébként álmában sem lenne alkalmas. 1 Ψ-pont felhasználásával +1-gyel, százalékos próba esetén +5%-kal növelheti az esélyeit. Egyszerre legtöbb annyi Ψ-pontot képes felhasználni ilyen célra, amennyi a Ψ-használati Szintje.

        Mivel az 1 teljes körig tartó összpontosítás után az első tevékenység maga a próbatétel kell legyen, a diszciplina aligha használható közelharcban. Annál inkább lesből leadott, célzott lövésben (+5 CÉ/Ψ-pont azaz Ψ-használati Szint).

        A diszciplina különlegessége, hogy egyes Ψ-t nem ismerő íjászok is alkalmazzák, esetükben Ψ-pont felhasználása nélkül, +5 CÉ/Tapasztalati Szint mértékben.
`
    },
    {
        name: 'Abszolút Látás',
        pont: '8',
        misc: {
            idotartam: 'végleges'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A diszciplina alkalmazója nem anyagi testének tökéletlen látószervén, a szemen keresztül lát, hanem sokkal kifinomultabb lelki szemét használja. Ezáltal egyszerre nem csak egy irányba nézhet, hanem teljes körben - jobbra, balra, előre, hátra, fel és le - lát egyidejűleg; mi több, mindent élesen, hisz nem szükséges szemét a kérdéses távolságra fókuszálnia.

        Az Abszolút látás egyetlen hátránya a rövid látótávolság: csak 20 méter sugarú körön belül használható, azon túl minden teljes sötétbe borul. Az érintett területen azonban tökéletesek a látási viszonyok, függetlenül a fényviszonyoktól - azaz teljes sötétségben is minden látható. Az Abszolút látással sem pillanthatóak meg ellenben a láthatatlan tárgyak, a rejtőző emberek vagy takarásban lévő dolgok; ahogyan a mágikus sötétség is gátat szab használatának.

        Hátulütője is akad: az érintett területen belül a Szimbólumok, a Mágikus tekintet - és az összes látáson alapuló mágikus befolyás - azonnal kifejti hatását az alkalmazóra.

        Az Abszolút látás megértéséhez elvont gondolkodás szükséges, hiszen nehéz felfogni a fókuszálás nélküli teljes körívű látást a százhúsz fokos látótérhez szokott emberi elmének. Éppen ezért - az átállás miatt- igényel sok mentális energiát (Pszi-pontot) a diszciplina alkalmazása.

        Maga az Abszolút látás - a normál látáshoz hasonlóan - nem igényel Pszi-pontot, csak az átállás: a lelki szemre való átkapcsolás. Azaz az Abszolút látás bármeddig használható, míg csak alkalmazója vissza nem kíván térni a szokványos módszerhez; ekkor újra a diszciplinához kénytelen fordulni, hogy normál látását visszanyerje.

        Az Abszolút látás során a szem a semmibe réved, a szembéjak gyakorta le is csukódnak, így a hirtelen felvillanó éles fény - legyen bár mágikus - sem tehet kárt az alkalmazó látásában.

        Az Abszolút látás diszciplina magas mentális felkészültéset igényel, ezért - dacára annak, hogy az alkalmazó önmagára vonatkoztatva használja - alkalmazása Mesterfokú Pszi képzettséget igényel. Mivel az Abszolút látásban a szem nem játszik szerepet, a diszciplinát vakok és bekötött szeműek is alkalmazhatják. Harcban megszünteti a hátulról vagy félhátulról támadók előnyeit, s így kizárólag a "Harc több ellenfél ellen" módosítói érvényesülnek.
`
    },
    {
        name: 'Szinesztézia',
        pont: 'lásd a leírásban',
        misc: {
            idotartam: 'egyszeri'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A diszciplina alkalmazója képes Érzékközpontjában a látáshoz kapcsolni a más érzékszervein keresztül észlelt ingereket. Ily módon színes fénynyalábok formájában megpillanthatja a hangokat és a szagokat, s könnyűszerrel felismerheti forrásukat. Varázslók a Szinesztézia által a leplezetlen mágiát is megpillantják, mivel az derengő auraként világít a mágikus tárgy, személy, hely körül. Hatodik érzékkel együtt alkalmazva a diszciplina hasonló aurával leplezi le az alkalmazóját veszélyeztető tárgyat, ill. személyt.

        Nem szükségszerű, hogy éppen a látás legyen a kedvezményezett érzékszerv, ez csak az emberi és hozzá hasonló fajok esetében természetes, mivel ők leginkább a látásukra hagyatkoznak. Elviekben más érzékszerv használata is elképzelhető, bár ezt - úgy tudni - egyetlen pszi-mester sem oktatja és ismeri.

        A Szinesztézia alkalmazásakor minden érzékszerv ingerei más színben és erősségüktől függően egyre világosabb árnyalatban (egyre nagyobb fényerővel) jelennek meg. Általánosan a következő színek használatosak.

        <table>
            <tr>
                <td>Érzékszerv</td>
                <td>Szín</td>
                <td>Ψ-pont</td>
            </tr>
            <tr>
                <td>hallás</td>
                <td>sárga</td>
                <td>1</td>
            </tr>
            <tr>
                <td>szaglás</td>
                <td>zöld</td>
                <td>1</td>
            </tr>
            <tr>
                <td>mágia</td>
                <td>kék</td>
                <td>2</td>
            </tr>
            <tr>
                <td>hatodik érzék</td>
                <td>vörös</td>
                <td>3</td>
            </tr>
        </table>

        A Ψ-pont rovat megmutatja, mennyi Pszi energiát emészt fel az adott érzékszerv látáshoz kapcsolása 1 körre. Több érzék együttes átkapcsolásakor az értékek összeadódnak, az időtartam növelésekor pedig körönként többszöröződnek.
`
    },
    {
        name: 'Érzék-tisztítás',
        pont: '1/érzékszerv',
        misc: {
            idotartam: 'végleges'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-pyarroni'],
        description: `
        A diszciplina alkalmazója 1 Ψ-pontért megtisztíthatja egyik érzékszervét, melyet a korábbi nagy erejű ingerek eltompítottak. Verőfényről a barlang sötétjébe lépve azonnal "hozzászoktatja" szemét a megváltozott fényviszonyokhoz; a fülsértő ricsajt követő csendben is kifinomultan hallgatózhat; egyetlen röpke pillanat alatt száműzheti orrából a korábbi bűz vagy illatfelhő szaglást bénító utóhatásait.
`
    },

]

export const PSZI_SLAN: Array<Varazslat> = [
    {
        name: 'Aranyharang',
        pont: '1/1 SFE',
        misc: {
            idotartam: '2 kör'
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A tudat test feletti tökéletes uralma nyilvánul meg ebben a  diszciplinában. Segítségével az alkalmazó képessé válik testét  élő páncéllá alakítani. Ezt izomzata átrendezésével, és Ψ-energáinak  erős kisugárzásával éri el. Az Aranyharang éppen olyan Sebzés  Felfogó Értéket ad alkalmazójának, mint bármilyen páncél - az így  nyert SFÉ megegyezik a felhasznált Ψp-ok számával. A diszciplína  az egyik legnehezebben elsajátítható és legveszedelmesebb Ψ­alkalmazási módszer. Éppen ezért az alkalmazó nem használhatja  korlátlanul: maximális mértéke megegyezik az alkalmazó Tapasztalati  Szintjével. Ez a gyakorlatban azt jelenti, hogy az Aranyharang  SFÉ-je sosem lehet nagyobb a diszciplínát használó Tapasztalati  Szintjénél (azaz egy 4. szintű Slan legfeljebb 4-es SFÉ-jű  Aranyharangot képes csinálni).
        
        1 Ψp-ért 1-es SFÉ nyerhető 2 körre, 2 Ψp-ért 2-es SFÉ 2 körre,  vagy 1-es SFÉ 4 körre, stb.`
    },
    {
        name: 'Belső idő',
        pont: '10',
        misc: {
            idotartam: '1 szegmens'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A Slan Pszi mentális alkalmazásának tökélyre vitele. A diszciplína  alkalmazója képes saját belső idejét annyira lelassítani, hogy minden  - a valóságban -1 szegmensnyi időt egy teljes körnek érzékel. Ez  lehetőséget nyújt az alkalmazónak, hogy az eseményeket jobban  végiggondolva mérlegeljen, s hogy az eltelt valós idő helyett a saját  belső ideje szerint alkalmazzon Ψ diszciplínákat. Mindemellett a  Slan-út Belső Ideje nemcsak a gondolati folyamatokat gyorsítja fel,  hanem a diszciplína használójának testét is, így az alkalmazónak  minden szempontból egy teljes köre van cselekedni-akár harcolni is  -, míg a külvilág számára csupán 1 szegmens telik el.
        
        A külső szemlélő érzékei szinte követhetetlen gyorsaságúnak  találják a diszciplína alkalmazóját- az Időtartam alatt a Kezdeményezés  minden esetben a Belső Idővel felgyorsított Slant illeti meg. A  használat során az alkalmazó képes kitérni a mágikus lövedékek  elől, a rálőtt nyílvesszőket akár puszta kézzel is megfoghatja, és  lehetetlen meglepetésszerű támadást intézni ellene.
        
        10 Ψp felhasználásával a valós idő 1 szegmense lassítható le,  20 Ψp-ért már két szegmens, stb.        `
    },
    {
        name: 'Chi-harc',
        pont: '1/kör',
        misc: {
            idotartam: 'lásd a leírást'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A Chi-harc nem más, mint a harc- vagy kardművész azon  tudása, mely segítségével a belső energiáit harc közben a teste  szolgálatába állíthatja. Ettől lesz több minden egyéb puszta­kezes verekedőnél és fegyverhasználónál - ez a harc művészete.  Az alkalmazás közben mozdulatai csiszoltabbá, pontosabbá  válnak, saját belső ideje lelassul. Ütéseiben nemcsak izomzatának  ereje és testének súlya nyilvánul meg, hanem felszabadított  tudati energiái is. A harcművész puszta keze - ha úgy kívánja  - a legélesebb karddal lesz egyenértékű, vagy buzogányként  zúz. A kardművész eggyé válik fegyverével, mintegy saját  végtajaként érzékeli azt.
        
        A Chi-harc folyamán nem lehet meglepni az alkalmazót, és  lehetetlen olyan módon harcolni, hogy az ellenfél csak ártalmatlanná  váljon (lásd Harc, Harc az ellenfél ártalmatlanná tételéérte. Használat  során az alkalmazó vonásai összpontosításról árulkodnak, arca  kifejezéstelen kőmaszknak hat, tekintete maga elé mered, hiszen  nem csak a szemére, hanem érzékeinek együttesére hagyatkozik.  Mondják, a Slan-ek az effajta állapotot a Sárkány ébredésének  nevezik.
        
        A Chi-harc hatékonyságát az alábbi táblázat mutatja.

        <table>
            <tr>
                <td>TSz</td>
                <td>Tám/kör</td>
                <td>Időtartam</td>
                <td>TÉ,VÉ</td>
                <td>KÉ</td>
                <td>Sp</td>
            </tr>
            <tr>
<td>1.</td>
<td>1</td>
<td>1 kör</td>
<td>+10</td>
<td>+2</td>
<td>+1</td>
            </tr>
            <tr>
<td>3.</td>
<td>2</td>
<td>1 kör</td>
<td>+15</td>
<td>+4</td>
<td>+3</td>
            </tr>
            <tr>
<td>5.</td>
<td>3</td>
<td>2 kör</td>
<td>+20</td>
<td>+6</td>
<td>+5</td>
            </tr>
            <tr>
<td>7.</td>
<td>4</td>
<td>2 kör</td>
<td>+25</td>
<td>+8</td>
<td>+7</td>
            </tr>
            <tr>
<td>9.</td>
<td>5</td>
<td>3 kör</td>
<td>+30</td>
<td>+10</td>
<td>+9</td>
            </tr>
            <tr>
<td>11.</td>
<td>6</td>
<td>Korlátlan</td>
<td>+50</td>
<td>+12</td>
<td>+11</td>
                        </tr>
        </table>

        Minden további Tapasztalati Szinten a Sebzés + 1-gyel nő, azaz 1-2. szinten 1 Ψp felhasználásával a diszciplína alkalmazója  1 körig képes a Chi-harcra; miáltal Támadó Értéke, Védő Értéke 10­zel növekszik, Kezdeményező Értékéhez +2 adódik, míg sebzéséhez  + 1. További Ψp-ok rááldozásával csak az Időtartamot lehet  elnyújtani, a TÉ, VÉ, KÉ és a Sebzés nem növelhető. Ezen értékek  csak a táblázatban feltüntetett mértékben változnak.        
        `
    },
    {
        name: 'Érzékelhetetlenség',
        pont: '8',
        misc: {
            idotartam: '1 kör'
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A diszciplína alkalmazója mozdulatlanná dermedve képes  érzékelhetetlenné válni. Ebben az állapotában még a legélesebb érzékszervek (pl.: látás,  hallás, szaglás, stb.) szá­mára sem fedezhető fel, és  kikerül a Hatodik Érzék ha­tósugarából is. Az Érzé­kelhetetlenség folyamán  semmilyen tevékenység (mozgás, harc, Ψ-alkalmazás, vagy kommunikáció) nem végez­hető.

        A Kyr metódus Auraérzékelése előtt is rejtve marad, csupán  olyan Láthatatlansági észleléssel fedezhető fel, mely legalább 4-es  erősitésű.

        Nyolc Ψp felhasználásával 1 körig alkalmazható a diszciplína,  16Ψp-ért 2 körig, stb.
    `
    },
    {
        name: 'Halálos ujj',
        pont: '3/1 ÉP',
        misc: {
            idotartam: '24 óra'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A Pszi energiák koncentrált, romboló kisugárzásának mód­szere Yadegori Chunin nevéhez fűződik. Yadegori ellentétben a  híresztelésekkel kardművész volt, noha a pusztakezes harc­művészet nagymestereként tartják számon. Ennek oka, hogy  közel tíz évet töltött az Oltalmazó Keleti Szél kolostorában,  ahol Enoszukéról magával hozott tudását tanította a szer­zeteseknek. Hamar híressé vált, s elterjedt róla, hogy egyetlen  érintésével képes ölni. A Gyémántok évének nyolcadik havában  Yi Chien Mu császári herceg, máig ismeretlen okból párviadalra  hívta ki. Yadegori többször visszautasította a kihívást, ám egy  ízben a herceg meditáció közben zavarta meg, s tisztelet­lenségével addig provokálta, míg az enoszukei mester- anélkül,  hogy egy szót szólt volna - odalépett a herceghez és muta­tóujjával megbökte. Yi Chien Mu azonnal kiszenvedett. Az  esetnek hamar híre ment, így Yadegori kénytelen volt menekülni.  Azonban mielőtt elhagyta volna a kolostort, megtanította a  rendfőnököt arra a diszciplínára, melynek segítségével megölte  a császári herceget. A Halálos ujjat - nevezik Yadegori érintésének  is - sokáig titkos tanításként kezelték, csak nem rég jutott el  Tiadlanba, ahol is a legtöbb Slan iskola átvette és tanítani  kezdte. ­

        A diszciplínát a legveszélyesebb Ψ-alkalmazásnak tarják.  Használatával időzített belső sérülések okozhatók. Az alkalma­zónak meg kell érinteni valamelyik mutatóujjával ellenfelét. Ez  harci szituációban sikeres támadást igényel. Az okozott sérülés  az alkalmazó akarata szerinti - de huszonnégy órán belül eső ­időpontban keletkezik, gyógyítása nem lehetséges. A disziplína  minden esetben Ép veszteséget okoz, s a páncélok Sebzés Felfogó  Értéke nem vonódik le belőle, sőt az Aranyharang sem jelent  védelmet hatása ellen.

        Nehézsége okán nem alkalmazható korlátlanul: minden  Tapasztalati Szinten csak 1 Ép sérülés okozható, mely 3 Ψp  felhasználásába kerül. Második TSz-en már 6 Ψp rááldozásával 2  Ép veszteség érhető el, stb.
            `
    },
    {
        name: 'Jelentéktelenség',
        pont: '6',
        misc: {
            idotartam: '1 kör'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A Slan-ek életük nagy részét- míg ki nem kerülnek a kolostorból vagy iskolából - csöndes önmagukba zárkózással, nyugalmas  elmélyedéssel töltik. A szinte észrevétlen jelenlét, háttérbe húzódó  viselkedés az effajta életmód egyik alapkövetelménye. Mindezt tökélyre  fejlesztve, és a Ψ-energiákat is segítségül hívva, a Slan-út alkalmazói  elérték, hogy a teljes jelentéktelenség aurájába burkolózhassanak.
        
        A diszciplína használatakor az alkalmazó nem tűnik fel a  legéberebb őrnek, a legfigyelmesebb szemlélődőnek sem. A rá­irányított tekintet lesiklik róla, jelentéktelen, figyelmet nem érdemlő  senkinek hat. A tudatos érzékelések persze felfedezik (Aura­érzékelés, Láthatatlanság Érzékelés, Hatodik Érzék) és lelepleződik  akkor is, ha a figyelmes szemlélő sikeres Intelligencia Próbát  dob. Ha azonban az alkalmazó már elhagyta a helyszínt - ahol  a diszciplína segítségével sikerült észrevétlennek maradnia - hiába  járt le a jelentéktelenség időtartama, nem ébred gyanú senkiben.
        
        Közönséges példája ennek, ha az alkalmazó úgy kíván halálos  ellenségeinek táborán végighaladni - esetleg kikémlelni azt -,  hogy járása-kelése észrevétlen maradjon. Ilyenkor a diszciplína  segítségével jelentéktelenné válik, s az őrök meg a táborlakók ­sikeres Intelligencia Próba, vagy tudatos érzékelés híján - nem  figyelnek föl rá: maguk közé tartozónak tekintik. Miután a tábort  elhagyta, senkinek sem jut eszébe, hogy idegen járt közöttük.  Távozása éppúgy jelentőség nélkül való, mint jelenléte. A diszciplína  alkalmazása közben szólni, beszédbe elegyedni nem lehet - ez  azonnali lelepleződéssel jár -, miképpen a harcba bocsátkozás is  megszünteti a jelentéktelenséget.
        
        A diszciplína értelmetlen alkalmazása szintén balul üthet ki:  magányos emberhez odamenni, vagy hegyi óriások falujába  besétálni - azaz bármi olyat tenni, amikor nincs mód a környezetben  tartózkodókkal való azonosulásra - nem vezethet sikerhez.
        
        A Jelentéktelenség 6 Ψp-ért 1 körig tartható fenn, 12 Ψp-ért 2  körig, stb.            
        `
    },
    {
        name: 'Levitáció',
        pont: '1',
        misc: {
            idotartam: '1 óra'
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        Meglehetősen kevés gyakorlati alkalmazhatósággal bíró  diszciplína, ám a Slanek szertartásainak elengedhetetlen kelléke.  Az emberi test súlyának teljes leküzdésére szolgál, alkalma­zásával föld feletti lebegésre nyílik mód. 1 Ψp felhasználásával 1  órán keresztül lehet I méter magasságban lebegni, 2 Ψp-ért már  két órán keresztül tartható fenn a diszciplína hatása. A Levitáció  magassága nem növelhető, ám az alkalmazó bármekkora súly­amennyiben a teste korlátai elbírják- felemelésére képes. A diszciplína  használata közben a Slan teste sebezhetetlenné válik bármely ­nem mágikus - fegyverrel szemben. A diszciplína folyamatos  koncentrációt igényel, közben fizikai támadás, egyéb diszciplína  vagy varázslat használata nem lehetséges.
        `
    },
    {
        name: 'Statikus Ψ-pajzs',
        pont: 'min 1',
        misc: {
            idotartam: 'lásd a leírást'
        },
        varazslasIdeje: '90 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A Slan-út alkalmazói által gerjesztett Statikus Pajzs felépítésében  gyökeresen különbözik a Pyarroni módszer segítségével létre­hozottól, ám működésében és alkalmazásában teljesen megegyezik  azzal. A pontos leírást lásd az Általános Diszciplínák, Statikus Ψ­pajzs diszciplína tárgyalásánál.
        
        A valódi különbség a végeredményben mutatkozik meg: a Slan­ út Statikus Ψ-pajzsát senki nem képes lerombolni, csak maga az  alkalmazó szüntetheti meg és építheti újra. Efféle pajzsot a Slan  csak saját elméje köré képes felhúzni.
        `
    },
    {
        name: 'Testsúly változtatás',
        pont: 'lásd a leírást',
        misc: {
            idotartam: '3 kör'
        },
        varazslasIdeje: '1 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A diszciplína használatával a Ψ-alkalmazó képes saját test­súlyát megnövelni, avagy lecsökkenteni. Ezáltal képessé válik több  emelet magasra felugrani, a havon futni anélkül, hogy mély nyomot  hagyna, esetleg gyorsabban úszni. A diszciplínával nem változtatható  meg az alkalmazó által hordott vagy viselt tárgyak súlya.
        
        Az alábbi táblázatból kiderül, hogy a testsúly különböző mér­tékű megváltoztatása mennyi Ψp-ba kerül. A felhasznált Ψp-ok  növelésével a diszciplína Időtartama is meghosszabbítható.        
        
        <table>
        <tr>
            <td colspan="9">
            +/- módosítás az eredethez képest            
            </td>
        </tr>
           <tr>
<td>Súly</td>
<td>1 kg</td>
<td>3 kg</td>
<td>5 kg</td>
<td>9 kg</td>
<td>13 kg</td>
<td>31 kg</td>
<td>2x kg</td>
<td>3x kg</td>
           </tr>
           <tr>
<td>Ψp</td>
<td>1</td>
<td>2</td>
<td>4</td>
<td>7</td>
<td>10</td>
<td>20</td>
<td>30</td>
<td>35</td>
           </tr>
        </table>
        
        Háromszorosnál jobban növelni, vagy harmadánál kevesebbre  csökkenteni a testsúlyt bármennyi Ψp rááldozásával sem lehet.
        `
    },
    {
        name: 'Tetszhalál',
        pont: '6',
        misc: {
            idotartam: '1 óra'
        },
        varazslasIdeje: '10 kör',
        labels: ['pszi', 'pszi-slan'],
        description: `
        Az alkalmazás segítségével lehető­ség nyílik a test élettani folyamatainak  felfüggesztésére. Ilyenkor az alkalmazó  semmiféle életjelet nem ad, nincs szüksége  táplálékra vagy folyadékra, de még levegőre  sem. Mozdulatlanná válik-olyan ez, akár  a halál dermedtsége - és kihűl, a tudati  Folyamatok megszűnnek, így lebomlik a  Dinamikus Pszi-pajzs, csupán a Statikus  marad meg. Ezzel szemben az Asztrál- és  a Mentáltest nem alszik, így az alkalmazó  továbbra sem lehet alanya a Természeti  Anyag Mágiájának. Az alkalmazónak előre  el kell döntenie a Tetszhalál időtartamát,  mert nincs rá mód, hogy az időtartam  lejárta előtt félbeszakítsák a diszciplínát.  Tetszhalál állapotában semmiféle fájdalom (FP) nem okozható, és a testet ért (ÉP) sérülések feleződnek. Az  egyetlen olyan diszciplína ez, melynek alkalmazása során  valóban regenerálódik a test. Minden Tetszhalálban töltött óra  alatt 1 ÉP regenerálódik - azaz gyógyul magától -, és 10 FP.  Maximuma fölé sem az ÉP, sem az FP nem emelkedhet. A  szervezetbe került mérgek hatóideje háromszorosára lassul,  ráadásul sebzésük is harmadolódik.

        A Tetszhalál felfedezésére csak a Kyr Metódus Auraérzékelésével  lehetséges.

        A Ψp-ok megduplázásával az időtartam megkétszereződik,  triplázásával megháromszorozódik, stb.
        `
    },
    {
        name: 'Kiáltás',
        pont: '5/támadás',
        misc: {
            idotartam: 'egysszeri'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A diszciplina segítségével a harcművész szellemi energiájával támadásának erejét fokozhatja. A Kiáltás kíséretében végrehajtott támadás rombolóerejét tekintve tökéletes, Sebzésének meghatározásakor nincs szükség kockadobásra, minden esetben a lehetséges maximumot sebzi. Ez persze függ a támadó fegyvertől, az alkalmazó Tapasztalati Szintjétől és még sok egyébtől.

        A belső energiákat elnyújtott kiáltás szabadítja fel - innen kapta nevét a diszciplina. Kiáltás híján a várt hatás is elmarad. Mindig egyetlen támadást befolyásol, csak annak sebzését növeli. A felhasznált Ψ-pont akkor is elveszik, ha a támadás sikertelen. A diszciplinát a harcművész egy kör alatt legtöbb annyiszor használhatja, ahányadik Tapasztalai Szintű - természetesen minden újabb "megerősített" támadás további 5 Ψ-pontba kerül.

        A Kiáltás Chi-harcban is alkalmazható.
    `
    },
    {
        name: 'Kitérés',
        pont: '4/kör',
        misc: {
            idotartam: '1 kör'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-slan'],
        description: `
        A diszciplina alkalmazásakor a slan belső ritmus diktálta táncba kezd. Egyfajta intuitív révület ez, mely alatt előre látja a ráváró veszedelmeket, ezért nagy biztonsággal képes kitérni előlük. A Kitérés időtartama alatt a hajított fegyverek és célzott lövedékek elméletileg nem találhatják el, a gyakorlatban a véletlen néha mást eredményez: a 00-ás dobások eredményesek ellene is. A diszciplinát 2 Ψ-pontért 1 körig képes alkalmazni, s ez idő alatt nem támadhat, nem végezhet más Ψ-tevékenységet. Egy adott körben minden slan legtöbb annyi lövedék elől képes kitérni, amennyi a Ψ-használati Szintje.
        `
    },

]

export const PSZI_KYR: Array<Varazslat> = [
    {
        name: 'Energiagyűjtés',
        pont: 'lásd a leírásban',
        varazslasIdeje: 'lásd a leírásban',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A Kyr metódus legalapvetőbb diszciplínája, a varázslók  tudományának alapja. Segítségével a varázsló elméjébe gyűjtheti  a világegyetemet átható mágikus energiát (Mana-pont), az  energiát, melyhól a varázslatait létrehozza. Természetesen egy­szerre maximum annyit, amennyit befogadni képes. Erről a  mennyiségről a Tapasztalati Szint függvényében a max. Mana­pont tudósít. Az Energiagyűjtés leegyszerűsítve nem más, mint a  Ψ-pontok Mana-pontokra váltása - a váltószám az Energiagyűjtésre alkalmazott módszertől függ. Itt csak a három alapvető módszert  ismeretetjük: a Meditációs-formula, a Kivonás és a Kisajtolás.

        A Meditációs Formula (1 Ψp = 10 Mp) alkalmazásához a  varázslónak Meditációs Varázskörben kell tartózkodnia (ennek  elkészítése 18 Mana-pontba kerül és 30 percbe telik) és ott 1 óra  hosszan transzállapotban meditálnia (lásd Transz diszciplína).  Már ebből is látszik, hogy ennél a módszernél jelentős elő­készületekre van szükség, s a varázsló másfél óra hosszan helyhez  van kötve. Mégis, a varázslók, ha idejük és körülményeik engedik,  ehhez az energiagyűjtési módszerhez folyamodnak, mert így  juthatnak a legtöbb mágikus energiához (Mp) a legkevesebb Ψ­pontért.

        Ha a meditáció bármely okból félbeszakad, az Energiagyűjtés  sikertelen lesz, s a felhasznált Ψ-pontok is elvesznek. Mi több, a  varázsló elméjéből elillan a már korábban begyűjtött energia is,  azaz Mana-pontjainak száma nullára zuhan.

        Ha az 1 órás meditáció zavartalanul véget ér, azzal a varázsló  sikerrel gyűjtötte elméjébe a kívánt mennyiségű mágikus energiát.  Tízszer annyi Mana-pontot kap, ahány Ψ-pontot a diszciplína  alkalmazásásra fordított; tehát a Meditációs formula alkal­mazásával 1 Ψ-pontért l0 Mana-pont jár.

        Kivonáshoz (1 Ψp = 3 Mp) a varázslók olyankor folya­modnak, ha kifogytak az elméjükben tárolt energiából, és  sürgősen utánpótlásra van szükségük. A sietségért cserébe a  kisebb hatékonysággal fizetnek - a módszer a Ψ-pontok  valóságos pazarlása! Ellenben csak 2 körig tart, és sem Transz,  sem Meditációs Varázskör nem kell hozzá; azaz semmiféle  előkészületet nem igényel, mindössze némi összpontosítást.  Közben a varázsló sétálhat, léptethet a lován, de nem harcolhat,  varázsolhat, s nem alkalmazhat más diszciplínát.

        A módszer alkalmazásakor a varázsló kivonja környezetéből a  többletenergiákat, mindenhonnan csak keveset és csak a felesleget  - nem árt senkinek és semminek. Kivonással háromszor annyi  Mana-pontthoz jut, mint amennyit a diszciplínára áldozott; tehát  1 Ψ-pontért 3 Mana-pontot.
        
        A Kisajtolás (1 Ψp = 5 Mp) természetéből fakadóan feketemágia!  Alkalmazásakor a varázsló nem a felesleget vonja el a környezetétől,  hanem kisajtót abból annyi energiát, amennyit csak képes. A folyamat  eredményeként a varázsló Zónájában (20 m sugarú gömb) a növények  elszáradnak (csak 20 Mp felett) és az élőlények kínzó fájdalmat  éreznek egész testükben. A fájdalom nem jár sebbel, de Fp-vesztést  okoz a varázsló Zónájában tartozkodó összes lénynek. A veszteség  minden megkezdett 20 Mp után K6 Fp (pl: 20 Mp = K6 Fp; 25 Mp  = 2K6 Fp; 70 Mp = 4K6 Fp). Az áldozat ilymódon Ép-t soha nem  veszíthet!

        A Kisajtolás 5 szegmens alatt elvégezhető, és ötször annyi Mp­ot eredményez, mint amennyit a varázsló a diszciplínára elhasznált,  vagyis 1 Ψ-pontért 5 Mp jár.

        A leírtak kivételével a Kisajtolás módszere teljesen azonos a  Kivonással.
        `
    },
    {
        name: 'Transz',
        pont: '1',
        misc: {
            idotartam: 'korlátlan'
        },
        varazslasIdeje: '10 perc',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A diszciplína segítségével a végrehajtó transzállapotba kerülhet.  Hogy ez megtörténjék, tíz percig mozdulatlan meditál, teljes  szellemiségével a transz elérésére összpontosít. Ez idő alatt nem végezhet fizikai vagy szellemi tevékenységet, mozdulatlanul áll,  vagy ül, netán fekszik.
        
        Transzban lassú mozdulatokkal képes mozogni, akár egy sétáló  lovat is megülni, vagy gyalogolni, mágikus jeleket rajzolni, beszélni,  írni; de nem képes fürge mozdulatokra, közelharcra, a transztól  eltérő összpontosításra. Maga a végrehajtó bármikor visszatérhet  normális tudatállapotba; más azonban csak nehezen képes  kizökkenteni. A transzban levő emberhez hiába beszélnek, rázzák,  öntik nyakon vízzel; a transz csak Fp vagy Ép vesztést okozó  „zavarás" hatására szakad félbe.
        
        A transzállapot feltétlenül szükséges egyes mágikus tanok  gyakorlásánál (pl: jelmágia), s a varázslók ilyenkor ezen diszciplínához  folyamodnak Egyetlen Ψ-pont felhasználásával a végrehajtó korlátian  időtartamra transzba kerülhet. Természetesen léteznek más  módszerek is a transzállapot elérésére, mint például a koplalás, a  kántálás vagy a törzsi tánc- ám ezek a javasasszonyok, boszorkányok,  sámánok fegyvertárába tartoznak.
        
        Transzállapotban az ember testi funkciói lelassulnak, így jóval  (ötször) hosszabb időt képes kibírni evés, ivás vagy levegővétel  nélkül.
        `
    },
    {
        name: 'Láthatatlanság Észlelése',
        pont: '5 (erősíthető)',
        misc: {
            idotartam: '5 kör',
            erosseg: '1'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A diszciplína végrehajtója öt körön keresztül látja a mágikusan  láthatatlanná tett tágyakat és élőlényeket. Természetesen csak  azokat, melyeknél a diszciplína erőssége meghaladja a láthatatlanság  Erősségét (E). Hasonlóképp a Leplezett varázslatok esetében: az  alkalmazó megpillanthatja a láthatatlanná tett mágikus hatásokat,  varázslatokat.
        
        Alapesetben a diszciplína erőssége (E)1, de ez dupla vagy tripla  mennyiségű Ψ-pont felhasználásával a végtelenségig többszörözhető.  Ugyanez igaz az 5 körös időtartamra is.        
        `
    },
    {
        name: 'Asztrál Szem',
        pont: '3',
        misc: {
            me: 'A',
            idotartam: 'azonnali',
            erosseg: '3'
        },
        varazslasIdeje: '3 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A diszciplína mások érzelmeinek, indu­latainak kifürkészésére alkalmas. Segítségével  át lehet „látni" az Asztrál Pajzson is.  Bármilyen erősítésű Asztrál Szemmel tekin­tünk is valakire, egyet mindenképpen és  biztosan megtudhatunk: az illető érzelmi  kiegyensúlyozottságának mértékét, másként  szólva, Asztrálját (lásd Képességek). Ezen  túl az áldozat jogosult Asztrális Mágia­ellenállásra.

        Abban az esetben, ha Mágiaellenállása  sikeres, az alkalmazó csak a legnyilvánvalóbb  érzelmeiről szerez tudomást - melyek álta­lában már puszta emberismerettel is felfe­dezhetőek. Kimagaslóan erős érzelmekről van  itt szó: ilyen a heves szerelem, a vak gyűlölet, a szamuráj hűsége vagy éppen a fellángoló szexuális vágy.  Mindezeknek is csak a létére derül fény; a céljukra, arra hogy az illető kinek vagy minek az irányában érez, arra nem. Erre a diszciplína  alkalmazója legfeljebb következtethet: például kitalálhatja, hogy a  pap vak hűsége istene felé irányul.

        Ha az áldozat elvéti Asztrális Mágiaellenállását, világossá válik  az érzelmek célja is, mitöbb, a kevésbé nyilvánvaló érzelmek is  napvilágra kerülnek. Persze az Asztrál Szem egyszeri használata  nem egyenlő az áldozat teljes érzelmi életének feltérképezésével.  Segítségével megpillantható öt nyilvánvaló, három átlagos vagy  egy titkolt ércelem. Legutóbbiról akkor beszélünk, ha valaki őszpontosít  arra, hogy lelke mélyén elrejtsen egy érzelmet illetve indulatot ­egyszerre legfeljebb kettővel teheti.

        A Szem alkalmazója vagy a KM-re bízza, hogy mesélje el, mi  az, amit lát, vagy célirányosan kérdezhet is. Felteheti a kérdést,  hogy a diszciplína áldozata miként érez meghatározott személyek  vagy eszmék irányában. Kérheti az öt legnyilvánvalóbb érzelem  felsorolását, vagy tudakozódhat egy esetleges titkolt érzelem felől.  A választól függetlenül, a kérdezést annyiszor ismételheti meg,  ahányszor a felsorolt feltételek lehetővé teszik.

        A diszciplína egyszerre egyetlen személy ellen alkalmazható, és  a feltüntetett 3 szegmens alatt a teljes információcsere lezajlik. Ez  idő alatt az alkalmazó meditatív tudatállapotban kell legyen.

        A diszciplína másik használati módja, mikor az alkalmazó az  Asztrál Szem tekintetével nem egy valakit vesz alaposan szemügyre,  hanem a 3 szegmens alatt gyorsan körbepásztáz. Ilyenkor  megtudhatja a közelében tartózkodó - legfeljebb tíz - személy  Asztrál Képességének értékét, de az érzelmeiket és azok célját  nem fürkészheti ki.

        Az alkalmazásra szánt minden egyes további Ψ-pont-a feltüntetett  3-on felül - nem 1-gyel, hanem 3-mal növeli a diszciplína Erősségét.  

        Az Asztrál Szem használatáról a diszciplína áldozata ill. áldozatai  nem szereznek tudomást!
        `
    },
    {
        name: 'Mentál Szem',
        pont: '5 (erősíthető)',
        misc: {
            me: 'M',
            idotartam: 'azonnali',
            erosseg: '5'
        },
        varazslasIdeje: '5 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A Mentál Szem egyetlenegy személy gondolati életének minőségéről  ad felvilágosítást. Segítségével át lehet "látni" a Mentál Pajzson,  bár ilyenkor nem égbekiáltó az eredmény- de nem is lebecsülendő.
        
        A Mentál Szem használata ellen a kiszemelt áldozat mentális  Mágiaellenállásra jogosult. Ha ez sikeres, az alkalmazó csak  annyit tud meg róla, hogy figyelemre méltó elme-e, netán átlagos  gondolkodó, vagy éppen afféle „ostoba tuskó". Továbbá azt,  ha valakitől, vagy valakihez Mentál-fonál vezet. Hogy kitől  kihez, az csak akkor deríthető ki, ha az alkalmazó mindkét  áldozatot szemügyre veszi Mentál Szemével.
        
        Ha az áldozat elvéti Mágiaellenállását, az alkalmazó  számszerűen tudomást szerez Intelligencia és Akaraterő  Képességéről, valamint Kasztjáról és plusz-mínusz 1 eltéréssel  a Tapasztalati Szintjéről és Ψ-használatának szintjéről.
        
        A diszciplína egyszerre egyetlen személy ellen alkalmazható, és  a feltüntetett 5 szegmens alatt a teljes információcsere lezajlik.  Ezalatt az alkalmazó meditatív tudatállapotban kell legyen.
        
        A diszciplína másik használati módja, mikor az alkalmazó a  Mentál Szemmel nem egy valakit vesz alaposan szemügyre, hanem  az 5 szegmens alatt gyorsan körbepásztáz. Ilyenkor legfeljebb  tíz, közelében tartózkodó személyről tudhatja meg azt, amit a  Mágia-ellenállás elvétésének esetében írtunk le, de mást nem  fürkészhet ki.
        
        Az alkalmazásra szánt minden egyes további Ψ-pont-a feltüntetett  5-ön felül - nem 1-gyel, hanem 2-vel növeli a diszciplína Erősségét.
        
        A Mentál Szem használatáról a diszciplína áldozata ill. áldozatai  nem szereznek tudomást!        
        `
    },
    {
        name: 'Auraérzékelés',
        pont: '7 (erősíthető)',
        misc: {
            me: 'A+M',
            idotartam: 'lásd a leírást',
            erosseg: '7'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        Minden kifejlett lélekkel bíró teremtmény kisugároz magából  Személyes Aurát. Ez azon túl, hogy megvédi a lélek uralta testet  a mágia bizonyos formáitól, messzemenően jellemző az illetőre.  Egy varázsló képes arra, hogy különleges érzékeivel szemügyre  vegye az Aurát. Ha már máskor is „látta" és megjegyezte, az  Aura alapján felismeri a lelket, bármely testben lakozik is. Képes  észlelni a szembeötlő természetellenességet is, mint mikor emberi  lélek állatban lakozik, vagy fordítva. Továbbá meg tudja állapítani,  hogy az illető milyen fajhoz tartozik.
        
        Mivel azonban az Asztrál és Mentál Pajzsok az Aura körül  épülnek fel, mindezen információt csak akkor szerezheti meg,  ha „átlát" a Pajzsokon. Ezt csak úgy érheti el, hogy az Auraérzékelést  annyira felerősíti, hogy áldozata elvétse külön-külön, mind Asztrál,  mind Mentál Mágiaellenállását.
        
        Mindaddig, míg ez nem történik meg, a diszciplína csak a  pajzsok erősségéről szolgáltat adatokat. Nem számszerűen,  hanem a következő táblázat szerint elárulja, milyen nagyság­rendű az illető statikus Asztrál és Mentál Pajzsa, valamint  dinamikus Asztrál és Mentál Pajzsa.
        
        <table>
            <tr>
                <td>Pajzs E-je</td>
                <td>Nagyságrend</td>
            </tr>
            <tr>
                <td>0</td>
                <td>Nincs</td>
                </tr>
                <tr>
                <td>1-9</td>
                <td>Gyenge</td>
                </tr>
                <tr>
                <td>10-21</td>
                <td>Mérsékelt</td>
                </tr>
                <tr>
                <td>22-34</td>
                <td>Közepes</td>
                </tr>
                <tr>
                <td>35-50</td>
                <td>Erős</td>
                </tr>
                <tr>
                <td>51-</td>
                <td>Nagyon erős</td>
                </tr>
        </table>

        A diszciplínát előszegettel használják alakjukat megváltoztatott  személyek felismerésére, netán vélt azonosság vagy ennek  ellenkezőjének tisztázására, mivel az Aura elváltoztatására nincs  mód!

        Az Auraérzékelésre szánt minden további 1Ψ-pont - a leírt 7-en  felül - nem 1-gyel, hanem 2-vel növeli a diszciplína erősségét.
        `
    },
    {
        name: 'Mágikus Tekintet',
        pont: '4 (erősíthető)',
        misc: {
            me: 'AE-próba',
            idotartam: 'lásd a leírást',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        A diszciplína az Energiagyűjtés mellett a Kyr metódus másik  csúcspontját jelenti. Kifejezetten újkeletű, bár évek alatt széles  körben elterjedt; kifejlesztése egy Ynev-szerte csak a Smaragd Uraként  ismert pyarroni mágus nevéhez fűződik. Alapja az okkult tan,  miszerint az anyagi porhüvelyben a szem a legrövidebb út a lélek  felé. Épp ezért az alkalmazónak minden esetben a kiszemelt áldozat  szemébe kell néznie.

        Bárki, aki a diszciplína alkalmazójának szemébe néz, akaraterő­próbát köteles dobni, amit ha elvét, többé nem képes tekintetét a varázslóétól elszakítani. Bármit tehet, hátrálhat, akár rá is  támadhat az alkalmazóra, de nem cselekedhet semmi olyat,  minek eredményeként kiszabadulna a Mágikus Tekintet bék­lyójából. Vagyis nem helyezhet semmit az összekapcsolódó  tekintetek útjába, nem fordulhat el, nem léphet takarásba. A  kapcsolat megtartása minden célja előtt való! A Mágikus  Tekintettől csak akkor szabadulhat, ha az alkalmazó, tekin­tetének elfordításával szabadon engedi, illetőleg, ha harmadik  személy akár csak egy szemvillanásra is akadályt gördít a két  pillantás kereszttüzébe.

        Ha az áldozat kiszabadult, a diszciplína időtartama azonnal  lejár, egyébként percekig, órákig, de elméletileg akár a vég­telenségig is tarthat.

        A varázsló az ellen a személy  ellen, aki Mágikus Tekintetének  rabja, magasabb hatásfokon ké­pes Asztrál- és Mentálmágiát alkal­mazni. Ami természetesen felté­telezi, hogy a varázslat ideje alatt  az áldozat nem szabadul. Hogy az  említett magasabb hatásfok mit  jelent, az a következő táblázatból  derül ki        

        <table>
            <tr>
                <td>TSZ</td>
                <td>+E</td>
            </tr>
            <tr>
<td>1. </td>
<td>+ 4 E  </td>
</tr>
<tr>
<td>2. </td>
<td>+ 5 E  </td>
</tr>
<tr>
<td>3. </td>
<td>+ 6 E  </td>
</tr>
<tr>
<td>4. </td>
<td>+ 7 E  </td>
</tr>
<tr>
<td>5. </td>
<td>+ 9 E  </td>
</tr>
<tr>
<td>6. </td>
<td>+ 10 E  </td>
</tr>
<tr>
<td>7. </td>
<td>+ 11 E  </td>
</tr>
<tr>
<td>8. </td>
<td>+ 12 E  </td>
</tr>
<tr>
<td>9. </td>
<td>+ 13 E</td>
</tr>
<tr>
<td>10</td>
<td>+ 15 E  </td>
</tr>
<tr>
<td>11. </td>
<td>+ 16 E  </td>
</tr>
<tr>
<td>12. </td>
<td>+ 17 E  </td>
</tr>
<tr>
<td>13. </td>
<td>+ 18 E  </td>
</tr>
<tr>
<td>14. </td>
<td>+ 19 E  </td>
</tr>
<tr>
<td>15. </td>
<td>+ 21 E</td>
</tr>
        </table>

        A varázslat Erősségéhez (E)  hozzáadandó az adott Tapasz­talati Szinten, a +E rovatban  feltüntetett E érték. (Például: 4.  TSZ-en, ha a varázslat E-je 13,  Mágikus Tekintet rabságában az  erősség 20-nak minősül.)
        A varázslat létrejöttével - de  még időtartamának lejártával  sem - az áldozat nem szabadul  a Mágikus Tekintet bilincséből.  Ez csak a fent említett esetekben  történhet, addig a varázsló any­nyiszor varázsol rá a leírt ked­vezménnyel, ahányszor csak jó­nak látja, illetve ameddig Mana­pontjai el nem fogynak.
           `
    },
    {
        name: 'Ψ-ostrom',
        pont: '1 (erősíthető)',
        misc: {
            idotartam: 'lásd a leírást',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        Mindenben azonos az Általános Diszciplínáknál leírt Ψ-ostromhoz,  ám ezzel 1 Ψ-pontért 2Ψ-pont bontható le a dinamikus, és 2 E  rombolható le a statikus pajzsokból.        
        `
    },
    {
        name: 'Pszeudó',
        pont: '5 + a Pszeudó',
        misc: {
            idotartam: 'egyszeri',
        },
        varazslasIdeje: '5 szegmens',
        labels: ['pszi', 'pszi-kyr'],
        description: `
        Baromi hosszú leírás egy olyan diszciplinához, amit amúgy se használ soha senki.
        `
    },
]

export const BARD_VARAZSLATOK: Array<Varazslat> = [
    {
        name: 'Álom dala',
        pont: '12/célpont',
        misc: {
            erosseg: '6',
            idotartam: 'lásd leírás',
            hatotav: '10 láb',
            me: 'M'
        },
        varazslasIdeje: '3 kör',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Bájolás dala',
        pont: '5/lény',
        misc: {
            erosseg: '6',
            idotartam: '2 óra',
            hatotav: '10 láb',
            me: 'A'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Bátorság dala',
        pont: '7',
        misc: {
            erosseg: '5',
            idotartam: 'dal hossza',
            hatotav: 'lásd leírás',
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Bénítás dala',
        pont: '8/célpont',
        misc: {
            erosseg: '7',
            idotartam: 'k6 kör',
            hatotav: '10 láb',
            me: 'M'
        },
        varazslasIdeje: '2+k6 kör',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Ellentétek dala',
        pont: '35',
        misc: {
            erosseg: '25',
            idotartam: 'végleges',
            hatotav: '10 láb',
            me: 'A'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Emlékek dala',
        pont: '25',
        misc: {
            erosseg: '12',
            idotartam: 'végleges',
            hatotav: '10 láb',
            me: 'M'
        },
        varazslasIdeje: '3 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Feledés dala',
        pont: '20',
        misc: {
            erosseg: '12',
            idotartam: 'egyszeri',
            hatotav: '10 láb',
            me: 'M'
        },
        varazslasIdeje: '3 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Félelem dala',
        pont: '4/lény',
        misc: {
            erosseg: '6',
            idotartam: 'dal hossza',
            hatotav: '10 láb',
            me: 'A'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Halál dala',
        pont: '45/lény',
        misc: {
            erosseg: '15',
            idotartam: 'végleges',
            hatotav: '10 láb',
            me: 'A'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Kínok dala',
        pont: '4/kör',
        misc: {
            erosseg: '25',
            idotartam: 'dal hossza',
            hatotav: 'hallótáv',
            me: 'M'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Nyugalom dala',
        pont: '1/célpont',
        misc: {
            erosseg: '5',
            idotartam: 'k6 kör',
            hatotav: '10 láb',
            me: 'A'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Zavarodottság dala',
        pont: '6/célpont',
        misc: {
            erosseg: '4',
            idotartam: 'k6 kör',
            hatotav: '10 láb',
            me: 'M'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-dalmágia'],
        description: ``
    },
    {
        name: 'Beszélő múlt',
        pont: '19',
        misc: {
            erosseg: '1',
            idotartam: '15 perc',
            hatotav: '20 láb',
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Bűvhangszer',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '10 perc/szint',
            hatotav: 'bárd hangszere',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Csend',
        pont: '10',
        misc: {
            erosseg: '8',
            idotartam: '1 kör/szint',
            hatotav: '8 láb',
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Dalegyesítés',
        pont: '18',
        misc: {
            erosseg: '5',
            idotartam: 'lásd leírás',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hamis beszéd',
        pont: '7',
        misc: {
            erosseg: '2',
            idotartam: 'perc/szint',
            hatotav: '15 láb',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangcsapás',
        pont: '3',
        misc: {
            erosseg: '1',
            idotartam: '1 szegmens',
            hatotav: '50 láb',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangidézés',
        pont: '8',
        misc: {
            erosseg: '1',
            idotartam: '2 perc/szint',
            hatotav: '10 láb',
        },
        varazslasIdeje: '5 kör',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangkivetítés',
        pont: '6',
        misc: {
            erosseg: '1',
            idotartam: '1 óra',
            hatotav: '50 láb',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangorkán',
        pont: '22',
        misc: {
            erosseg: '4',
            idotartam: '1 szegmens',
            me: 'állóképesség',
            hatotav: '12 láb',
        },
        varazslasIdeje: '4 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangtanulmány',
        pont: '2',
        misc: {
            erosseg: '1',
            idotartam: 'végleges',
            hatotav: '5 láb',
        },
        varazslasIdeje: '3 perc',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangteremtés',
        pont: '2',
        misc: {
            erosseg: '1',
            idotartam: '5 perc/szint',
            hatotav: '12 láb',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Hangutánzás',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '15 perc/szomt',
            hatotav: '35 láb',
        },
        varazslasIdeje: '3 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Mágia dala',
        pont: '10',
        misc: {
            erosseg: '5',
            idotartam: 'lásd leírás',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Mágikus hang',
        pont: '8',
        misc: {
            erosseg: '1',
            idotartam: 'végleges',
            hatotav: 'érintés',
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Nyelvzagyválás',
        pont: '6',
        misc: {
            erosseg: '5',
            idotartam: 'perc/szint',
            hatotav: '15 láb',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Rejtett üzenet',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: 'egyszeri',
            hatotav: 'hallótáv',
        },
        varazslasIdeje: 'lásd leírás',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Távoli üzenet',
        pont: '25',
        misc: {
            erosseg: '25',
            idotartam: 'egyszeri',
            hatotav: 'korlátlan',
        },
        varazslasIdeje: '2 perc',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Távolság dala',
        pont: '10/szorzó',
        misc: {
            erosseg: '5',
            idotartam: 'lásd leírás',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Zajkeltés',
        pont: '1',
        misc: {
            erosseg: '1',
            idotartam: '1 kör',
            hatotav: '15 kör',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-hangmágia'],
        description: ``
    },
    {
        name: 'Alakváltás',
        pont: '15',
        misc: {
            erosseg: '1',
            idotartam: '2 perc/szint',
            me: 'lásd leírás'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Aura',
        pont: '3',
        misc: {
            erosseg: '1',
            idotartam: '10 kör',
            hatotav: '10 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Bűvharc',
        pont: '16',
        misc: {
            erosseg: '1',
            idotartam: 'kör/szint',
            hatotav: 'lásd leírás'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Délibáb',
        pont: '12',
        misc: {
            erosseg: '3',
            idotartam: '1 óra',
            hatotav: '5 mérföld'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Éjszakai látás',
        pont: '9',
        misc: {
            erosseg: '5',
            idotartam: '10 perc/szint',
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Élő történelem',
        pont: '21',
        misc: {
            erosseg: '1',
            idotartam: '1 perc/szint',
            hatotav: '15 láb'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fantom',
        pont: '23',
        misc: {
            erosseg: '3',
            idotartam: '1 óra',
        },
        varazslasIdeje: '3 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fantomsereg',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: '15 kör',
            hatotav: '50 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fegyver',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: '2 kör/szint',
            hatotav: 'bárd fegyvere'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Félelmetes fegyver',
        pont: '3',
        misc: {
            erosseg: '1',
            idotartam: '8 kör',
            hatotav: 'lásd leírás'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fénysugár',
        pont: '9',
        misc: {
            erosseg: '3',
            idotartam: '3 kör/szint',
        },
        varazslasIdeje: '2 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fénytánc',
        pont: '5',
        misc: {
            erosseg: '6',
            idotartam: '2 kör/szint',
            hatotav: '7 láb',
            me: 'A'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fényvarázs',
        pont: '3',
        misc: {
            erosseg: '1',
            idotartam: 'perc/szint',
            hatotav: '15 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fényvért',
        pont: '9',
        misc: {
            erosseg: '2',
            idotartam: '2 perc/szint',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Fókuszált fény',
        pont: '15',
        misc: {
            erosseg: '3',
            idotartam: 'kör/3 szint',
            hatotav: '6 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Hamis teleport',
        pont: '25',
        misc: {
            erosseg: '15',
            idotartam: '6 kör/szint',
            hatotav: '16 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Hasonmás',
        pont: '6/hasonmás',
        misc: {
            erosseg: '2',
            idotartam: '5 kör',
        },
        varazslasIdeje: '2 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Illúzió',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '15 perc/szint',
            hatotav: 'lásd leírás'
        },
        varazslasIdeje: '3 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Illúzióírás',
        pont: '15',
        misc: {
            erosseg: '2',
            idotartam: 'végleges',
        },
        varazslasIdeje: '5 perc',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Illúziótalaj',
        pont: '6',
        misc: {
            erosseg: '2',
            idotartam: '10 perc/szint',
            hatotav: 'lásd leírás'
        },
        varazslasIdeje: '5 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Irányvesztés',
        pont: '12',
        misc: {
            erosseg: '2',
            idotartam: '15 perc/szint',
            hatotav: '15 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Káosz',
        pont: '35',
        misc: {
            erosseg: '25',
            idotartam: 'perc/szint',
            hatotav: '20 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Kép',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: 'lásd leírás',
            hatotav: '5 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Képidézés',
        pont: '9',
        misc: {
            erosseg: '1',
            idotartam: 'perc/szint',
            hatotav: '12 láb'
        },
        varazslasIdeje: '5 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Ködalak',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '3 kör/szint',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Láthatatlanság',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '1 óra',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Lényalkotás',
        pont: '6',
        misc: {
            erosseg: '1',
            idotartam: '15 perc/szint',
            hatotav: '12 láb'
        },
        varazslasIdeje: '3 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Maszk',
        pont: '2',
        misc: {
            erosseg: '1',
            idotartam: 'lásd leírás',
        },
        varazslasIdeje: '3 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Mágiamegj',
        pont: '6',
        misc: {
            erosseg: '1',
            idotartam: '1 perc/szint',
            hatotav: '3 láb/szint'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Nyílzápor',
        pont: '7',
        misc: {
            erosseg: '1',
            idotartam: 'kör/szint',
            hatotav: '50 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Rejtjel',
        pont: '10',
        misc: {
            erosseg: '2',
            idotartam: '1 év',
        },
        varazslasIdeje: '3 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Rémítés',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: '5 kör',
            hatotav: '10 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Személyes varázs',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: '15 perc/szint',
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Szépségvarázs',
        pont: '12',
        misc: {
            erosseg: '2',
            idotartam: '6 óra',
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Színvarázs',
        pont: '1',
        misc: {
            erosseg: '1',
            idotartam: '1 nap/szint',
            hatotav: '5 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Szivárvány',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '2 perc/szint',
            hatotav: '20 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Tanulmány',
        pont: '2',
        misc: {
            erosseg: '1',
            idotartam: 'végleges',
            hatotav: '8 láb'
        },
        varazslasIdeje: '3 perc',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Tárgyalkotás',
        pont: '5',
        misc: {
            erosseg: '1',
            idotartam: '3 perc/szint',
            hatotav: 'érintés'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Tárgyátváltoztatás',
        pont: '6',
        misc: {
            erosseg: '1',
            idotartam: '1 nap/szint',
            hatotav: 'érintés'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Tárgyláthatatlanság',
        pont: '8',
        misc: {
            erosseg: '1',
            idotartam: '3 kör/szint',
            hatotav: '12 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Távolságtorzítás',
        pont: '9',
        misc: {
            erosseg: '2',
            idotartam: '15 perc',
            hatotav: 'lásd leírás'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Teljes álca',
        pont: '35',
        misc: {
            erosseg: '12',
            idotartam: '10 kör/szint',
            hatotav: '20 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Tükör',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: '3 kör/szint',
            hatotav: 'érintés'
        },
        varazslasIdeje: '2 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Üresség',
        pont: '18',
        misc: {
            erosseg: '2',
            idotartam: '5 perc/szint',
            hatotav: '20 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Vakon látás',
        pont: '35',
        misc: {
            erosseg: '15',
            idotartam: '5 perc/szint',
        },
        varazslasIdeje: '3 kör',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Vakság',
        pont: '8',
        misc: {
            erosseg: '1',
            idotartam: '3 kör',
            hatotav: '10 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-fénymágia'],
        description: ``
    },
    {
        name: 'Figyelem elterelése',
        pont: '2',
        misc: {
            erosseg: '1',
            idotartam: '1 szegmens',
            hatotav: '5 láb'
        },
        varazslasIdeje: '1 szegmens',
        labels: ['magia', 'bárd', 'bárd-egyéb'],
        description: ``
    },
    {
        name: 'Hipnózis',
        pont: '20',
        misc: {
            erosseg: '6',
            idotartam: 'perc/szint',
            me: 'A',
            hatotav: '3 láb'
        },
        varazslasIdeje: '1 perc',
        labels: ['magia', 'bárd', 'bárd-egyéb'],
        description: ``
    },
    {
        name: 'Rohanó idő',
        pont: '34',
        misc: {
            erosseg: '15',
            idotartam: 'perc/szint',
            hatotav: '15 láb'
        },
        varazslasIdeje: '1 kör',
        labels: ['magia', 'bárd', 'bárd-egyéb'],
        description: ``
    },
    {
        name: 'Tanulás',
        pont: '4',
        misc: {
            erosseg: '1',
            idotartam: 'végleges',
            hatotav: '10 láb'
        },
        varazslasIdeje: 'lásd leírás',
        labels: ['magia', 'bárd', 'bárd-egyéb'],
        description: ``
    },


];

export const VARAZSLAT_LABELS: Record<string, string> = {
    name: 'Varázslatok',
    pont: 'MP',
    me: 'ME',
    idotartam: 'Időtartam',
    erosseg: 'E',
    hatotav: 'Hatótáv',
    varazslasIdeje: 'Varázslás ideje'
}

export const PSZI_LABELS: Record<string, string> = {
    name: 'Diszciplinák',
    pont: 'ΨP',
    me: 'ME',
    idotartam: 'Időtartam',
    varazslasIdeje: 'Meditáció ideje'
}