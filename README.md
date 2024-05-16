# Music Web Player

<h3>Work in progress...</h3>
<p>A web application for listening to music. All songs and covers are just an example of how you can use the app. No covers and songs are included in the project.</p>

<h2>To be done</h2>
Redesigning the server layer to "Object-Relational Mapping - ORM". Reorganization of the server (MVC, encryption of the password) and client code (the control panel).
<h2>To launch:</h2>
<ul>
  <li>download the repository</li>
  <li>download the database "MariaDB" and configure it on port 55555</li>
  <li>enter the project folder in the terminal</li>
  <li>type "cd client" and then "npm run dev"</li>
  <li>next exit this folder and type "cd server" and then "npm run dev"</li>
</ul>

<h2>Stack:</h2>
<ul>
  <li>React.js + Vite</li>
  <li>HTML</li>
  <li>CSS</li>
  <li>Tailwind CSS</li>
  <li>Node.js</li>
  <li>MySQL</li>
</ul>

![My Skills](https://skillicons.dev/icons?i=react,vite,js,html,css,tailwind,nodejs,mysql)

<h2>To date, it has been done:</h2>
<ul>
    <li><i>The welcome window</i></li>
  
  ![first](https://github.com/tchelmecki/Music-web-player/assets/121833733/3d0f7ed3-6e0a-4d07-987e-bedcee0d8e58)

  <li><i>Login, registration and logout</i></li>
  
![second](https://github.com/tchelmecki/Music-web-player/assets/121833733/a3851310-0946-4917-95a2-9a3ec19eb58c)

  <li><i>The main window with all the songs depending on which user you are logged in to</i></li>
  
  ![third](https://github.com/tchelmecki/Music-web-player/assets/121833733/5cc1acb1-11de-43a2-b79e-cfae73ae390a)

  <li><i>Your playlists</i></li>
  
  ![fourth](https://github.com/tchelmecki/Music-web-player/assets/121833733/b945adc5-5c3b-4d9d-892e-ffd671181573)

  <li><i>Creating a new playlist</i></li>

  ![5](https://github.com/tchelmecki/Music-web-player/assets/121833733/8ca16435-759d-442a-9cc4-538aff18abf6)

  ![6](https://github.com/tchelmecki/Music-web-player/assets/121833733/b2d4f510-6085-4634-9c1c-e0245c632325)

  <li><i>Creating a new song</i></li>

  ![7](https://github.com/tchelmecki/Music-web-player/assets/121833733/991bf8f2-e1f1-405c-9a25-86445abb7c38)

  <li><i>Listening to songs</i></li>

  ![8](https://github.com/tchelmecki/Music-web-player/assets/121833733/32e73560-2fce-4722-95ec-350a7fde9fff)
  
</ul>

<h2>The database schema</h2>

![db](https://github.com/tchelmecki/Music-web-player/assets/121833733/3bb55194-7d39-4b9a-872f-fd0f29f672f9)


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
