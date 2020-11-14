const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const writeFileAsync = util.promisify(fs.writeFile);

inquirer
    .prompt([
        {
            type: 'input',
            message: 'What is your project title?',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Brief description of project',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Describe how to use the site',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'I am open to contributions with commenting out code and descriptions?',
            name: 'contribution'
        },
        {
    
            type: 'checkbox',
            message: 'Which license would you like to include?',
            choices: [
                {
                    name: 'BSD ',
                    checked: true
                },
                {
                    name: 'MIT ',
                    checked: true
                },
                {
                    name: 'GPL ',
                    checked: true
                },
                
            ],
            name: 'license'
        },
        {
            type: 'input',
            message: 'What is your GitHub URL?',
            name: 'github'
        },
        {
            type: 'input',
            message: 'What is your email address?',
            name: 'email'
        },
        
    ])
    .then((response) => {
        let user = {
            title: response.title,
            description: response.description,
            usage: response.usage,
            contribution: response.contribution,
            license: response.license,
            github: response.github,
            email: response.email
            
        };
        let htmlDoc = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
                
                <title>README Generator</title>
            </head>

            <body>
                <header class="text-center">
                    <h1 id="title">${user.title}</h1>
                    <p id="description">${user.description}</p>
                </header>
                <main class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <h2>README</h2>
                            <br>
                            <p id="usage"><h2>Description:</h2>${user.usage}</p>
                            <p id="contribution"><h2>Contributions:</h2>I am open to contributions with commenting out code and descriptions: ${user.contribution}</p>
                            <p id="license"><h2>License:</h2> ${user.license}</p>
                            <h3>Additional Contact Info:</h3>
                            <a href="${user.gitHub}">github</a>
                            <a id="email" href="${user.email}">email</a>
                        </div>
                    </div>
                </main>
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>
                <script src="index.js"></script>
            </body>
            </html>
        `;
        fs.writeFile('index.html', htmlDoc, (err) =>
            err ? console.error(err) : console.log('Success!')
        );
    });