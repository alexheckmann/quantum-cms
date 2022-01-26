# quantum-cms

[Quantum CMS](https://qntm-cms.heroku-app.com) application

## Projektteilnehmer

- Alexander Heckmann, MatNr. 298068
- Alexander Aichholz, MatNr. 298158

## Purpose

Problemstellung

- Die Verantwortlichen für den Inhalt einer Website können diesen nicht einfach auf der Seite ändern, da dies im HTML
  geschehen muss.
- Zusätzlich muss im Zweifel durch die Änderung im HTML die Seite neu deployed werden.

Lösung

- Content Management System, mit dem man Website-/App-Inhalte an zentraler Stelle verwalten und per API in die Website
  einbinden kann.

Abheben von anderen CMS

- intuitiv und leicht zu bedienen (leider auch weniger Features)

## Persona

Pauline (27)

- Arbeitet im Startup als Marketing-Experte und SEO.
- Das Startup ist in der Modebranche und baut gerade seine Website auf.
- Perfektionist
- Wortgewandt
- Verbringt ihre Zeit gerne mit Lesen und Poetry Slams
- Sitzt in Cafés mit einem Chai Latte, Avocado-Toast und klassischer Musik
- Fährt gerne im Sommer Rennrad um den Bodensee
- Er möchte die Textinhalte auf der neuen Website perfekt passend haben, hat aber keinerlei Kenntnisse von HTML und
  braucht eine Möglichkeit, die Texte selbstständig ändern zu können.

Kevin (35)

- Hat gerade seinen Bachelor in Informatik gemacht und hat als Frontend-Entwickler im Busreiseunternehmen seines kleinen
  Bruders angefangen
- Nimmt sich gerne seine Zeit, liebt Pizza
- Hat gerne seine Ruhe
- Seinen Feierabend verbringt er gerne im Discord mit seinen Studienfreunden beim Zocken oder beim Diskutieren über
  Kryptowährungen
- Am Wochenende geht er gerne in Bars zum Billard spielen
- Seinen Urlaub verbringt er am liebsten in Berlin
- Er ist genervt davon, ständig vom Marketing Vorschläge zu bekommen, was man denn auf der Website hinschreiben kann,
  nur weil sie selber keine Änderungen am Frontend machen können

Luigi (32)

- Ist Besitzer eines Concept Restaurants, in dem jede Woche die Küche einer anderen Region gezeigt wird, um die
  Vielseitigkeit der italienische Kultur unter die Leute zu bringen
- Kocht für sein Leben gerne
- Ist charmant und gesellig
- Sehr temperamentvoll
- Könnte den ganzen Tag nur über Essen reden
- Will seinen Besuchern das bestmögliche Erlebnis bieten
- Findet Technologie unwichtig, nur Mittel zum Zweck, das Leben findet auf der Straße statt
- Er würde am liebsten den gesamten Sommer in der Toskana bei seiner Familie verbringen, aber dann würde er gleichzeitig
  auch sein Restaurant vermissen
- Eine Website hat er durch eine Agentur entwickelt bekommen, um die wechselnde Speisekarte anzupassen haben sie ihm der
  Einfachheit halber ein CMS empfohlen. Dadurch wirkt die Website eleganter als mit einer eingebetteten PDF.

## Product Overview & Main Features

"Main"-features:

- Als Content-Verantwortlicher benötige ich ein Interface zur Verwaltung von Text-Inhalten, sodass ich diese einfach
  ändern kann.
- Als Frontend-Entwickler benötige ich einen Link zum Endpunkt, um Text-Inhalte über eine API in meine Website einbinden
  zu können
- Als Content-Verantwortlicher benötige ich die Möglichkeit, die Einträge meiner Kollegen zu sehen, um gut mit ihnen
  zusammen arbeiten zu können.
- Als Content-Verantwortlicher benötige ich eine Möglichkeit zur Registrierung, um persönliche Inhalte verwalten zu
  können.

"Nice 2 have"-features:

- Als Content-Verantwortlicher benötige ich die Möglichkeit, Bilder verwalten zu können, um Bildinhalte auf meiner
  Website auch einfach ändern zu können.
- Als Content-Verantwortlicher benötige ich die Möglichkeit, Videos verwalten zu können, um Bildinhalte auf meiner
  Website auch einfach ändern zu können.
- Als Content-Verantwortlicher würde ich gerne verschiedene Versionen meines Texts verwalten können, um zur Not wieder
  auf eine ältere Version wechseln zu können.
- Als Content-Verantwortlicher würde ich gerne nach Inhalten suchen können, um diese schnell zu finden.

"Too hard"-features:

- Als Content-Verantwortlicher würde ich gerne die Single-Sign-On-Lösung meines Unternehmens nutzen können, um das
  Einloggen simpler zu haben.
- Als Content-Verantwortlicher hätte ich gerne Vorschläge zu Textinhalten basierend auf Keywords, um möglichst schnell
  mit den Inhalten fertig zu werden.

## Kreativ-Prozess

### Farbgebung

Als Farben wurden Blautöne sowie leichte Grautöne genutzt, um Professionalität und Intuitivität rüberzubringen.

### Wireframes

Teile des Prototypings / Wireframes / Routing für Public Pages sind hier
einzusehen: [Wireframes](https://www.figma.com/file/SZDct0TmvQygDVJyrwxgkn/Wireframe?node-id=0%3A1).

## User Groups

1. Besucher
2. Registrierter Benutzer
3. Admin der Organisation
4. Admin einer Arbeitsgruppe

## Funktionsbereiche & Autorisierung

#### Public

Uneingeloggte User können nur auf views in _pages/public/_ & _pages/entrance/_ zugreifen. Dies hat den Hintergrund, dass
User auf diesen Seiten nur Informationen sammeln können sollen. Der Zugriff auf _entrance/_ ist nötig, um den
priviligierten Bereich betreten zu können.

#### Privilegierter Bereich

Im eingeloggten Bereich können die Funktionen der Web-Applikation genutzt werden (siehe Editor).

#### Admin-Bereich

Als Admin einer Organisation hat der Benutzer folgende Möglichkeiten:
`pages/organisation/index.ejs`

- Den Namen der Organisation editieren.
- Mitglieder der Organisation mit der Rolle 'Member' aus dieser entfernen.
- Mitglieder der Organisation mit der Rolle 'Member' als Admin ernennen.
- Das Abonnement (Premium, Enterprise, Standard) der Organisation ändern.

Als Admin einer Arbeitsgruppe hat der Benutzer folgende Möglichkeiten:
`pages/groups/index.ejs`

- Den Namen und die Beschreibung einer bestehenden Gruppe verändern.
- Mitglieder der selben organisation, welche noch nicht in der Gruppe sind, zu dieser hinzufügen.
- Mitglieder der Gruppe mit der Rolle 'Member' aus dieser entfernen.
- Mitglieder der Gruppe mit der Rolle 'Member' als Admin der Gruppe ernennen.

Bei beiden Adminrollen wurde die Autorisierung nicht über zentrale Policies geprüft, sondern über dezentrale Abfragen in
den jeweiligen Controllern geprüft. Dies wurde so gelöst, da Sails diese Lösung selbst als Best Practice in der
Dokumentation beschrieben hat. Zudem wurde ausdrücklich davon abgesehen, andere Admins von ihrer Rolle entbinden zu
können, da dadurch organisatorische Probleme entstehen können, Situationen, in denen es keinen Admin mehr geben könnte
oder in denen diese Funktion für falsche Zwecke verwendet wird.

### Änderungen abhängig von Benutzergruppe

# Der Editor

Der Editor ist das Herzstück der Web-App. Durch dessen Komplexität wird hier deshalb ein extra Kapitel hierfür
verwendet. Für den Editor wurde ausschließlich Client-Side Rendering genutzt, die Daten kommen per API Calls als JSON
vom Server. Diese werden dann durch Vue.js verarbeitet. Eine genauere Beschreibung kommt in den folgenden Unterkapiteln.

Der Editor wird über _/dashboard_ aufgerufen.

Zur Vereinfachung der Dokumentation und Nachvollziehbarkeit, wird in diesem Kapitel eine verkürzte Schreibweise der
Pfade verwendet:

_**index.ejs**: views/pages/textcontent/index.ejs_

_**api/x.js**: api/controllers/api/textcontent/x.js_

## Funktionen

Der Editor ist in erster Linie natürlich nur ein Formular zum Ausfüllen.

### Starten

Beim Starten des Editors werden erstmal aus verschiedenen Quellen alle nötigen Daten gesammelt und alles initialisiert.
Da Inhalte nur verfasst werden können, wenn eine Gruppe ausgewählt wurde, werden alle Gruppen, denen der User angehört,
geladen. Eine Auswahl findet der User in der linken unteren Ecke, am Fuße der Seitenleiste. Sollte er keiner Gruppe
angehören, bekommt er einen Button angezeigt, der ihn dazu auffordert, sich einer Gruppe anzuschließen oder eine zu
gründen.

Sobald mind. eine Gruppe vorhanden ist, wird eine Liste aller Einträge für die derzeitige Gruppe geladen. Nun kann der
User auswählen, ob er an einem bestehenden Eintrag arbeiten möchte, oder ob er einen neuen Eintrag erstellen will.
Standardmäßig wird der Inhalt so geladen, dass ein neuer Eintrag erstellt werden kann. Wird ein Eintrag ausgewählt, wird
dieser zusätzlich in der Seitenleiste gehighlightet, um den Überblick zu bewahren. Zusätzlich werden alle
Eintrag-spezifischen Daten geladen.

#### Implementierung

Initial wird überprüft, ob eine Organisation vorhanden ist. Wenn ja, können Gruppen geladen werden. Der Methodenaufruf
findet im `created()`-Lifecycle-Hook von Vue (_siehe index.ejs:Vue:created()_) statt, der ausgeführt wird, sobald Vue
fertig geladen ist. Die Gruppen werden via AJAX Call in `loadAllGroups()`(_siehe index.ejs:Vue:methods:loadAllGroups()_)
geladen. Zusätzlich wird der erste Eintrag, der geladen wird, als `currentGroup` gesetzt, um die UX zu verbessern.
Dadurch muss der User nicht immer aufwendig erst eine Gruppe auswählen, sobald er die Seite neu lädt. Die Gruppenauswahl
wird durch einen Klick auf den **Select a group**-Button (_
siehe index.ejs:#app-dropdown-button && index.ejs:Vue:methods:
listAllGroups()_) angezeigt. Dadurch wird ein boolean gesetzt, der durch `v-if` die Anzeige togglet. Der Button zeigt,
je nachdem, ob eine Gruppe ausgewählt ist (`currentGroup !== null)` oder nicht, den Namen der derzeitigen Gruppe bzw.
_Select a group_ an.

Für die Liste gibt es drei Fälle, die berücksichtigt werden:

- `allGroups.length === 0`: _Create or join a group!_ als Text mit Link auf die Gruppenerstellung.
- `allGroups.length === 1 && currentGroup !== null`: _Create or join a group!_ als Text mit Link auf die
  Gruppenerstellung.
- `allGroups.length > 1`: 'v-for'-Direktive, die über alle Einträge von `allGroups` iteriert mit
  zusätzlichem `v-if="grp !== currentGroup"`, damit eine Übersicht aller anderen Gruppen gewährleistet ist.

Den **Join or create group**-Button bekommt der User über die `v-if`-Direktive von Vue angezeigt,
wenn `allGroups.length === 0`, also wenn er keiner Gruppe angehört.

Sobald eine Gruppe ausgewählt ist, also `currentGroup !== null`, wird der Eintrag in der Seitenleiste
durch `:class="{'app-active-nav-link': entry.id === id}"` umgestylet.

### Funktionen für Editing-Zwecke

Hier können Inhalte geschrieben und Titel vergeben werden, die die Inhalte prägnant beschreiben sollen. Der Titel ändert
sich dynamisch, sobald eine Eingabe erfolgt.

Des Weiteren wird angezeigt, wann ein Eintrag verfasst wurde, wer der Autor ist und - falls passiert - wer zu welchem
Zeitpunkt ein Update durchgeführt hat, indem er Titel und / oder Inhalt geändert hat.

Sobald der User zufrieden mit dem Eingetippten ist, kann er den **Save**-Button nutzen, um einen neuen Inhalt oder ein
Update zu speichern.

#### Implementierung

Nutzung von `v-models` für Titel & Content zur dynamischen Anpassung der Einträge.

### Versionierung

Sobald ein User einen Inhalt abspeichert, wird auch automatisch ein Archiveintrag für die überschriebene Version
erstellt. Alle bisherigen Versionen eines Eintrags können durch Klicken auf den **Retrieve older versions**-Button
aufgelistet werden. Durch das Klicken auf einen der Einträge wird die jeweilige Version geladen.

#### Implementierung

In _api/update.js_ wird bei jedem Speichern zusätzlich eine Version im Archiv erstellt.

Alle alten Versionen werden geladen, sobald der User im Editor einen spezifischen Eintrag auswählt (Methodenaufruf
loadOldVersions() siehe _index.ejs:Vue:methods:loadSingleEntry()_. In der Methodendeklaration (siehe _index.ejs:Vue:
methods:loadOldVersions_) wird ein AJAX Call gemacht auf _api/findoldversions.js_, der alle älteren Versionen des
derzeitigen Eintrags zurückgibt.

### Revert

Sollte der User jedoch unzufrieden sein, kann er den **Revert**-Button nutzen, um den Inhalt auf die Ausgangssituation
zurückzusetzen - leer bei neuen Einträgen, die letzte angefragte Version bei bereits vorhandenen Einträgen. Auch beim
Wechsel zwischen Versionen ist immer die ursprünglich geladene Version als Ausgangssituation gesetzt. Dadurch kann der
User ohne Probleme zwischen alten Versionen und der aktuellsten wechseln.

#### Implementierung

Beim Laden eines Inhalts werden `title` & `content` auf die Inhalte der API-Response gesetzt. Um ein Zurücksetzen zu
ermöglichen, wurden zusätzlich noch `originalTitle` & `originalContent` eingeführt, die eine exakte Kopie der
Response-Inhalte darstellen, im Gegensetz zu `title` & `content` allerdings nie geändert werden.

Beim `@click` des Revert-Buttons werden dann `title` & `content` mit dem `orginalTitle` & `originalContent`
überschrieben.

### Status-Flag

Das Status-Flag gibt dem User an, in welchem Zustand sich der angezeigte Inhalt befindet. Hierbei gibt es 4 verschiedene
Zustände: `NEW`, `ACTIVE`,`UNPUBLISHED` & `OLD_VERSION`. `NEW` wird angezeigt, wenn ein neuer Inhalt erstellt wird.
`ACTIVE` wird angezeigt, wenn ein Inhalt geladen wird und unverändert ist. Wird dieser verändert, wird der Status
auf `UNPUBLISHED` gesetzt. Wenn eine alte Version aus dem Archiv geladen wird, ändert sich der Status auf `OLD_VERSION`.

#### Implementierung

Für den Status wurde ein enum mit `Object.freeze()` genutzt. In diesem enum ist ein Eintrag für einen der Einträge mit
Text, der angezeigt werden soll, und einer entsprechenden CSS-Klasse (siehe _index.ejs:State_). Der Status wird durch
ein `@input`-Attribut mit der Methode `changeStatus()`(_siehe index.ejs:Vue:methods:changeStatus()_) bei Titel & Content
geändert. Beim Drücken des **New**-Buttons, also bei Aufruf der Methode `createNewEntry()`, wird der Status `NEW`
gesetzt. Beim Drücken des **Revert**-Buttons und beim Laden eines neuen Inhalts wird der Status auf `ACTIVE` gesetzt.

## Styling

Für das Styling werden verschiedene Möglichkeiten genutzt. Es wurden die Bootstrap Utilities genutzt, wo es möglich ist.
Für den Rest des Stylings wurde ein Mix aus styles.css und Inline-CSS genutzt.

### Inline CSS

Inline-CSS wurde an allen Stellen aus technischen Gründen genutzt, um Layoutverschiebungen zu vermeiden. Bei Vue.js gibt
es die Möglichkeit, das `v-cloak`-Attribut bei Tags zu setzen. Dieses wird dann entfernt, sobald die Vue-Instanz
vollständig geladen wurde. In unserer Applikation wurde das dann so genutzt, dass Elemente, die durch Vue verarbeitet
werden, ein `display: none` bekommen (siehe _style.css:171_). Dies soll die User Experience erhöhen, damit die
technischen Aspekte komplett transparent sind für den User. Dadurch kommt es natürlich zu Verschiebungen des Layouts,
die durch diese Inline-Styles umgangen wurden.

Beispiele für `v-cloak`: views/pages/textcontent/index.ejs

1. Zeile 29: Ausblenden des Renderns aller Einträge in der Seitenleiste
2. Zeile 43: Ausblenden von `{{ currentGroup.name }}`
3. Zeile 70: Ausblenden von `{{ title }}` => würde in Layoutverschiebung resultieren, präventiert durch Inline-CSS in
   Zeile 69 im nächsthöheren `div`
4. Zeile 78: Ausblenden vom Status-Flag

### Nutzung des Stylesheets

`styles.css` wurde nur an Stellen genutzt, an denen es mit ausschließlicher Nutzung von Bootstrap nicht möglich gewesen
wäre, ein responsives & ansprechendes UI zu stylen. Dies liegt zum Einen an der Unvollständigkeit der Utility Classes,
andererseits natürlich an der Individualität unseres UIs sowie dessen Breakpoints. Beispiele für die Nutzung des
Stylesheets statt Bootstrap sind alle Situationen, in denen `cursor: pointer`, individuelle `height` / `width`
/ `max-width`

# Themen

## MVC

Es wurden Models für die Erstellung von Datenentitäten genutzt, Controller basierend auf Sails.js-Actions zur
Interaktion mit den Models sowie Views basierend auf EJS-Templates zur

## Styling

### Pure CSS

Das individuelle Styling befindet sich in _style.css_. CSS wurde an Stellen genutzt, an denen die Bootstrap Utilities
nicht vorhanden oder nicht ausreichend waren. Zudem wurde es genutzt, um Bootstrap-Standards zu überschreiben, bspw. die
Schrift
_style.css_ wurde modular aufgebaut, anfangs findet man von uns verfasste Utility-Classes wie bspw. verschiedene Font
Sizes, Hintergründe oder Klassen für `border-radius` & `box-shadow`, damit diese durch das gesamte Styling das gleiche
Verhalten besitzen. Gerade die Font Sizes sind wichtige Utility Classes, da die Standard-Font Size von Bootstrap nicht
per se responsiv ist, dies wird nur durch Media-Queries ermöglicht; durch die Verwendung der `clamp()`-Funktion wurde
hier die Schriftgröße so gesetzt, dass sie mit der View Width skaliert, ganz ohne Media Queries und sprunghafte
Änderungen der Schriftgröße. Dadurch ist zu jedem Zeitpunkt eine optimale Schriftgröße für den User gegeben.

Nach den Utility Classes folgt `:root`, wo wir eigene Variablen zur Wiederverwendung innerhalb des Stylesheets
eingebunden haben. Diese geben das Farbschema unseres Designs wider.

Danach wird die Reihenfolge eines `html`-Dokuments durchgegangen. Im `body` gibt es eine wichtige Funktionalität, dort
wird `display: flex, flex-direction-column, min-height: 100vh` gesetzt, damit auf Seiten, die nicht viel Inhalt haben,
der Footer trotzdem immer am unteren Bildschirmrand sitzt. Um das zu machen, muss der oberste Tag einer `.ejs`
ein `<div class="flex-fill ...">` sein. Beispiele hierfür sind _/organisation/new_, _/groups/new_.

Um unserer Website den Look & Feel einer wirklichen Applikation zu geben, wurde (zumindest für die Browser, die auf
Webkit aufbauen) die Scrollbar umgestylet. Dies wurde durch die `::-webkit-scrollbar-*`-Klassen erreicht.

Durch die Verwendung von mehreren Pseudo-Klassen wurde ein Toggle-Switch designt, der an Material Design angelehnt ist.

Weitere Beispiele für komplexere CSS-Konstrukte ist das Styling des **delete**-Buttons im Dashboard, der je nach Status
disabled oder nicht ein komplett anderes Styling erhält. Dadurch entstehen lange Selektoren
wie `#app-delete-button:not(:disabled):hover`.

CSS-Transitions & Animationen werden sinnvoll verwendet, um dem User eine hochwertigere Bedienung der Applikation zu
bieten, bspw. beim Ausklappen der Mobile Navbar, dem Burger Menu oder auf dem Dashboard beim hover über die Tags.
Hierfür wurde auch ein eigener Keyframe `fadeIn` definiert.

Breakpoints für media-queries wurden nicht von Bootstrap übernommen, sondern anhand eigener Erfahrungen mit unserem
Layout gesetzt und konsequent optimiert.

### Bootstrap

Von Bootstrap wurden größtenteils nur Utility Classes verwendet, da der Rest den Anforderungen an die Applikation nicht
gerecht wurde. An mehreren Stellen wurde zwar probiert, Bootstrap-Komponenten zu nutzen, allerdings ist dies immer an
technischen Hürden gescheitert. Ein Beispiel ist die Verwendung von Bootstrap-Dropdown für das Laden alter Versionen im
Editor; dies ist daran gescheitert, dass das von Bootstrap hinterlegte JS schneller ausgeführt wurde als der AJAX Call
zum Bekommen der Daten, weswegen es zu einem Client Side Error kommt. Aufgrund solcher Errors wurde entschieden,
Bootstrap nur für dekorative Zwecke zu nutzen und solche Funktionalitäten selber zu implementieren.

## JavaScript

- `assets/js/navbar-animation.js`: querySelector, EventListener and toggle für Menü- und burger animation.
- `checkCookie()`, `getCookie()` und `setCookie()` Funktionen mit DOM Manipulation für den Cookie Banner
  in `views/partials/public/cookies.ejs`
- function `ignoreKeys(e)` in `assets/js/pages/groups/index.page.js` um das wechseln der Gruppe mit der Tastatur zu
  deaktivieren, da bei zu schnellem Wechsel der Gruppe das HTML der vorherigen Gruppe ebenfalls angezeigt wird.
- `copyURL: async function (mytext)` in `views/pages/textcontent/index.ejs` um ein Textelement zum Clipboard zu
  kopieren.
- `assets/js/pages/subscription/select.page.js`: Hinzufügen und entfernen von Klassen mit
  document.getElementsByClassName, addEventListener und querySelector.
- Nutzung von eingebauter JS-Funktion `history.back()` zum Zurückspringen auf die davorliegende Seite auf _
  /organisation/new_ & _/groups/new_.

### Vanilla JavaScript

#### DOM Manipulation

assets/js/navbar-animation.js

### jQuery

Organisation `assets/js/pages/organisation/index.page.js`:

- `.show()` & `.hide()` von allen Toolbar Elementen in den Funktionen `showOrgAdminTools()` und `showOrgMemberTools()`.
- function `createOrgTableChk(data)` erzeugt eine Tabelle mit Checkboxen, dabei werden die html-Elemente
  über `$('<element>')` generiert und mit `.append()` zur Tabelle hinzugefügt.
- function `resetOrgMembersTable()` leert eine Tabelle über `$('#orgMembersTable').empty()`.
- function `selectAllOrg()` setzt alle Checkboxen die nicht deaktiviert sind auf checked oder umgekehrt.
- `window.onload = () => { fetchOrgData();}` in `pages/organisation/index.ejs` um die Daten der Organisation zu laden.

Groups `assets/js/pages/groups/index.page.js`:

- function `createOptions(data)` holt das Select Element `$('#selectGrp')` und fügt option-Elemente an
  -> `$('<option>').text(...)`.
- function `appendTdToRow(row, value, i)` erzeugt ein neues `td` Element und fügt es an die übergebene `tr` an.
- Document ready event -> `$('.membersTable').on('click', 'tr', function (event) { ...` setzt die Checkbox
  checked/unchecked bei einem Klick in die `tr`.
- Wird eine Checkbox innerhalb einer `tr` verändert, wird die Class `highlight_row` zur `tr` hinzugefügt/entfernt.
- function `editGrp()` sucht die ausgewählte Gruppe aus dem `Select` Element über
  -> `$('#grpSelect').find(':selected').val()`.
- function `createMembersOptions(data)` holt das Select Element `$('#memberSelect')` und fügt option-Elemente an.
- In function `addToGrp()` wird von jedem ausgewählten Mitglied die ID in ein Array gepusht
  -> `$('#memberSelect option:selected').each(function () { ...`.

### Vue.js

Für die Implementierungen mit Vue, bitte Abschnitt "Der Editor" lesen.

### AJAX

Organisation `assets/js/pages/organisation/index.page.js`:

- function `findOrg()` ruft die Action `/api/organisation/findorg` auf und holt Namen und ID der Organisation.
- function `checkOrgAdminUser()` ruft die Action `/api/organisation/checkadmin` auf und gibt zurück ob der aktuelle
  Benutzer Admin der Organisation ist.
- function `fetchOrgMembers()`ruft die Action `/api/organisation/fetchorgmembers` auf und holt alle Mitglieder der
  Organisation.
- function `appointAsOrgAdmin()` übergibt ein JSON File mit den Id's der Mitglieder, welche als Admin der Organisation
  ernennt werden, an die Action `/api/organisation/appointadmin`.
- function `deleteFromOrg()` übergibt ein JSON File mit den Id's der Mitglieder, welche aus der Organisation entfernt
  werden, an die Action `/api/organisation/deletemembers`.

Groups `assets/js/pages/groups/index.page.js`:

- function `createGrpDesc(grp)` ruft die Action `/api/groups/description` auf und holt die Beschreibung der ausgewählten
  Gruppe.
- function `checkAdminCurrentUser(grp)` ruft die Action `/api/groups/checkadmin` auf und gibt zurück ob der aktuelle
  Benutzer Admin der ausgewählten Gruppe ist.
- function `findGrpMembers(grp)` ruft die Action `/api/groups/find` auf und holt die Mitglieder der ausgewählten Gruppe.
- function `findGrps()` ruft die Action `/api/groups/findgrps` auf und holt alle Gruppen des aktuellen Benutzer.
- function `appointAsAdmin(ids)` übergibt ein JSON File mit den Id's der Mitglieder, welche als Admin der Gruppe ernennt
  werden, an die Action `/api/groups/appointadmin`.
- function `deleteFromGrp(ids)` übergibt ein JSON File mit den Id's der Mitglieder, welche aus der Gruppe entfernt
  werden, an die Action `/api/groups/deletemembers`.
- function `leaveGrp()` ruft die Action `/groups/leave` auf und entfernt den aktuellen Benutzer aus der Gruppe.
- function `findMembersToAdd(grp)` ruft die Action `/api/groups/findusers` auf und holt alle Mitglieder aus der
  Organisation, die derzeit nicht in der ausgewählten Gruppe sind.
- function `addToGrp()` übergibt ein JSON File mit den ID's der Mitglieder, welche zur Gruppe hinzugefügt werden, an die
  Action `/api/groups/addtogroup`.

## EJS

### Layout

Drei unterschiedliche Layouts:

- `landingpage-layout.ejs` -> für die Homepage mit SEO Optimierung.
- `layout.ejs` -> Optimiert für das Dashboard, mit weniger Links im Header, damit die Seite nicht überladen wirkt.
- `public-layout.ejs` -> Beinhaltet Header und Footer mit allen Links für alle Public Views.

### Partials

- `views/partials/public/cookies.ejs`: Banner für `Accept Essential Cookies`.
- `views/partials/public/getting-started-partial.ejs`: Partial mit Call to Action, welches den User dazu bewegen soll,
  sich anzumelden.

Bei `views/partials/group/index.ejs` bzw. `views/partials/organisation/index.ejs` für das Joinen von Organisationen oder
bei den verschiedenen Navbars aus `public-layout / landingpage-layout / layout`  wurden explizit keine Partials
verwendet, da sich hier das HTML / CSS / JS minimal unterschiedlich verhält und deswegen keine Wiederverwendbarkeit
durch Partials genutzt werden könnte.

## Daten

### Datenmodell

- User
- Organisation
- Subscription
- SubType
- WorkingGroup
- TextContent
- TextContentArchive
- Tag
- Invoice (not used)
- ImageContent (not used)
- ImageContentArchive (not used)

### Associations

#### Many-to-Many

(m <---> n)

- `User/workingGroups` has and belongs to many `WorkingGroup/workers`
- `User/adminOf` has and belongs to many `WorkingGroup/admins`
- `TextContent/tags` has and belongs to many `Tag/textContentTag`
- `ImageContent/tags` has and belongs to many `Tag/imageContentTag`

#### One way assocations

(n ---> 1)

#### One-to-Many

(1 <---> n)

- `User/authorOfText` has many `TextContent/author`
- `User/hasUpdatedText` has many `TextContent/updatedFrom`
- `User/authorOfImage` has many `ImageContent/author`
- `User/hasUpdatedImage` has many `ImageContent/updatedFrom`
- `WorkingGroup/textBelongsTo` has many `TextContent/group`
- `TextContent/oldversions` has many `TextContentArchive/newestVersion`
- `ImageContent/oldversions` has many `ImageContentArchive/newestVersion`
- `Organisation/subscription` has many `Subscription/organisation`
- `Organisation/invoices` has many `Invoice/organisation`
- `Organisation/employees` has many `User/organisation`
- `Organisation/admins` has many `User/admin`
- `Organisation/workingGroups` has many `WorkingGroup/organisation`
- `SubType/subscriptions` has many `Subscription/subType`
- `Subscription/invoices` has many `Invoice/subscription`

#### One-to-One

(1 <---> 0..1)

### CRUD

- Textcontent, Gruppen, Organisation

## Input Validation

### Server-Side

Auf der Serverseite haben wir Input-Validation zum einen bei den Controllern in den Inputs und zum anderen bei den
Attributen in den Models. Beispiel für Controller:

- `api/controllers/textcontent/create.js`
  Beispiel für Model:
- `api/models/TextContent.js`

### Client-Side

Validation in HTML Forms mit den Attributen minlength/maxlength/required und type text/number/email. Beispiele sind hier
zu finden:

- `views/pages/textcontent/index.ejs`
- `views/pages/organisation/new.ejs`
- `views/pages/organisation/edit.ejs`
- `views/pages/groups/new.ejs`
- `views/pages/groups/edit.ejs`

Im `views/pages/textcontent/index.ejs` gibt es durch die Nutzung von Vue.js zusätzliche Validierung, dass weder
unveränderte Inhalte geupdatet (um unnötige Requests und damit Ressourcenverschwendung zu vermeiden) noch leere Strings
verschickt werden können.

## Sessions

Auf dem `pricing.ejs` View sind die drei unterschiedlichen SubType's beschrieben mit jeweils einem 'Subscribe' Button.
Wird einer der Buttons ausgelöst, wird die Vorauswahl des Benutzers über die
Action `api/controllers/subscription/saveselection.js` in der Session gespeichert. Über einen Redirect wird die
Action `getselection.js` aufgerufen, hier wird die in der Session gespeicherte SubType ID via Return an den View
übergeben. Im View `pages/subscription/select.ejs` wird der vom Benutzer zuvor gewählte SubType gehighlightet. So kann
der Benutzer seine Auswahl direkt bestätigen oder nochmals überdenken.

## SEO & Performance

## PageSpeed Insights

<details>
<summary><i>Mobile</i></summary>

**Leistung**: 85

**First Contentful Paint**: 3,1s

**Time to Interactive**: 3,1s

**Speed Index**: 4,5s

**Total Blocking Time**: 0ms

**Largest Contentful Paint**: 3,1s

**Cumulative Layout Shift**: 0,026
</details>

<details>
<summary><i>Desktop</i></summary>

**Leistung**: 97

**First Contentful Paint**: 0,9s

**Time to Interactive**: 0,9s

**Speed Index**: 1,5s

**Total Blocking Time**: 0ms

**Largest Contentful Paint**: 0,9s

**Cumulative Layout Shift**: 0,008
</details>

### Empfehlungen

<details>
<summary><i>Ressourcen beseitigen, die das Rendering blockieren</i></summary>

> bootstrap-4.css & style.css

Möglichkeit zur weiteren Optimierung wäre, sämtlichen Layout-spezifischen Styles inline anzugeben und alles andere erst
später zu laden. Dadurch gäbe es aber auch nur eine Einsparung von insgesamt 140ms.
</details>
<details>
<summary><i>Erstreaktion des Servers verringern</i></summary>

Von unserer Seite aus lässt sich hieran nichts ändern, ohne für Heroku etwas zu zahlen.
</details>

## Lighthouse

<details>
<summary><i>Mobile</i></summary>

**Performance**: 92

**Accessibility**: 76

## Google PageInsights Analyse

**Best Practices**: 100

**SEO**: 100

</details>

<details>
<summary><i>Desktop</i></summary>

**Performance**: 99

**Accessibility**: 80

**Best Practices**: 100

**SEO**: 100

</details>

<details>

<summary><b>Empfehlungen</b></summary>

- Nutzung von HTTP/2
- Ressourcen beseitigen, die das Rendering blockieren
- Bildelemente haben keine explizite `width` und `height`

</details>

## SEO

**Maßnahmen**:

- SEO-Friendly URLs: kurze, human-friendly URLs
- Content Mix aus Text, Diagrammen, Hintergrundgraphiken & interaktive Elemente (auf _/features_) für bessere
  Time-On-Site
- Abwechslungsreiches Layout für höheres Interesse & bessere Dwell Time
- Verwendung eines `meta`-Tags: `<meta name="description"
  content="A headless CMS in the cloud, used to provide omnichannel experiences for developers & online marketing.">`
- Verwendung von Keywords & LSI Keywords auf der gesamten Landingpage
- SEO-Keywords: content, cms, content management system, qntm, quantum, digital experiences, marketing, omnichannel,
  headless cms, cloud
- Responsive Design
- Interne Verlinkungen durch Call to Action
- Site Speed-Optimierung durch Verwendung eines seperaten, optimierten Layouts nur für die Landingpage, welches nur
  nötiges JavaScript für die Bedienung der Mobile Navbar beinhaltet
- Site Speed-Optimierung durch die Verwendung von `svg` statt `png / jpeg`, Nutzung von `alt`-Tags für bessere
  Accessibility & Einbettung von keywords in den Tag-Beschreibungen

