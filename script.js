// ============================= index =============================
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    let shortcut = document.getElementById("start-button")
    let questionDiv = document.getElementById("question-container")
    let welcome = Array.from(document.getElementsByClassName("welcome-text"))
    let backgroundVideo = document.getElementById("background-video")
    let description = document.getElementById("description-container")
    let contentArea = document.getElementById("content-area")
    shortcut.addEventListener('click', () => {
        questionDiv.classList.add('hidden')
        welcome.forEach((item, index) => {
            setTimeout(() => {
                item.classList.remove('hidden');
            }, index * 300);
            setTimeout(() => {
                backgroundVideo.style.display = "block"
            }, 1300); setTimeout(() => {
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
// Get all the videos
const video1 = document.getElementById("position1");
const video4 = document.getElementById("position4");
const video5 = document.getElementById("position5");
const videoBig = document.getElementById("marching");

const Observer1 = document.getElementById("text-container")
const Observer4 = document.getElementById("cursor-squares");
const Observer5 = document.getElementById("cursor-squares");


let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
     if (entry.isIntersecting) {
       video1.style.display = 'block';
     } else {
       video1.style.display = 'none';
     }
    });
   }, {
    threshold: 0.01
   });

   let observer2 = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
    if (entry.isIntersecting) {
        videoBig.style.opacity = '0';
        video5.style.display = 'block';
        setTimeout(() => {  video4.style.display = 'block';}, 500);

    } else {
      video4.style.display = 'none';
      video5.style.display = 'none';
      videoBig.style.opacity = '30';

    }
    });
   }, {
    threshold: 0.01 
   });
   observer.observe(Observer1);
   observer2.observe(Observer4);
observer2.observe(Observer5);

   


    
    window.addEventListener('wheel', function(e) {
        e.preventDefault(); // Prevent vertical scrolling
        window.scrollBy({
          left: e.deltaY,
          top: 0,
          
        });
       });
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
    let parklane = document.getElementById("parklane")
    let SADAAC = document.getElementById("SADAAC")

    retrippin.addEventListener('click', () => {
        window.location.href = "retrippin.html";
    })

    museum.addEventListener('click', () => {
        window.location.href = "museum.html";
    })

    report.addEventListener('click', () => {
        window.location.href = "operationOzone.html";
    })

    responsive.addEventListener('click', () => {
        window.location.href = "responsivegallery.html";
    })

    digital.addEventListener('click', () => {
        window.location.href = "digitalnarrative.html";
    })

    parklane.addEventListener('click', () => {
        window.location.href = "parklane.html";
    })

    SADAAC.addEventListener('click', () => {
        window.location.href = "SADAAC.html";
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
if (['/museum.html', '/retrippin.html', '/operationOzone.html'].includes(window.location.pathname)) {
    let slides = Array.from(document.getElementsByClassName("img-slideshow"));
    let slides2 = Array.from(document.getElementsByClassName("img-slideshow2"));
    let videoElement = document.querySelector('video');

    videoElement.controls = window.innerWidth <= 700;
    videoElement.autoplay = window.innerWidth > 700;

    let currentSlideIndex = 0;
    let currentSlideIndex2 = 0;

    const showSlide = (slides, index, direction) => {
        slides[index].style.display = "none";
        index = (index + direction + slides.length) % slides.length;
        slides[index].style.display = "block";
        return index;
    };

    document.getElementById('previous-half').addEventListener('click', () => currentSlideIndex = showSlide(slides, currentSlideIndex, -1));
    document.getElementById('next-half').addEventListener('click', () => currentSlideIndex = showSlide(slides, currentSlideIndex, 1));
    document.getElementById('previous-half2').addEventListener('click', () => currentSlideIndex2 = showSlide(slides2, currentSlideIndex2, -1));
    document.getElementById('next-half2').addEventListener('click', () => currentSlideIndex2 = showSlide(slides2, currentSlideIndex2, 1));
}

// ===================================================================
if (window.location.pathname === '/digitalnarrative.html') {


    let pElement = document.getElementById('tag-text');
    if (window.innerWidth <= 900) {
        pElement.innerHTML = "Sorry! This works best on bigger screens...";
    } else {
        pElement.innerHTML = "Move mouse left to right to look through code.";
    }


}

if (window.location.pathname === '/SADAAC.html') {
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
if (window.location.pathname === '/responsivegallery.html') {
    let pElement = document.getElementById('tag-text');
    if (window.innerWidth <= 900) {
        pElement.innerHTML = "Sorry! This works best on bigger screens...";
    } else {
        pElement.innerHTML = "Try and resize me!";
    }
}