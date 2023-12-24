
// ============================= info =============================

let topText = document.getElementById('top-textI')
let botText = document.getElementById('bot-textI')
let i = 0;

if (window.location.pathname === '/info.html') {
    setTimeout(function () {
        document.body.classList.add("transition");
        setTimeout(function () {
            let typingEffect = setInterval(() => {
                let textT = "It's very nice";
                let textB = "to meet you";
                if (i < textT.length) {
                    topText.innerHTML += textT.charAt(i);
                    i++;
                } else if (i < textT.length + textB.length) {
                    botText.innerHTML += textB.charAt(i - textT.length);
                    i++;
                }
            }, 100);
        }, 1000);
    }, 200);


} else {
    setTimeout(function () {
        document.body.classList.remove("transition");
    }, 200);
}


// ================================================================

// ============================== Play ============================
if (window.location.pathname === '/play.html') {
    
let videosP5js = Array.from(document.getElementsByClassName("video-p5js"));
let play = document.getElementById("index-video")
setTimeout(function () {


setInterval(() => {
    let randomIndex = Math.floor(Math.random() * videosP5js.length);
    toggleVisibility(videosP5js[randomIndex]);
 }, 500);

 function toggleVisibility(videoElement) {
    if (videoElement.style.display === "block") {
     
       
    } else {
        videoElement.style.display = "block";
    }
 }
}, 2000);


setTimeout(function () {
    play.style.display = "none"
}, 6500);
}

// ================================================================

// ============================== Projects ============================
if (window.location.pathname === '/projects.html') {
    let tagButtons = document.getElementsByClassName("tag");
    let clear = document.getElementById("clear")
    let newest = document.getElementById("newest")
    let uni = document.getElementById("university")
    let client = document.getElementById("client-work")
    let creativeCoding = document.getElementById("creative-coding")
    let visualIdentity = document.getElementById("visual-identity")
    let campaign = document.getElementById("campaign")
    let containers = document.querySelectorAll('.container-style');

    window.onload = () => {
        let videos = document.getElementsByTagName('video');
        setT
        for (let i = 0; i < videos.length; i++) {
            // Add event listener for mouseover
            videos[i].addEventListener('mouseover', function() {
                this.play();
            });
         
            // Add event listener for mouseout
            videos[i].addEventListener('mouseout', function() {
                this.pause();
            });
         }
    }


    containers.forEach(container => {
        container.addEventListener('mouseover', () => {
            let tagText = container.querySelector(".tag-text")
            tagText.style.display = "none"
        })

        container.addEventListener('mouseout', () => {
            let tagText = container.querySelector(".tag-text")
            tagText.style.display = ""
        })
    })
    let originalOrder = Array.from(containers);

    for (let i = 0; i < tagButtons.length; i++) {
        tagButtons[i].addEventListener('click', () => {
            hideButtons(tagButtons[i]);

            if (tagButtons[i].id == 'university') { }

        });
    }



    hideButtons = (clickedButton) => {
        const buttons = Array.from(document.querySelectorAll('.tag'));
        buttons.forEach(button => {
            clickedButton.style.color = "#000";
            clickedButton.style.backgroundColor = "#FFF";
            if (button.id !== 'clear' && button !== clickedButton) {
                button.classList.add('hidden');
                
            }
        });
    };

    clear.addEventListener('click', () => {
        const containersArray = Array.from(containers);
        const buttons = Array.from(document.querySelectorAll('.tag'));
        buttons.forEach(button => {
            button.classList.remove('hidden');
            button.style.backgroundColor = "#101010";
            button.style.color = "#FFF";
        });
        newest.style.backgroundColor = "#101010";
  newest.style.color = "#FFF";
        containersArray.forEach(container => {
            container.style.display = 'flex';
        });
     
        // Restore the original order of the divs
        const parentContainer = containers[0].parentNode;
        originalOrder.forEach(container => {
            parentContainer.appendChild(container);
        });
     })

    newest.addEventListener('click', () => {
        // Get all containers
        const containersArray = Array.from(containers);
        newest.style.color = "#000";
        newest.style.backgroundColor = "#FFF";

        // Sort the containers array based on the data-age attribute
        containersArray.sort((a, b) => {
            return a.dataset.age - b.dataset.age;
        });

        // Get the parent container
        const parentContainer = containers[0].parentNode;

        // Remove all containers from the parent container
        containersArray.forEach(container => {
            parentContainer.removeChild(container);
        });

        // Append the sorted containers to the parent container
        containersArray.forEach(container => {
            parentContainer.appendChild(container);
        });
    })

    const hideAllContainers = () => {
        containers.forEach(container => {
            container.style.display = 'none';
        });
    };

    const filterAndDisplayContainers = (selectedTag) => {
        hideAllContainers();
        containers.forEach(container => {
            const tags = container.dataset.tags.split(',');
            if (tags.includes(selectedTag)) {
                container.style.display = 'flex';
            }
        });
    };


    // button functionality for containers
    uni.addEventListener('click', () => filterAndDisplayContainers('university'));
    client.addEventListener('click', () => filterAndDisplayContainers('client-work'));
    visualIdentity.addEventListener('click', () => filterAndDisplayContainers('visual-identity'));
    campaign.addEventListener('click', () => filterAndDisplayContainers('campaign'));
    creativeCoding.addEventListener('click', () => filterAndDisplayContainers('creative-coding'));

}
   // ===================================================================