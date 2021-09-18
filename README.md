# Wallet-Manager ![favicon-32x32](https://user-images.githubusercontent.com/82178046/133870742-5dad18eb-b0f8-4c56-80c5-73cb0633f3d7.png)
Wallet-Manager is a web application for anyone who is interested in checking their expenditures and incoming income. 

## Why build this application?
I personally always had an interest in personal finance to the point I used to use Google Forms to submit my expenses, and automatically update them to a Google Sheet. I learned that it is easiest to be aware of ones expenditures, when you're able to see them on a list rather than checking back on credit card statements and realizing how much you truly spent in a month. Trust me, I learned this from personal experience and figured keeping track of ones expenses is easiest in one location, rather than different credit card accounts. 

## Technologies Used
⋅⋅* React.js
⋅⋅* Node.js
⋅⋅* Express.js
⋅⋅* PostgreSQL
⋅⋅* Google Places
⋅⋅* Chart.js
⋅⋅* Bootstrap
⋅⋅* Babel
⋅⋅* Webpack
⋅⋅* pgweb (PostgreSQL client for Node)
⋅⋅* CSS3
⋅⋅* JavaScript (ES6)

## Live Demo 
Try the live application here: https://wallet-manager-finance.herokuapp.com/

## Features
⋅⋅* User can create an expense or a credit entry.
⋅⋅* User can view Google Places autocomplete upon the creation of an expense entry in the location input.
⋅⋅* User can view their total expenditure per category in a pie chart via chart.js, or a table.
⋅⋅* User can create their own spending categories.
⋅⋅* User can delete, or update transactions made.
⋅⋅* User can delete categories that they do not use. 
⋅⋅* User can set their own budget.
⋅⋅* User can view their budget, total expenditure, and total credit in the home screen.

## Preview
### Mobile App
![wallet-manager-mobile](https://user-images.githubusercontent.com/82178046/133870667-fa2fe466-d4a7-4a33-8956-2d80e299d843.gif)

### Desktop App
![wallet-manager-desktop](https://user-images.githubusercontent.com/82178046/133870670-5b3cdfd8-a971-417b-81ac-66df27e6af43.gif)


## Stretch Features
⋅⋅* Use argon2 to allow users to sign in to their own accounts.
⋅⋅* User can organize their transactions by date range.
⋅⋅* Import fontawesome icons to allow users to assign an icon to their expenditure category. 

## System Requirements 
⋅⋅* VS Code or any similar IDE supporting JavaScript ES6
⋅⋅* Node.js 14 or higher
⋅⋅* NPM 7 or higher
⋅⋅* PostgreSQL 12 or higher

## Getting Started
1. Clone the repository.
```git@github.com:Michael-M-Aguilar/wallet-manager.git```

2. Install all dependencies with NPM.
```npm install```

3. Create a database in your dev environment.
```createdb (database name of your choosing)```

4. In the env.example file provided, change the file name to `.env`. 
 
5. In the .env file, change the "changeMe", to the name of the database you chose in step 3. 

6. Import sample data into PostgreSQL.
```npm run db:import```

7. Start the application. You can then view by opening http://localhost:3001/ in your browser.
```npm run dev```
