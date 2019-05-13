Pages :
a. Blog (index.php)
b. Article (content.php, content-single.php et single.php)
c. Page statique == Accueil (front-page.php)
d. Accueil == Page statique (front-page.php)
e. Menu (header.php)
f. Sidebar (sidebar.php)
g. Footer (footer.php)
h. 404 (404.php)

Effectu� :
Functions.php
 - Scripts et Theme setups pour le style, la gestion des thumbnails, menus, ...

Header.php
 - Contient le head et le header avec le menu principal du theme, titre, title, etc

Footer.php
 - Contient le footer de la page

404.php
 - Simple page 404 statique avec un lien vers la page d'accueil

Front-page.php
 - Champs simples avec Advanced custom skills + champs r�p�teurs

content.php
 - boucle + lien affichage des thumbnail, title, category, author, comment number

single.php
 - boucle affichage -> content-single.php

content-single.php
 - R�cup�ration et affichage correct de la date, contenu, affichage de la liste de categories
 - Recupération et affichage 'recents posts'
 - Bloc d'archive avec liste des posts

sidebar.php
 - modification des liens avec "get_bloginfo( 'template_directory' );"

index.php
 - Boucle affichage posts, Navigation Older, newer posts