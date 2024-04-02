

const blenderPage = document.getElementById('blender-page');


// Loading the content in javascript so we have easy way of adding content directly to the json instead of html
function dynamicLoadContent(jsonContent) {
    const fragment = document.createDocumentFragment();

    for (const key in jsonContent) {
        if (jsonContent.hasOwnProperty(key)) {

            const index = jsonContent[key];

            const sideContainer = document.createElement('div');
            sideContainer.classList.add('sideContainer');

            // Add classes if present
            if (index.classes) {
                index.classes.forEach(extraClass => {
                    sideContainer.classList.add(extraClass);
                });
            }

            // Add animation format if present
            if (index.animation) {
                sideContainer.setAttribute('format', index.animation);
            }

            // Adding name attribute so we can easily then later on find correct info text to show in overlay.
            sideContainer.setAttribute('name', key);


            const image = document.createElement('img');
            image.src = index.imageURL;
            image.setAttribute('loading', 'lazy');
            image.setAttribute('alt', index.alt ? index.alt : index.name);

            sideContainer.appendChild(image);
            fragment.appendChild(sideContainer);
        }
    }

    blenderPage.appendChild(fragment);
}

const blenderContent = {
    MyRoom: {
        "imageURL": "Blender/Models/MyRoom/CompressedLowRes.webp",
        "info": "This was made during school when we had to do projects for a month. This is my own room and honestly i think this is the best scene i have ever made. I can't really think of anything to change on this scene other than that i forgot to add some symbols on keyboard. The keyboard was made in Fusion 360",
        "date": "6.2.2024",
        "alt": "My own room. Shows my table with screens.",
        "classes": ["vertical"]
    },
    ChildhoodRoom: {
        "imageURL": "Blender/Models/ChildhoodRoom/CompressedLowRes.webp",
        "info": "This was made during school when we had to do projects for a month. I wanted to make this room from my childhood since i have so many memories from it. In this scene i was struggling with lighting but overall i think its good.",
        "date": "17.3.2024",
        "alt": "My childhood room. Shows an room with television in middle that is running bomberman.",
        "classes": ["vertical"]
    },
    SlimeGolem: {
        "imageURL": "Blender/Models/SlimeGolem/CompressedLowRes.webp",
        "info": "We had an challenge with our classmates to make an scene with 'Fantasy' theme and this is what i came up with. There is still some stuff i would have wanted to change in example the tree trunk looks quite weird since i messed up modelling it and then displacement made it even more noticable and also the ground texture is quite low resolution and the slime actually looks like an glass bottle instead of slime and i think theres too much slime in the golem.",
        "date": "28.11.2023",
        "alt": "Golem sitting next to campfire with slime on top of the golem having marshmellow in hand.",
        "model": true
    },
    Basement: {
        "imageURL": "Blender/Models/Basement/Compressed.webp",
        "info": "The idea to this came while i was thinking what kind of scene i should make and recently i had went to the basement and every basement is always so scary to go to so i went and made our basement in blender and tried to make little bit of an horror animation. Ofc theres still some stuff i would want to change like sometimes the animation snaps and i didint like how the first door looked like at the start.",
        "date": "21.11.2023",
        "alt": "Animation of my basement in horror style.",
        "classes": ["vertical"],
        "animation": "mp4"
    },
    Whale: {
        "imageURL": "Blender/Models/Whale/CompressedLowRes.webp",
        "info": "This was modeled from 'Star Whale children nigh lamp'. My friend gave this to me as an gift one day and i thought it was so cute that i had to model it in blender. Looking back I noticed i added an line under the arm that the actual model dosent have which i was remembering it having and also the water shader looks a lot worse then i was remembering it looking like.",
        "date": "22.11.2023",
        "alt": "Cute whale modeled from Star Whale children night lamp that is jumping happily in ocean",
        "model": true    
    },
    Dining: {
        "imageURL": "Blender/Models/Dining/CompressedLowRes.webp",
        "info": "This was made during class and i think this did end up being pretty good looking. Ofc theres always something to change like i could have textured the wine bottle/glass to have droplets of wine and there could have been food in the plate and maybe some crumbles of like bread in the table and also the wine bottle has way too much wine.",
        "date": "8.11.2023",
        "alt": "Dining table with wine bottle and dices on it."
    }
};

dynamicLoadContent(blenderContent);