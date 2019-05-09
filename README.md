### Bambu API
A sample API to interact with dataset and find best matches


### Implementation detials
- Backend: Node/Express


### Local setup
- Setup
    - Clone the repo
    - npm install
    - npm start
- Testing
    - npm test

# Assumptions
- Scoring
    - Used KNN algortihm to find the nearst set 
    - When scoring, I assumed different weights for each factor
- Database
    - Since any database type wasn't prescribed in the requirement. I used the CSV itself as the data store
- Docker
    - There were no dependency excpet npm. So didn't dockerize. But can be dockerized simply when needed