# quantum-cms

[Quantum CMS](https://qntm-cms.heroku-app.com) application

## Purpose

Problemstellung
- Die Verantwortlichen für den Inhalt einer Website können diesen nicht einfach auf der Seite ändern, da dies im HTML geschehen muss.
- Zusätzlich muss im Zweifel durch die Änderung im HTML die Seite neu deployed werden.

Lösung
- Content Management System, mit dem man Website-/App-Inhalte an zentraler Stelle verwalten und per API in die Website einbinden kann.

Abheben von anderen CMS
- intuitiv und leicht zu bedienen (leider auch weniger Features)

## Persona

## Product Overview & Main Features

"Main"-features:
- Als Content-Verantwortlicher benötige ich ein Interface zur Verwaltung von Text-Inhalten, sodass ich diese einfach ändern kann.
- Als Frontend-Entwickler benötige ich einen Link zum Endpunkt, um Text-Inhalte über eine API in meine Website einbinden zu können
- Als Content-Verantwortlicher benötige ich die Möglichkeit, die Einträge meiner Kollegen zu sehen, um gut mit ihnen zusammen arbeiten zu können.
- Als Content-Verantwortlicher benötige ich eine Möglichkeit zur Registrierung, um persönliche Inhalte verwalten zu können.

"Nice 2 have"-features:
- Als Content-Verantwortlicher benötige ich die Möglichkeit, Bilder verwalten zu können, um Bildinhalte auf meiner Website auch einfach ändern zu können.
- Als Content-Verantwortlicher benötige ich die Möglichkeit, Videos verwalten zu können, um Bildinhalte auf meiner Website auch einfach ändern zu können.
- Als Content-Verantwortlicher würde ich gerne verschiedene Versionen meines Texts verwalten können, um zur Not wieder auf eine ältere Version wechseln zu können.
- Als Content-Verantwortlicher würde ich gerne nach Inhalten suchen können, um diese schnell zu finden.

"Too hard"-features:
- Als Content-Verantwortlicher würde ich gerne die Single-Sign-On-Lösung meines Unternehmens nutzen können, um das Einloggen simpler zu haben.
- Als Content-Verantwortlicher hätte ich gerne Vorschläge zu Textinhalten basierend auf Keywords, um möglichst schnell mit den Inhalten fertig zu werden.

## Kreativ-Prozess

### Moodboard

### Style Tile

## Wireframes

## User Stories

<details>
<summary><b>QTNM-2: Landing Page Content</b></summary>
<br>
This is how you dropdown.
</details>

## User Groups

1. Besucher
2. Registrierter Benutzer
3. Admin der Organisation
4. Admin einer Arbeitsgruppe

## Funktionsbereiche & Autorisierung

inhalt aus policies.js beschreiben

#### Public

#### Privilegierter Bereich

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

##TODO

#### Implementierung

Die Gruppen werden via AJAX Call in `loadAllGroups()`(_siehe index.ejs:Vue:methods:loadAllGroups()_) geladen. Der
Methodenaufruf findet im `created()`-Lifecycle-Hook von Vue (_siehe index.ejs:Vue:created()_) statt, der ausgeführt
wird, sobald Vue fertig geladen ist. Zusätzlich wird der erste Eintrag, der geladen wird, als `currentGroup` gesetzt, um
die UX zu verbessern. Dadurch muss der User nicht immer aufwendig erst eine Gruppe auswählen, sobald er die Seite neu
lädt. Die Gruppenauswahl wird durch einen Klick auf den **Select a group**-Button (_
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

In _api/update.js_ wird bei jedem Speichern zuästlich eine Version im Archiv erstellt.

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

## Styling

### Pure CSS

### Bootstrap

## JavaScript

- DOM Manipulation -> Navbar
- Cookie

### Vanilla JavaScript

#### DOM Manipulation

assets/js/navbar-animation.js

### jQuery

Organisation `assets/js/pages/organisation/index.page.js`:
- `.show()` & `.hide()` von allen Toolbar Elementen in den Funktionen `showOrgAdminTools()` und `showOrgMemberTools()`.
- function `createOrgTableChk(data)` erzeugt eine Tabelle mit Checkboxen, dabei werden die html-Elemente über `$('<element>')` generiert und mit `.append()` zur Tabelle hinzugefügt.
- function `resetOrgMembersTable()` leert eine Tabelle über `$('#orgMembersTable').empty()`.
- function `selectAllOrg()` setzt alle Checkboxen die nicht deaktiviert sind auf checked oder umgekehrt.
- `window.onload = () => { fetchOrgData();}` in `pages/organisation/index.ejs` um die Daten der Organisation zu laden.

Groups `assets/js/pages/groups/index.page.js`:
- function `createOptions(data)` holt das Select Element `$('#selectGrp')` und fügt option-Elemente an -> `$('<option>').text(...)`.
- function `appendTdToRow(row, value, i)` erzeugt ein neues `td` Element und fügt es an die übergebene `tr` an.
- Document ready event -> `$('.membersTable').on('click', 'tr', function (event) { ...` setzt die Checkbox checked/unchecked bei einem Klick in die `tr`.
- Wird eine Checkbox innerhalb einer `tr` verändert, wird die Class `highlight_row` zur `tr` hinzugefügt/entfernt.
- function `editGrp()` sucht die ausgewählte Gruppe aus dem `Select` Element über -> `$('#grpSelect').find(':selected').val()`.
- function `createMembersOptions(data)` holt das Select Element `$('#memberSelect')` und fügt option-Elemente an.
- In function `addToGrp()` wird von jedem ausgewählten Mitglied die ID in ein Array gepusht -> `$('#memberSelect option:selected').each(function () { ...`.


### Vue.js

### AJAX

Organisation `assets/js/pages/organisation/index.page.js`:
- function `findOrg()` ruft die Action `/api/organisation/findorg` auf und holt Namen und ID der Organisation.
- function `checkOrgAdminUser()` ruft die Action `/api/organisation/checkadmin` auf und gibt zurück ob der aktuelle Benutzer Admin der Organisation ist.
- function `fetchOrgMembers()`ruft die Action `/api/organisation/fetchorgmembers` auf und holt alle Mitglieder der Organisation.
- function `appointAsOrgAdmin()` übergibt ein JSON File mit den Id's der Mitglieder, welche als Admin der Organisation ernennt werden, an die Action `/api/organisation/appointadmin`.
- function `deleteFromOrg()` übergibt ein JSON File mit den Id's der Mitglieder, welche aus der Organisation entfernt werden, an die Action `/api/organisation/deletemembers`.

Groups `assets/js/pages/groups/index.page.js`:
- function `createGrpDesc(grp)` ruft die Action `/api/groups/description` auf und holt die Beschreibung der ausgewählten Gruppe.
- function `checkAdminCurrentUser(grp)` ruft die Action `/api/groups/checkadmin` auf und gibt zurück ob der aktuelle Benutzer Admin der ausgewählten Gruppe ist.
- function `findGrpMembers(grp)` ruft die Action `/api/groups/find` auf und holt die Mitglieder der ausgewählten Gruppe.
- function `findGrps()` ruft die Action `/api/groups/findgrps` auf und holt alle Gruppen des aktuellen Benutzer.
- function `appointAsAdmin(ids)` übergibt ein JSON File mit den Id's der Mitglieder, welche als Admin der Gruppe ernennt werden, an die Action `/api/groups/appointadmin`.
- function `deleteFromGrp(ids)` übergibt ein JSON File mit den Id's der Mitglieder, welche aus der Gruppe entfernt werden, an die Action `/api/groups/deletemembers`.
- function `leaveGrp()` ruft die Action `/groups/leave` auf und entfernt den aktuellen Benutzer aus der Gruppe.
- function `findMembersToAdd(grp)` ruft die Action `/api/groups/findusers` auf und holt alle Mitglieder aus der Organisation, die derzeit nicht in der ausgewählten Gruppe sind.
- function `addToGrp()` übergibt ein JSON File mit den ID's der Mitglieder, welche zur Gruppe hinzugefügt werden, an die Action `/api/groups/addtogroup`.


## EJS

- 3 unterschiedliche Layouts -> landing page für Homepage (SEO optimierung)
- public für header und footer -> links
- layout für dashboard, damit es nicht so überladen wirkt 

### Layout

### Partials

- getting Started
- cookie

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

- Textcontent, Gruppen, Org

## Input Validation

### Server-Side

Auf der Serverseite haben wir Input-Validation zum einen bei den Controllern in den Inputs und zum anderen bei den Attributen in den Models.
Beispiel für Controller:
- `api/controllers/textcontent/create.js`
Beispiel für Model:
- `api/models/TextContent.js`

### Client-Side

Validation in HTML Forms mit den Attributen minlength/maxlength/required und type text/number/email. 
Beispiele sind hier zu finden:
- `views/pages/textcontent/index.ejs`
- `views/pages/organisation/new.ejs`
- `views/pages/organisation/edit.ejs`
- `views/pages/groups/new.ejs`
- `views/pages/groups/edit.ejs`

## Sessions

- Subscription buchen

## SEO & Performance

## Google PageInsights Analyse

### On-Page SEO

### Technische SEO & Performance
