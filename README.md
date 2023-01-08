# Kabe veebirakendus

## Eesmärk
Eesmärk oli luua interaktiivne rakendus, kus kasutaja saab mängida kabet erinevate algoritmide vastu. Lisaks saab kasutaja vaadata, kuidas erinevad algoritmid omavahel mängivad.

Reegliteks on tavalised kabereeglid. Oluline on tähelepanna, et kui saab süüa, siis peab sööma. Kui kasutada "Master AI" raskustaset, siis tuleb tähelepanna, et arvuti vajab veidi rohkem aega mõtlemiseks (viivist võib esineda).

Otsustasin projekti mitte Colabis teha, sest tahtsin ära kasutada juhendis välja toodud punkti "inimese ja arvuti vaheline suhtlus" ja arvasin, et veebirakenduse puhul on seda lihtsam implimiteerida. Tänu Vue kasutamisele sain rakenduse inimese jaoks palju interaktiivsemaks tehtud.

## Algoritmid
* Rumal - Valib alati juhusliku käigu.
* Keskmine - Arvestab käikude korral enda punktiskoori, aga ei arvesta vastase punktiskoori.
* Raskeim - Arvestab nii vastase kui ka enda punktiskoori [(minimax)](https://en.wikipedia.org/wiki/Minimax).

## Töö jaotus
Jäin kaaslaste leidmisek liiga hiljaks ja seetõttu tegin üksinda.

## Testid
Testid on näha /tests/unit kaustas.

## Töökäik
Esmalt tuli paika saada üldine loogika. See haldas laua kuvamist, mnuppude paigutamist ja nuppude liigutamist. Edasi hakkasin paika panema erinevaid algoritme. Pärast algoritmide valmimist hakkasin neid testima ning peale testimist implementeerisin nad rakendusse sisse. Kõige selle käigus kaasnesid igasugused bugi lahendamisesd, disaini koostamine jne.

## Probleemid
Põhiprobleemiks oli aeg. Ajapuuduse tõttu ei saanud rakendust piisavalt täiendada, nii et kasutaja saaks vajaliku tagasisidet. Näiteks sellel ajal, kui algoritm mõtleb oleks hea, kui kasutajale kuvada mingit "loading" laadset asja. Lisaks oleks tahtnud disaini kallal rohkem vaeva näha, aga hetkel jääb see tuleviku plaanideks.

## Enne rakenduse käivitamist tee kindlaks
* Nodejs on alla laetud. [Download link](https://nodejs.org/en/download/)
* Port 8080 on vaba.
* On olemas mingi IDEA, millega rakendust jooksutada (Intellij, VSC jne)

## Rakenduse jooksutamine
Alguses:
```
npm install
```
Käivitamine:
```
npm run serve
```
