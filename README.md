<img src="images/header.jpg">

## Sommaire <!-- omit in toc -->
- [A. Objectif](#a-objectif)
- [B. Modalités de rendu](#b-modalités-de-rendu)
- [C. Critères d'évaluation](#c-critères-dévaluation)
- [D. Arborescence](#d-arborescence)
- [E. Fonctionnalités](#e-fonctionnalités)
	- [E.1. Header](#e1-header)
	- [E.2. Page d'Accueil](#e2-page-daccueil)
	- [E.3. Page Résultats de recherche](#e3-page-résultats-de-recherche)
	- [E.4. Page Détail d'une série](#e4-page-détail-dune-série)
- [F. Précisions techniques](#f-précisions-techniques)
	- [F.1. Stack technique](#f1-stack-technique)
	- [F.2. Contenu du repo](#f2-contenu-du-repo)
	- [F.3. Installation](#f3-installation)
	- [F.4. API REST/JSON](#f4-api-restjson)
	- [F.5. UX](#f5-ux)

## A. Objectif
**Au cours de ce CTP vous aurez à réaliser une Single Page App qui doit permettre à un utilisateur de trouver la prochaine série qu'il spoilera dans ses cours.**

Ce CTP doit être réalisé seul sans échange entre étudiants.

Les documents sont en revanche autorisés (pdfs des cours, précédents TPs, notes perso).

## B. Modalités de rendu
Votre rendu devra se faire via un repository gitlab **PRIVÉ** (_tout repository public sera considéré comme **éliminatoire** et noté 0/20_) cf. instructions plus bas.

> 🚨 _**Important :**_ 🚨 _Vous devez **commit et push** régulièrement. **Les logs (y-compris la fréquence de push) serviront à la notation**._

1. votre fork doit **OBLIGATOIREMENT être placé dans votre dossier PERSONNEL**
2. votre fork doit **OBLIGATOIREMENT être "PRIVÉ"**
3. votre fork doit **OBLIGATOIREMENT avoir comme path "ctp-react-nom-prenom-2023-2024"** (remplacez nom et prenom...)
4. vous devez **OBLIGATOIREMENT ajouter `@gery.casiez` ⚠️ ET ⚠️ `@thomas.fritsch` (les 2) en `"reporter"`**

Tout manquement à une des 4 règles ci-dessus est éliminatoire.

**La date limite pour push votre code est ce vendredi à 15h30**. Tout commit qui arrivera passé cette date ne sera pas pris en compte dans la notation (sauf pour les tiers-temps).

## C. Critères d'évaluation
Vous serez évalués sur :
- le respect du cahier des charges
- la qualité du code de votre application ([DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas), [YAGNI](https://fr.wikipedia.org/wiki/YAGNI), [KISS](https://fr.wikipedia.org/wiki/Principe_KISS))
- le nombre, la fréquence et la qualité de vos messages de commit (_pour faciliter la correction, préfixez vos commits du numéro de l'exercice correspondant_). **N'OUBLIEZ PAS DE PUSH à chaque commit !**
- les performances
- ⚠️⚠️⚠️ **L'ABSENCE DE SIMILITUDES AVEC LE CODE DE VOS CAMARADES...** ⚠️⚠️⚠️

> _**pro tip :** Pensez que vous n'êtes pas obligé de faire tout dans l'ordre qui vous est présenté, lisez le sujet en entier et concentrez vos premiers efforts sur les parties qui vous semblent les plus faciles et sur lesquelles vous êtes certain de gagner des points._

**A titre indicatif voici le barème prévisionnel** (il peut être amené à évoluer) :
- propreté code + log git : 5 points
- header : 2 points
- accueil : 5 points
- recherche : 4 points
- détail : 4 points

> _**NB :** les exercices "facultatifs", viennent en bonus de ce barème_

## D. Arborescence
L'application que vous développerez suivra l'arborescence suivante :
```
Accueil (url "/")
    ├─ Résultats de recherche (url "/resultats/:marecherche")
    └─ Détail série (url "/series/:id")
```

## E. Fonctionnalités
### E.1. Header
Le header contient le logo de l'application et le formulaire de recherche :

- Quand on clique sur le logo on doit **revenir à l'accueil**.
- Quand on soumet le formulaire de recherche, on doit **afficher la page de résultats de recherche**.

### E.2. Page d'Accueil
Sur la page d'accueil l'utilisateur de votre site doit pouvoir consulter une liste des 12 premières séries retournées par un webservice qui vous est fourni (cf. [API REST/JSON](#api-restjson)).

Pour chaque série vous afficherez :
- l'image d'illustration de la série
- le titre de la série
- sa date de première diffusion
- son résumé
- sa note

_**facultatif** : plutôt que d'afficher toujours les 12 premières séries, vous pouvez en choisir 12 au hasard parmi les 250 retournées par le webservice._

### E.3. Page Résultats de recherche
Dans cette page on présente à l'utilisateur la liste des séries qui correspondent à la chaîne de caractères qu'il a saisie dans le formulaire de recherche.

Cette page contient :
- un titre avec la chaîne recherchée et le nombre de résultats
- la liste des résultats avec pour chaque série les mêmes informations que sur la page d'accueil

### E.4. Page Détail d'une série
Dans cette page vous afficherez les informations détaillées de la série choisie par l'utilisateur. En plus des informations de la page de résultats, vous afficherez :
- un lien vers le site officiel de la série
- _**facultatif**_ : la liste des 5 derniers épisodes de la série :
	- titre
	- date de diffusion
	- image si elle existe
	- résumé de l'épisode (masqué par défaut mais un bouton "spoil" permet de l'afficher/masquer)

## F. Précisions techniques

### F.1. Stack technique
Comme vous vous en doutez, vous devrez coder votre application avec React.

Vous pouvez utiliser [React Router](https://reactrouter.com/) en revanche étant donné le temps disponible, nous vous **déconseillons** d'utiliser [Redux](https://redux.js.org/).

### F.2. Contenu du repo

Pour vous simplifier le démarrage du projet, nous vous fournissons :

- un fichier `index.html` et des fichiers CSS + images
- un fichier `src/app.jsx` déjà renseigné comme point d'entrée dans `index.html`
- un fichier `package.json` déjà configuré avec les dépendances suffisantes pour le CTP (_react + react-dom + react-router-dom_).
- tous les fichiers de config nécessaires pour vscode (`.prettierrc`, `launch.json`, `vite.config.mjs`, etc.)

Enfin vous trouverez également des fichiers [`exemple-accueil.html`](./exemple-accueil.html),  [`exemple-recherche.html`](./exemple-recherche.html) et [`exemple-detail.html`](./exemple-detail.html) qui contiennent des exemples de code HTML que votre application peut générer pour avoir un rendu "propre" avec les CSS qui vous sont fournies :

<img src="./images/exemple-accueil.png">

<img src="./images/exemple-recherche.png">

<img src="./images/exemple-detail.png">

> _si vous souhaitez adapter les styles qui vous sont fournis vous le pouvez mais attention au temps !_

### F.3. Installation

1. **Clonez votre fork** (_après avoir vérifié qu'il remplit bien les critères décrits au point [B. Modalités de rendu](#b-modalités-de-rendu)_) :
	```
	git clone https://gitlab.univ-lille.fr/<votre-username>/ctp-react-<nom>-<prenom>-2023-2024.git ~/tps-react/ctp-react
	```
2. **Ouvrez votre projet dans vscode**
3. **Installez les dépendances du projet** (déjà configurées dans le package.json) :
	```
	npm i
	```
4. **Lancez le serveur de développement :**
	```
	npm start
	```
5. **Lancez une session de debug dans vscode en appuyant sur la touche <kbd>F5</kbd>**
6. **Le résultat attendu dans le navigateur est le suivant :**

	<img src="images/screen-00.png">


### F.4. API REST/JSON
L'API REST que l'on vous propose d'utiliser est celle du site TVMaze dont la documentation se trouve ici : https://www.tvmaze.com/api

Elle a l'avantage d'être gratuite, rapide et d'offrir de base **toutes les fonctionnalités dont vous aurez besoin dans ce projet** :
- **Pour la page d'accueil**, vous pouvez utiliser le point d'entrée décrit dans la documentation ici : https://www.tvmaze.com/api#show-index et piocher 12 séries parmi la liste des 250 séries retournées par le webservice.
- **Pour la recherche :** https://www.tvmaze.com/api#show-search
- **Pour la page détail :** https://www.tvmaze.com/api#show-main-information

> _**NB :** un **quota de requêtes par seconde** est appliqué pour chaque adresse IP (https://www.tvmaze.com/api#rate-limiting), normalement vous ne devriez pas être impactés car les résultats des appels les plus courants sont mis en cache par leurs load balancers (cf. https://www.tvmaze.com/api#caching)._
>
> _⚠️⚠️⚠️ **!!! mais ATTENTION !!!!** ⚠️⚠️⚠️_ \
> **Lorsque vous ferez vos premiers appels à l'API, prenez IMPERATIVEMENT quelques secondes pour vérifier dans l'onglet "Réseau"/"Network" des devtools du navigateur que votre composant ne lance pas en BOUCLE INFINIE des appels AJAX vers l'API !**
>
> _Si néanmoins vous rencontriez des soucis d'appels à l'API, attendre quelques secondes que le quota soit réinitialisé devrait suffire sauf si l'IP de l'Université est blacklistée... Si ça ne suffit pas, vous trouverez dans le dossier `stubs` des fichiers JSON qui peuvent servir de ["bouchon" (_wikipedia_)](https://fr.wikipedia.org/wiki/Bouchon_(informatique)) :_
> - _pour la liste des séries de la page d'accueil : [stubs/shows.json](./stubs/shows.json)_
> - _pour la liste des résultats de recherche : [stubs/search.json](./stubs/search.json)_
> - _pour le détail d'une série : [stubs/detail.json](./stubs/detail.json)_

### F.5. UX
Pensez que comme vous êtes dans une SPA, rien n'indique à l'utilisateur qu'un chargement est en cours. Par conséquent, essayez autant que possible de **signaler à l'utilisateur lorsqu'une page charge des données en AJAX** (_par le biais d'un loader, ou d'un message de chargement en cours par exemple_)

Votre application doit aussi supporter le **deep-linking** c'est-à-dire que si l'on charge directement la page /series/15299 on doit avoir la page de détail de la série "The boys" (_id 15299_) qui s'affiche directement.


## c'est parti <!-- omit in toc -->

<img src="images/cook.gif">