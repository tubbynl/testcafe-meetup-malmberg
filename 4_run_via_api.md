
#### [⇐ Previous](3_cli_options.md) | [Next ⇒](README.md)

# TestCafe API

De TestCafe API interface is handig om te gebruiken indien je veel TestCafe plugins hebt binnen je project. 
Dan is het niet meer nodig om een cli regel te maken met 10 verschillende parameters, maar kun je de plugins configuren
in een javascript file die je vervolgens via node start. 

**Oefening #1**

Probeer je testen te laten draaien via de TestCafe API door de **testcafe-api-run.js** te implementeren.

**Oefening #2**

We willen als we testen draaien natuurlijk ook een mooie rapportage van de resultaten. We gaan in deze oefening de 
[testcafe-reporter-html](https://www.npmjs.com/package/testcafe-reporter-html) plugin gebruiken. Probeer deze te 
implementeren in **testcafe-api-run.js**

**HINT**: Maak gebruik van een stream