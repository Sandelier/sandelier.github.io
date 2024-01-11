

/* Skills buttons */
const skillButtons = document.querySelectorAll('#overlay-aboutme-container ul button');

let oldInfo;
let oldButton;
function handleClick() {
    if (this === oldButton) { return; }

    this.style.backgroundColor = "yellow";
    this.style.color = "black";
    this.style.transform = "scale(1.1)";

    if (oldInfo) {
        oldInfo.style.display = "none";

        oldButton.style.backgroundColor = "";
        oldButton.style.color = "";
        oldButton.style.transform = "";
    }
    oldButton = this;

    oldInfo = document.querySelector(`#overlay-aboutme-container-skills-info div[name='${this.textContent}'`);
    oldInfo.style.display = "flex";
}

skillButtons.forEach(button => {
    button.addEventListener('click', handleClick);
});

skillButtons[0].click();


/* Tooltip */

const tooltipContent = {
    "English": {
        "proficiency": "Good",
        "description": "I have learned english through my whole life and since 2023 my english speaking skills have been going up because every week i speak to my english speaking friends. I would say i understand practically most sentences but my main problem why i dont put myself was fluent is because my pronunciation still needs work."
    },
    "Finnish": {
        "proficiency": "Mother language",
        "description": ""
    },
    "Node.JS/Javascript": {
        "proficiency": "Intermediate",
        "description": "Javascript is my main programming language so most of my new projects are in javascript"
    },
    "Python": {
        "proficiency": "Beginner",
        "description": "I have delved into python for couple weeks where i made some programs for learning purposes like an manga/anime scraper for an database and making tree lookup systems for the database."
    },
    "Java": {
         "proficiency": "Intermediate",
         "description": "I have used Java for couple months but nowadays i havent really used it so if i go back to it i will need to use couple days until i start to remember most of the things."
    },
    "MySQL": {
        "proficiency": "Beginner",
        "description": "I have done some tree lookups and indexing in MySQL but i havent really went too deep into it since my projects dosent typically need databases."
    },
    "Blender": {
        "proficiency": "Intermediate",
        "description": "I have used blender a lot since i discovered it and the profiency is only going up and up every day."
    },
    "Fusion 360": {
        "proficiency": "Beginner",
        "description": "I learned Fusion 360 through school"
    },
    "Gimp": {
        "proficiency": "Beginner",
        "description": "Gimp is my main photo editing software so i use it a lot but i havent really delved into the advanced stuff instead i mainly do project planning and simple photo editing in gimp."
    },
    "Photoshop": {
        "proficiency": "Novice",
        "description": "Learned the basics through adobe creative cloud."
    },
    "Game reviews": {
        "proficiency": "Novice",
        "description": "I have made reviews for Crew Motorfest and Assassin's Creed Mirage."
    },
    "Office 365": {
        "proficiency": "Intermediate",
        "description": "I have used Office 365 a lot in school, work and in my own time. I have knowledge of Word/Excel/PowerPoint/Outlook/Teams/OneDrive"
    },
    "DaVinci resolve": {
        "proficiency": "Beginner",
        "description": "I have used DaVinci to post process blender animations and i also was planning in 2022 to make an video into youtube where i had used DaVinci."
    },
    "After effects": {
        "proficiency": "Novice",
        "description": "I have used after effects when i had to edit couple videos for item showcases for OnePlus Open and Doro HearingBuds."
    },
    "Websites": {
        "proficiency": "Intermediate",
        "description": "I started making websites with pure code in 2023 and I love it but i do have some experience with wordpress."
    },
    "Wordpress": {
        "proficiency": "Beginner",
        "description": "I have made an couple websites with wordpress for companies at my school in 2019"
    }
};


document.querySelectorAll('#overlay-aboutme-container-skills-info p').forEach(p => {
    p.addEventListener('mouseenter', showTooltip);
    p.addEventListener('mouseleave', hideTooltip);

    p.textContent = `${p.textContent} 🛈`;
});


function showTooltip(event) {
    // We get the events textcontent and use it as the key since each textcontent matches the key.
    let contentName = event.target.textContent;
    contentName = contentName.replace(/\s*🛈$/, '');

    const contentData = tooltipContent[contentName];

    if (contentData) {
      const tooltipText = `${contentData.proficiency}: ${contentData.description}`;
      console.log(`Tooltip: ${tooltipText}`);
    }
}

function hideTooltip() {
    console.log('Tooltip hidden');
}