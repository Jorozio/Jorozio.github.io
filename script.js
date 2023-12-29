// ============================= index =============================
if (window.location.pathname === '/index.html') {
let shortcut = document.getElementById("start-button")
let questionDiv = document.getElementById("question-container")
let welcome = Array.from(document.getElementsByClassName("welcome-text"))
let backgroundVideo = document.getElementById("background-video")
let description = document.getElementById("description-container")
let contentArea = document.getElementById("content-area")
let arrows = document.getElementsByClassName("arrow-sizing")
shortcut.addEventListener('click', () => {
   questionDiv.classList.add('hidden')
   welcome.forEach((item, index) => {
       setTimeout(() => {
           item.classList.remove('hidden');
       }, index * 300); 
              setTimeout(() => {
                backgroundVideo.style.display = "block"
       }, 1300);       setTimeout(() => {
        contentArea.style.justifyContent = "right"
        description.style.display = "block"
       }, 3000);
       
   })
   
});

}


// ================================================================

// ============================= info =============================


if (window.location.pathname === '/info.html') {
    let topText = document.getElementById('top-textI')
    let botText = document.getElementById('bot-textI')
    let i = 0;

    setTimeout(() => {
        document.body.classList.add("transition");
        setTimeout(() => {
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
    setTimeout(() => {
        document.body.classList.remove("transition");
    }, 200);
}


// ================================================================

// ============================== Play ============================
if (window.location.pathname === '/play.html') {

    let videosP5js = Array.from(document.getElementsByClassName("video-p5js"));
    let play = document.getElementById("index-video")
    setTimeout(() => {


        setInterval(() => {
            let randomIndex = Math.floor(Math.random() * videosP5js.length);
            toggleVisibility(videosP5js[randomIndex]);
        }, 500);

        toggleVisibility = (videoElement) => {
            if (videoElement.style.display === "block") {


            } else {
                videoElement.style.display = "block";
            }
        }
    }, 2000);


    setTimeout(() => {
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

    let retrippin = document.getElementById("retrippin")
    let museum = document.getElementById("museum")
    let report = document.getElementById("report")
    let responsive = document.getElementById("responsive")
    let digital = document.getElementById("digital")
    let dtc = document.getElementById("dtc")

    retrippin.addEventListener('click', () => {
        window.location.href = "retrippin.html";
    })

     museum.addEventListener('click', () => {
        window.location.href = "museum.html";
    })

    report.addEventListener('click', () => {
        window.location.href = "reportandsupport.html";
    })

    responsive.addEventListener('click', () => {
        window.location.href = "responsivegallery.html";
    })

    digital.addEventListener('click', () => {
        window.location.href = "digitalnarrative.html";
    })

    dtc.addEventListener('click', () => {
        window.location.href = "DTC.html";
    })





    window.onload = () => {
        let videos = document.getElementsByTagName('video');
        for (let i = 0; i < videos.length; i++) {
            // Add event listener for mouseover
            videos[i].addEventListener('mouseover', () => {
                this.play();
            });

            // Add event listener for mouseout
            videos[i].addEventListener('mouseout', () => {
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
   if(window.location.pathname === '/museum.html' || window.location.pathname === '/retrippin.html' || window.location.pathname === '/reportandsupport.html'){
   let slides = Array.from(document.getElementsByClassName("img-slideshow"));
   let slides2 = Array.from(document.getElementsByClassName("img-slideshow2"));
   
   let currentSlideIndex = 0;
   let currentSlideIndex2 = 0;
   
   document.getElementById('previous-half').addEventListener('click', showPreviousSlide);
   document.getElementById('next-half').addEventListener('click', showNextSlide);
   document.getElementById('previous-half2').addEventListener('click', showPreviousSlide2);
   document.getElementById('next-half2').addEventListener('click', showNextSlide2);
   
   function showNextSlide() {
      slides[currentSlideIndex].style.display = "none";
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      slides[currentSlideIndex].style.display = "block";
   }
   
   function showPreviousSlide() {
      slides[currentSlideIndex].style.display = "none";
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      slides[currentSlideIndex].style.display = "block";
   }
   
   function showNextSlide2() {
      slides2[currentSlideIndex2].style.display = "none";
      currentSlideIndex2 = (currentSlideIndex2 + 1) % slides2.length;
      slides2[currentSlideIndex2].style.display = "block";
   }
   
   function showPreviousSlide2() {
      slides2[currentSlideIndex2].style.display = "none";
      currentSlideIndex2 = (currentSlideIndex2 - 1 + slides2.length) % slides2.length;
      slides2[currentSlideIndex2].style.display = "block";
   }
}
   // ===================================================================
   if(window.location.pathname === '/digitalnarrative.html'){
    let video = document.querySelector("#video");
    let container = document.querySelector(".containerstyle3");
  
      
        let pElement = document.getElementById('tag-text');
        if (window.innerWidth <= 900) {
            pElement.innerHTML = "Sorry! This works best on bigger screens...";
        } else {
            pElement.innerHTML = "Move mouse left to right to look through code.";
        }   
  
    container.addEventListener('mousemove', function(event) {
        let rect = this.getBoundingClientRect();
        let x = event.clientX - rect.left; // x position within the element.
        video.currentTime = x / rect.width * video.duration;
       });

     }

     if(window.location.pathname === '/DTC.html'){
        let i = 0; // Initial index
let str = "..."; // String to be typed
let el = document.getElementById('dotdotdot'); // Element to display the string

// Function to animate the typing effect
function type() {
   if (i < str.length) {
       el.innerHTML += str.charAt(i);
       i++;
   }
   else {
       // Clear the element and reset the index
       el.innerHTML = '';
       i = 0;
   }
}

// Call the type function every 200 milliseconds
setInterval(type, 800);
     }
 if(window.location.pathname === '/responsivegallery.html'){
        let pElement = document.getElementById('tag-text');
        if (window.innerWidth <= 900) {
            pElement.innerHTML = "Sorry! This works best on bigger screens...";
        } else {
            pElement.innerHTML = "Try and resize me!";
        }
    }