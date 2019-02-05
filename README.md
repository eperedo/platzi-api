# Platzi Rest API

> the best and most unofficial Platzi REST API

### Documentation

Right now the API only has one endpoint for the profile information.

```
GET https://platzi.now.sh/profile/{username}
```

It will return the following information

| Property Name      | Description                                                                           |
| ------------------ | ------------------------------------------------------------------------------------- |
| avatar             | The image url that the user uploaded in their profile page                            |
| bio                | The bio of the user                                                                   |
| careers            | Array of career Object                                                                |
| career[].name      | The name of the career                                                                |
| career[].badge     | The badge of the career                                                               |
| country            | country of the user. It depends on the privacy settings of the user                   |
| courses            | Array of course Object                                                                |
| course[].badge     | The badge of the course                                                               |
| courses[].title    | The title of the course                                                               |
| courses[].career   | Career where the course belongs.                                                      |
| facebook           | facebook url profile page of the user. It depends on the privacy settings of the user |
| flagUrl            | the image url of the country user. It depends on the privacy settings of the user     |
| platziLive         | The url of the platzi live show if it is happening                                    |
| name               | The name of the user. it depends on the privacy settings of the user                  |
| oldCourses         | Array of course Object                                                                |
| oldCourses[].badge | The bad of the course                                                                 |
| oldCourses[].title | The title of the course                                                               |
| totalPoints        | The total of points earned by the user                                                |
| totalQuestions     | The total of questions made by the user                                               |
| totalAnswers       | The total of answers made by the user                                                 |
| twitter            | twitter url profile page of the user                                                  |
| website            | website url of the user                                                               |

### Development

You will need node 8.x.x and google chrome installed in your computer.

1. Install dependencies

```bash
npm i # shortcut for npm install
```

2. Create a .env file with the following variables

```bash
# In mac I normally use /Applications/Google Chrome.app/Contents/MacOS/Google Chrome
CHROME_PATH=PATH_WHERE_YOU_HAS_CHROME_INSTALLED

CHROME_HEADLESS=true
# use false if you want to google chrome open right on your face!
```

3. Run webserver

```
npm start
```

4. Testing

We are using [jest](https://jestjs.io) because it's kinda awesome.

```bash
npm t # shortcut for npm test
```
