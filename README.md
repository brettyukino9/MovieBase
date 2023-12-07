# csc-440-baku
CSC 440 Project: Media Catalogue Site

## Project info
Frontend contains all of the code for our web pages.

Backend contains all of the code for the server excluding database sql script files.

Database contains the sql scripts and any other important database files.

## Setting up your development environment

### Requirements to run project

- Docker
- Chrome

### Windows

1. Install WLS (Windows Linux Subsystem)
    - This can be done through the windows store.
2. Install Docker Client
    - Further instructions can be found here https://www.docker.com/
3. Make Sure you have hypervisor enabled (this enables virtual machines to run)

### Linux
1. Install Docker Client following the directions for your given distribution

### Mac
1. Install Docker Client

## Running the Project

1. Ensure you do not have anything using the localhost port on your machine i.e. PORT 80

2. Create a .env file based on the .env.example. Below is the info you need to know about it.
    - `DB_HOST`: the host used for the database
    - `DB_PORT`: the external port for the database
    - `MYSQL_USER` : the user created in the database for interactions
    - `MYSQL_PASSWORD` : the password used for the user, this will need to be added by you.
    - `MYSQL_DATABASE` : the name of the database the app uses.
    - `DB_CHARSET` : the character set used by the database.
    - `MYSQL_ROOT_PASSWORD` : the root password for your database, this should be as secure as possible and you will have to set it.
    - `API_SECRET_KEY` : key used for password hashing. 32 characters that should be generated using a secure method localized to the machine you use to run the app. USING ONLINE GENERATORS IS NOT SECURE. (use them at your own desgression).

2. In your terminal of choice navigate to this directory (the terminal where this read me is located) 

3. Once in the project root directory use the following command (remember to save your changes if you want them to appear when the dockers are built)
    `docker-compose up -d --build`

4. Open up project in chrome and go to localhost.
    - Of Note make sure you use chrome because of compatability issues with firefox

5. Make an account (any email will do doesn't have to be real)

6. Now every page should be accessible.
    - Explore takes you to the explore page
    - Clicking on your user profile picture and then watchlist will take you to your personal watchlist
    - Clicking on a movie card opens up the modal with the movie info
    - Clock button in the bottom right of modal adds movie to watchlist
    - If movie is already in your list, the button should have an x on it and clicking it will remove it from your watchlist. 
