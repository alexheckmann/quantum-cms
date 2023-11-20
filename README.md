# quantum-cms

A self-written headless content management system written with Sails.js and Vue.js.

This project was carried out as the main project for the Web Technologies course at HTWG Konstanz.
The tasks included the following:

- Come up with an idea and business model for a web-based start-up.
- Come up with personas, use cases, a brand identity, and wireframes / UI designs.
- Implement the business idea weekly, adjusting / adding implementation details based on each weeks lecture topic. This exposed us to the whole process of implementing a static HTML to making it dynamic via JavaScript, add DOM manipulation with jQuery, adding the MVC framework, and in the end refactor the heart of the application, the editor, to use Vue.js instead to give it a Single Page Application feel.  

## Project Participants

- Alexander Heckmann
- Alexander Aichholz

## Purpose

Problem Statement

The individuals responsible for the content of a website cannot simply change it on the page, as this needs to be done in HTML.
Additionally, in case of doubt, changing the HTML may require redeploying the page.
Solution

A Content Management System that allows managing website/app content from a central location and integrating it into the website via an API.

Standing Out from Other CMS:

- Intuitive and easy to use (unfortunately, this means fewer features).

## Persona

Pauline (27)

- Works at a startup as a marketing expert and SEO.
- The startup is in the fashion industry and is currently building its website.
- Perfectionist
- Eloquent
- Enjoys spending time reading and attending poetry slams
- Likes to sit in cafes with a chai latte, avocado toast, and classical music
- Enjoys cycling around Lake Constance in the summer
- Wants the text content on the new website to be perfect, but has no knowledge of HTML and needs a way to change the texts independently.

Kevin (35)

- Just completed his Bachelor's degree in Computer Science and started as a frontend developer in his younger brother's bus travel company
- Takes his time, loves pizza
- Enjoys peace
- Spends his evenings on Discord with college friends, gaming, or discussing cryptocurrencies
- Likes to play pool in bars on weekends
- Prefers to spend his vacations in Berlin
- Annoyed by constant suggestions from marketing about what to write on the website, just because they can't make changes to the frontend themselves

Luigi (32)

- Owner of a concept restaurant that showcases the cuisine of a different region each week to bring the diversity of Italian culture to the public
- Loves cooking
- Charming and sociable
- Very temperamental
- Could talk about food all day
- Aims to provide the best possible experience for his visitors
- Finds technology unimportant, just a means to an end; believes real life happens on the street
- Would love to spend the entire summer in Tuscany with his family, but would miss his restaurant
- Had a website developed by an agency; for simplicity in updating the ever-changing menu, they recommended a CMS, making the website look more elegant than with an embedded PDF.

## Product Overview & Main Features

### Main features:

- As a content manager, I need an interface for managing text content so that I can easily modify it.
- As a frontend developer, I need a link to the endpoint so that I can integrate text content into my website via an API.
- As a content manager, I need the ability to view my colleagues' entries so that I can collaborate effectively with them.
- As a content manager, I need a registration option so that I can manage personal content.

### Nice to have features:

- As a content manager, I need the ability to manage images so that I can easily change image content on my website.
- As a content manager, I need the ability to manage videos so that I can easily modify video content on my website.
- As a content manager, I would like to manage different versions of my text so that I can revert to an older version if necessary.
- As a content manager, I would like to be able to search for content so that I can find it quickly.

### Too hard features:

- As a content manager, I would like to be able to use my company's single sign-on solution to simplify the login process.
- As a content manager, I would like to have suggestions for text content based on keywords to expedite content completion.

## Creative Process

### Color Scheme

Blue tones along with light gray tones were used to convey professionalism and intuitiveness.

### Wireframes

Parts of the prototyping, wireframes, and routing for public pages can be viewed here:  [Wireframes](https://www.figma.com/file/SZDct0TmvQygDVJyrwxgkn/Wireframe?node-id=0%3A1).

#### Inspiration

- [Confluent](https://www.confluent.io/)
- [MongoDB](https://www.mongodb.com/)

## User Groups

- Visitor
- Registered User
- Organization Admin
- Working Group Admin

## Tech Stack & Tools

### Tech Stack
The tech stack was given by the professor.

- Sails.js for a MVC framework
- Vue.js for client-side rendering
- Heroku for deployment
- Bootstrap for utilities

### Tools

For carrying out this project, multiple tools were used:

- Miro for collaboration and ideation
- Jira for project management
- Figma for wireframes & UI design

## Functional Areas & Authorization

### Public

Unlogged users can only access views in pages/public/ and pages/entrance/. This is intended so that users on these pages can only gather information. Access to entrance/ is necessary to enter the privileged area.

### Privileged Area

In the logged-in area, users can use the functions of the web application (see Editor).

### Admin Area
As an Organization Admin, the user has the following options (pages/organisation/index.ejs):

- Edit the name of the organization.
- Remove members with the role 'Member' from the organization.
- Appoint members with the role 'Member' as Admin.
- Change the subscription (Premium, Enterprise, Standard) of the organization.

As a Working Group Admin, the user has the following options (pages/groups/index.ejs):

- Change the name and description of an existing group.
- Add members of the same organization who are not yet in the group.
- Remove members with the role 'Member' from the group.
- Appoint members with the role 'Member' as the Admin of the group.
- For both admin roles, authorization was not checked through central policies but through decentralized queries in the respective controllers. This was resolved as such because Sails described this solution as Best Practice in the documentation. It was also expressly avoided to be able to relieve other admins of their role, as this could lead to organizational problems, situations where there could be no admin, or where this function could be used for the wrong purposes.

### Changes depending on the user group

# The Editor

The editor is the core of the web app. Due to its complexity, a separate chapter is dedicated to it here. The editor exclusively uses client-side rendering, with data coming from the server as JSON via API calls. These are then processed by Vue.js. A more detailed description follows in the subsequent subsections.

The editor is accessed through /dashboard.

For simplification of documentation and traceability, a shortened notation of the paths is used in this chapter:

_**index.ejs**: views/pages/textcontent/index.ejs_

_**api/x.js**: api/controllers/api/textcontent/x.js_

## Features

At its core, the editor is essentially just a form for filling out. This basic functionality underpins its role as the central feature of the web application, where users input and manage content. The simplicity of a form is key to ensuring that users of various technical backgrounds can effectively interact with the editor. The processing and rendering of the content, however, are handled more complexly in the background, utilizing client-side technologies like Vue.js.

### Starten

When the editor starts, it first collects all necessary data from various sources and initializes everything. Since content can only be composed if a group has been selected, all groups the user belongs to are loaded. The user finds a selection in the lower left corner, at the base of the sidebar. If they are not part of any group, a button is displayed prompting them to join or create a group.

As soon as at least one group is available, a list of all entries for the current group is loaded. The user can then choose whether to work on an existing entry or create a new one. By default, the content is loaded in a way that allows for the creation of a new entry. When an entry is selected, it is also highlighted in the sidebar to maintain an overview. In addition, all entry-specific data are loaded.

#### Implementation

Initially, it is checked if an organization exists. If so, groups can be loaded. The method call occurs in the created() lifecycle hook of Vue (see index.ejs:Vue:created()), which is executed as soon as Vue is fully loaded. Groups are loaded via an AJAX call in loadAllGroups() (see index.ejs:Vue:methods:loadAllGroups()). Additionally, the first loaded entry is set as currentGroup to improve the user experience. This way, the user doesn't always have to go through the trouble of selecting a group every time they reload the page. The group selection is displayed by clicking on the Select a group button (see `index.ejs:#app-dropdown-button` && `index.ejs:Vue:methods:listAllGroups()`). This sets a boolean that toggles the display through v-if. The button shows the name of the current group (`currentGroup !== null`) or **Select a group**, depending on whether a group is selected.

For the list, there are three cases to consider:

- `allGroups.length === 0`: Create or join a group! as text with a link to group creation.
- `allGroups.length === 1 && currentGroup !== null`: **Create or join a group!** as text with a link to group creation.
- `allGroups.length > 1`: A 'v-for' directive iterating over all entries of `allGroups`, with an additional `v-if="grp !== currentGroup"` to ensure an overview of all other groups.

The Join or create group button is shown to the user via Vue's v-if directive when `allGroups.length === 0`, meaning they belong to no group.

As soon as a group is selected, i.e., `currentGroup !== null`, the entry in the sidebar is restyled with `:class="{'app-active-nav-link': entry.id === id}"`.

### Editing functions

Here, users can write content and assign titles that are meant to succinctly describe the contents. The title changes dynamically as soon as an input is made.

Furthermore, it displays when an entry was written, who the author is, and - if it has occurred - who has made an update and at what time, by changing the title and/or content.

As soon as the user is satisfied with what they have entered, they can use the Save button to save a new content or an update. This feature ensures that the editing process is streamlined and efficient, allowing for easy management and modification of content within the web application.

#### Implementation

Using `v-models` for title and content to dynamically change entries.

### Versioning

As soon as a user saves content, an archive entry is automatically created for the overwritten version. All previous versions of an entry can be listed by clicking on the **Retrieve older versions** button. Clicking on one of the entries loads the respective version.

This feature is essential for content management, as it allows users to track changes and revert to previous versions if needed. It ensures that the editing process is not only about creating and updating content but also about maintaining a comprehensive history of revisions, which can be crucial for tracking changes over time and reverting to older versions when necessary.

#### Implementation

In _api/update.js_, each time content is saved, an additional version is created in the archive.

All old versions are loaded as soon as the user selects a specific entry in the editor (method call `loadOldVersions()` see `index.ejs:Vue:methods:loadSingleEntry()`). In the method declaration (see `index.ejs:Vue:methods:loadOldVersions`), an AJAX call is made to _api/findoldversions.js_, which returns all older versions of the current entry.

### Revert

If the user is not satisfied with the changes, they can use the **Revert** button to reset the content to its original state - empty for new entries, and the last requested version for existing entries. Also, when switching between versions, the originally loaded version is always set as the starting point. This feature allows the user to switch between old versions and the most recent one without any issues.

#### Implementation


When loading an entry, `title` and `content` are set to the contents of the API response. To enable resetting, `originalTitle` and `originalContent` were additionally introduced. These hold an exact copy of the response contents but, unlike `title` and `content`, they are never changed.

Upon the `@click` event of the **Revert** button, `title` and `content` are overwritten with `originalTitle` and `originalContent`.

### Status flag

The status flag informs the user about the state of the displayed content. There are four different states: NEW, ACTIVE, UNPUBLISHED, and OLD_VERSION.

- NEW is displayed when new content is being created.
- ACTIVE is shown when content is loaded and remains unchanged.
- If the content is modified, the status changes to UNPUBLISHED.
- When an old version from the archive is loaded, the status changes to OLD_VERSION.

#### Implementierung

For the status, an enum with `Object.freeze()` was used. This enum contains an entry for each of the states with text to be displayed and a corresponding CSS class (see `index.ejs:State`). The status is changed through an @input attribute with the method `changeStatus()` (see `index.ejs:Vue:methods:changeStatus()`) for the title and content.

- When the New button is pressed, i.e., on the call of the createNewEntry() method, the status is set to NEW.
- When the Revert button is pressed and when loading new content, the status is set to ACTIVE.

## Styling

Several methods have been used for styling. Bootstrap Utilities were used wherever possible. In all other cases, we used a mix of self-written CSS (_styles.css_) and Inline CSS.

### Inline CSS

Inline CSS was used throughout the application for technical reasons to prevent layout shifts. In Vue.js, there's an option to use the v-cloak attribute on tags. This attribute is then removed when the Vue instance has fully loaded. In our application, this was used so that elements processed by Vue are given a display: none style (see `style.css:171`). This is intended to enhance the user experience by making the technical aspects completely transparent to the user. However, this naturally leads to shifts in the layout, which are circumvented by these inline styles.

Examples of v-cloak in _views/pages/textcontent/index.ejs_:

- Line 29: Hides the rendering of all entries in the sidebar.
- Line 43: Hides the display of {{ currentGroup.name }}.
- Line 70: Hides the display of {{ title }} => this would result in a layout shift, which is prevented by inline CSS in line 69 in the parent div.
- Line 78: Hides the display of the status flag.

### Using a stylesheet

The use of a custom styles.css alongside Bootstrap in your application underscores the need for additional styling capabilities that Bootstrap's utility classes and default styles may not fully address. This approach is particularly relevant when dealing with unique aspects of your user interface (UI), including specific breakpoints, and when you require more customized styles that Bootstrap does not inherently provide.

Key areas where styles.css was utilized instead of Bootstrap include situations where:

- Custom cursor styles were needed (e.g., cursor: pointer).
- Specific height, width, or max-width properties were required to achieve a desired layout or responsiveness that couldn't be achieved with Bootstrap's built-in classes.

# Topics covered in the course

## MVC

Models were used for creating data entities, Controllers were implemented using Sails.js Actions, and Views based on EJS templates were created to enable the user to interact with the models.

## Styling

### Pure CSS

The individual styling is located in _style.css_. CSS was used where Bootstrap utilities were either not available or insufficient. Additionally, it was used to override Bootstrap defaults, such as the font.

_style.css_ was built modularly, starting with utility classes we authored, such as various font sizes, backgrounds, or classes for `border-radius` & `box-shadow`, ensuring they behave consistently throughout the styling. Particularly, the font sizes are important utility classes, as Bootstrap's standard font size is not inherently responsive; this is only enabled through media queries. By using the `clamp()` function, the font size was set to scale with the View Width, eliminating the need for media queries and abrupt changes in font size, thus providing an optimal font size for the user at all times.

Following the utility classes, `:root` is where we included our own variables for reuse within the stylesheet. These variables reflect the color scheme of our design.

The order of an `html` document is then followed. In the `body`, there is a critical functionality, where `display: flex, flex-direction-column, min-height: 100vh` is set, ensuring that on pages with less content, the footer still sits at the bottom of the screen. To do this, the top tag of a `.ejs` must be a `<div class="flex-fill ...">`. Examples of this are _/organisation/new_, _/groups/new_.

To give our website the look and feel of a real application, the scrollbar was restyled (at least for browsers based on Webkit). This was achieved through the `::-webkit-scrollbar-*` classes.

By using multiple pseudo-classes, a toggle switch was designed, inspired by Material Design.

Further examples of complex CSS constructs include the styling of the **delete** button in the dashboard, which receives a completely different styling depending on whether it's disabled or not, resulting in long selectors like `#app-delete-button:not(:disabled):hover`.

CSS transitions & animations are used sensibly to provide the user with a higher quality operation of the application, such as unfolding the Mobile Navbar, the Burger Menu, or on the Dashboard when hovering over the tags. A custom keyframe `fadeIn` was also defined for this purpose.

Breakpoints for media queries were not adopted from Bootstrap, but were set based on our own experiences with our layout and consistently optimized.

### Bootstrap

Primarily, only utility classes from Bootstrap were used, as the rest did not meet the requirements of the application. Although attempts were made to use Bootstrap components in several places, these attempts consistently faced technical challenges. An example is the use of Bootstrap's dropdown for loading old versions in the editor; this failed because the JavaScript provided by Bootstrap executed faster than the AJAX call to retrieve the data, leading to a client-side error. Due to such errors, it was decided to use Bootstrap only for decorative purposes and to implement such functionalities ourselves.

## JavaScript

- `assets/js/navbar-animation.js`: Uses `querySelector`, `EventListener`, and `toggle` for menu and burger animation.
- Functions `checkCookie()`, `getCookie()`, and `setCookie()` with DOM manipulation for the cookie banner in `views/partials/public/cookies.ejs`.
- Function `ignoreKeys(e)` in `assets/js/pages/groups/index.page.js` to disable switching groups with the keyboard, as rapid group switching causes the HTML of the previous group to be displayed as well.
- `copyURL: async function (mytext)` in `views/pages/textcontent/index.ejs` to copy a text element to the clipboard.
- `assets/js/pages/subscription/select.page.js`: Adding and removing classes with `document.getElementsByClassName`, `addEventListener`, and `querySelector`.
- Use of the built-in JS function `history.back()` to navigate back to the previous page on _/organisation/new_ & _/groups/new_.

### Vanilla JavaScript

#### DOM Manipulation

assets/js/navbar-animation.js

### jQuery

#### Organisation `assets/js/pages/organisation/index.page.js`:

- Functions `showOrgAdminTools()` and `showOrgMemberTools()` use `.show()` & `.hide()` to toggle visibility of all toolbar elements.
- Function `createOrgTableChk(data)` creates a table with checkboxes. HTML elements are generated using `$('<element>')` and added to the table with `.append()`.
- Function `resetOrgMembersTable()` empties a table using `$('#orgMembersTable').empty()`.
- Function `selectAllOrg()` sets all checkboxes that are not disabled to checked, or vice versa.
- `window.onload = () => { fetchOrgData();}` in `pages/organisation/index.ejs` to load the organization data.

#### Groups `assets/js/pages/groups/index.page.js`:

- Function `createOptions(data)` retrieves the Select element `$('#selectGrp')` and appends option elements using `$('<option>').text(...)`.
- Function `appendTdToRow(row, value, i)` creates a new `td` element and appends it to the given `tr`.
- Document ready event -> `$('.membersTable').on('click', 'tr', function (event) { ...` toggles the checkbox checked/unchecked when clicking into the `tr`.
- When a checkbox within a `tr` is changed, the class `highlight_row` is added/removed to/from the `tr`.
- Function `editGrp()` retrieves the selected group from the `Select` element using `$('#grpSelect').find(':selected').val()`.
- Function `createMembersOptions(data)` retrieves the Select element `$('#memberSelect')` and appends option elements.
- In function `addToGrp()`, the ID of each selected member is pushed into an array using `$('#memberSelect option:selected').each(function () { ...`.


### Vue.js

For all Vue implementations, please read the "Editor" section

### AJAX

#### Organisation `assets/js/pages/organisation/index.page.js`:

- Function `findOrg()` calls the action `/api/organisation/findorg` to retrieve the name and ID of the organization.
- Function `checkOrgAdminUser()` calls the action `/api/organisation/checkadmin` to check if the current user is an admin of the organization.
- Function `fetchOrgMembers()` calls the action `/api/organisation/fetchorgmembers` to fetch all members of the organization.
- Function `appointAsOrgAdmin()` sends a JSON file with the IDs of members to be appointed as organization admins to the action `/api/organisation/appointadmin`.
- Function `deleteFromOrg()` sends a JSON file with the IDs of members to be removed from the organization to the action `/api/organisation/deletemembers`.

#### Groups `assets/js/pages/groups/index.page.js`:

- Function `createGrpDesc(grp)` calls the action `/api/groups/description` to fetch the description of the selected group.
- Function `checkAdminCurrentUser(grp)` calls the action `/api/groups/checkadmin` to check if the current user is an admin of the selected group.
- Function `findGrpMembers(grp)` calls the action `/api/groups/find` to fetch the members of the selected group.
- Function `findGrps()` calls the action `/api/groups/findgrps` to fetch all groups of the current user.
- Function `appointAsAdmin(ids)` sends a JSON file with the IDs of members to be appointed as group admins to the action `/api/groups/appointadmin`.
- Function `deleteFromGrp(ids)` sends a JSON file with the IDs of members to be removed from the group to the action `/api/groups/deletemembers`.
- Function `leaveGrp()` calls the action `/groups/leave` to remove the current user from the group.
- Function `findMembersToAdd(grp)` calls the action `/api/groups/findusers` to fetch all members of the organization who are currently not in the selected group.
- Function `addToGrp()` sends a JSON file with the IDs of members to be added to the group to the action `/api/groups/addtogroup`.

## EJS

### Layout

Three different layouts:

- `landingpage-layout.ejs` -> For the homepage with SEO optimization.
- `layout.ejs` -> Optimized for the dashboard, with fewer links in the header to avoid cluttering the page.
- `public-layout.ejs` -> Includes header and footer with all links for all public views.

### Partials

- `views/partials/public/cookies.ejs`: Banner for `Accept Essential Cookies`.
- `views/partials/public/getting-started-partial.ejs`: Partial with a call to action, intended to encourage users to sign up.

For `views/partials/group/index.ejs` and `views/partials/organisation/index.ejs` regarding joining organizations, or the different navbars from `public-layout / landingpage-layout / layout`, no partials were explicitly used. This is because the HTML / CSS / JS behave slightly differently in these sections, making the reuse of partials impractical.

## Data

### Data model

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

- Textcontent, Groups, Organisations

## Input Validation

### Server-Side

We validate data server-side using two approaches, in the controllers annd in the data model itself. 

An example for controller-based validation:
- `api/controllers/textcontent/create.js`

An example for model-based validation:
- `api/models/TextContent.js`

### Client-Side

Validation in HTML forms is implemented using attributes such as `minlength`, `maxlength`, `required`, and types like `text`, `number`, `email`. Examples can be found in:

- `views/pages/textcontent/index.ejs`
- `views/pages/organisation/new.ejs`
- `views/pages/organisation/edit.ejs`
- `views/pages/groups/new.ejs`
- `views/pages/groups/edit.ejs`

In `views/pages/textcontent/index.ejs`, additional validation is performed using Vue.js to ensure that neither unchanged content is updated (to avoid unnecessary requests and resource waste) nor empty strings are sent.

## Sessions

On the `pricing.ejs` view, the three different subscription types are described, each with a 'Subscribe' button. When one of the buttons is clicked, the user's preliminary selection is saved in the session through the action `api/controllers/subscription/saveselection.js`. A redirect then invokes the action `getselection.js`, where the subscription type ID stored in the session is returned to the view. In the view `pages/subscription/select.ejs`, the subscription type previously chosen by the user is highlighted. This allows the user to either confirm their choice directly or reconsider it.

## SEO & Performance

### PageSpeed Insights

<details>
<summary><i>Mobile</i></summary>

**Performance**: 85

**First Contentful Paint**: 3.1s

**Time to Interactive**: 3.1s

**Speed Index**: 4.5s

**Total Blocking Time**: 0ms

**Largest Contentful Paint**: 3.1s

**Cumulative Layout Shift**: 0.026
</details>

<details>
<summary><i>Desktop</i></summary>

**Performance**: 97

**First Contentful Paint**: 0.9s

**Time to Interactive**: 0.9s

**Speed Index**: 1.5s

**Total Blocking Time**: 0ms

**Largest Contentful Paint**: 0.9s

**Cumulative Layout Shift**: 0.008
</details>

### Recommendations

<details>
<summary><i>Eliminate render-blocking resources</i></summary>

> bootstrap-4.css & style.css

A potential optimization could be to inline all layout-specific styles and load everything else later. However, this would only save a total of 140ms.
</details>

<details>
<summary><i>Reduce initial server response time</i></summary>

There's nothing that can be changed on our end without paying for Heroku.
</details>

### Lighthouse

<details>
<summary><i>Mobile</i></summary>

**Performance**: 92

**Accessibility**: 76

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
<summary><b>Recommendations</b></summary>

- Use of HTTP/2
- Eliminate render-blocking resources
- Image elements do not have explicit `width` and `height`

</details>

## SEO

### Measures taken:

- SEO-Friendly URLs: Short, human-friendly URLs.
- Content mix of text, diagrams, background graphics, and interactive elements (on _/features_) for improved time-on-site.
- Varied layout for heightened interest and better dwell time.
- Use of a `meta` tag: `<meta name="description" content="A headless CMS in the cloud, used to provide omnichannel experiences for developers & online marketing.">`
- Utilization of keywords and LSI keywords throughout the landing page.
- SEO Keywords: content, cms, content management system, qntm, quantum, digital experiences, marketing, omnichannel, headless cms, cloud.
- Responsive design.
- Internal linking through call-to-action.
- Site speed optimization by using a separate, optimized layout only for the landing page, which includes only necessary JavaScript for the operation of the mobile navbar.
- Site speed optimization through the use of `svg` instead of `png / jpeg`, use of `alt` tags for better accessibility, and embedding keywords in tag descriptions.
